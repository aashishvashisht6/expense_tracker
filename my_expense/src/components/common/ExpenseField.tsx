import { useEffect, useRef, useState } from "react";

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  readonly?: boolean;
  hidden?: boolean;
  options?: string[] | string;
  reqd?: boolean;
  default?: string | number | boolean;
}

type FieldType = "text" | "number" | "checkbox" | "date" | "select" | "link";

type FieldProps = {
  field: FormField;
  value: any;
  onChange: (key: string, value: any) => void;
};

const InputField: React.FC<FieldProps> = ({ field, value, onChange }) => {
  return (
    <>
      <label className="form-label">{field.label}</label>
      <input
        type={field.type}
        className="form-control"
        value={value}
        onChange={(e) => onChange(field.key, e.target.value)}
        readOnly={field.readonly}
        required={field.reqd}
      />
    </>
  );
};

const SelectField: React.FC<FieldProps> = ({ field, value, onChange }) => {
  return (
    <>
      <label className="form-label">{field.label}</label>
      <select
        className="form-control"
        disabled={field.readonly}
        value={value || ""}
        onChange={(e) => onChange(field.key, e.target.value)}
        required={field.reqd}
      >

        {Array.isArray(field.options) &&
          field.options.map((row: string) => (
            <option value={row} key={row}>
              {row}
            </option>
          ))}
      </select>
    </>
  );
};

const CheckField: React.FC<FieldProps> = ({ field, value, onChange }) => {
  return (
    <div className="form-check" style={{ marginTop: "2rem" }}>
      <input
        className="form-check-input"
        type={field.type}
        value={value}
        readOnly={field.readonly ? true : false}
        onChange={(e) => onChange(field.key, e.target.checked ? 1 : 0)}
        required={field.reqd}
      />
      <label className="form-label-check">{field.label}</label>
    </div>
  );
};


const LinkDropdown: React.FC<FieldProps> = ({ field, value, onChange }) => {
  const [options, setOptions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 🔹 Debounce timer
  // @ts-ignore
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 🔹 Fetch search results
  const searchLink = async (text: string) => {
    if (!text || !field.options) return;

    setLoading(true);

    try {
      const resp = await fetch(
        `/api/method/frappe.desk.search.search_link?doctype=${field.options}&txt=${text}&page_length=10`,
        { credentials: "include" },
      );

      const data = await resp.json();
      setOptions(data.message || []);
      setShowDropdown(true);
    } catch (err) {
      console.error("Link search failed", err);
    }

    setLoading(false);
  };

  // 🔹 Handle typing with debounce
  const handleInputChange = (text: string) => {
    onChange(field.key, text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchLink(text);
    }, 300);
  };

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <label className="form-label">{field.label}</label>

      <input
        type="text"
        className="form-control"
        value={value || ""}
        onChange={(e) => handleInputChange(e.target.value)}
        readOnly={field.readonly}
        required={field.reqd}
        autoComplete="off"
      />

      {loading && <div className="small text-muted mt-1">Searching...</div>}

      {showDropdown && options.length > 0 && (
        <div
          className="border bg-dark"
          style={{
            position: "relative",
            width: "100%",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {options.map((opt: any) => (
            <div
              key={opt.value}
              style={{
                padding: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                onChange(field.key, opt.value);
                setShowDropdown(false);
              }}
            >
              {opt.description || opt.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const fieldComponentMap: Record<FieldType, React.FC<FieldProps>> = {
  text: InputField,
  checkbox: CheckField,
  date: InputField,
  select: SelectField,
  number: InputField,
  link: LinkDropdown,
};

const DynamicField: React.FC<FieldProps> = ({ field, value, onChange }) => {
  if (field.hidden) return null;
  const FieldComponent = fieldComponentMap[field.type];
  if (!FieldComponent) return null;
  return <FieldComponent field={field} value={value} onChange={onChange} />;
};

export default DynamicField;
