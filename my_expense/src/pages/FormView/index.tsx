import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFormData, postFormData } from "../../services/formview";
import { formConfig } from "./FormConfig";
import DynamicField, {
  type FormField,
} from "../../components/common/ExpenseField";

type FormViewParams = {
  doctype: "bank_account" | "expenses" | "income" | "bank_transfer";
  name: string;
};

const FormView = () => {
  const [formData, setFormData] = useState<any>({});
  const { doctype, name } = useParams<FormViewParams>();
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const saveFormData = () => {
    if (!doctype) return;
    const url =
      name === "new"
        ? formConfig[doctype].endpoint
        : `${formConfig[doctype].endpoint}/${name}`;
    setSaving(true);
    postFormData(url, formData).then((resp) => {
      if (resp.error) {
        setError(resp.error);
        console.error("Error saving data:", resp.error);
      } else {
        if (name === "new") {
          navigate(`/${doctype}`);
        }
        setError("");
        setFormData(resp.data);
      }
      setSaving(false);
    });
  };

  const getFormData = () => {
    if (!doctype || !name || name === "new") {
      const defaults: any = {};

      if (doctype) {
        formConfig[doctype].fields.forEach((field: FormField) => {
          if (field.default !== undefined) {
            defaults[field.key] = field.default;
          }
        });
      }

      setFormData(defaults);
      return;
    }
    const url = `${formConfig[doctype].endpoint}/${name}`;
    fetchFormData(url).then((resp) => {
      setFormData(resp.data);
    });
  };

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    getFormData();
  }, [doctype, name]);

  return (
    <div className="container-fluid">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent page reload
          saveFormData();
        }}
      >
        <div className="d-flex justify-content-between">
          <h4>
            {name === "new" ? "New" : "Edit"}{" "}
            {doctype && formConfig[doctype].title}
          </h4>
          <button className="btn btn-primary" disabled={saving} type="submit">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="card mt-4">
          <div className="card-body">
            {doctype && formConfig[doctype].fields ? (
              <div className="row">
                {formConfig[doctype].fields.map((field: FormField) => {
                  if (field.hidden) return null;
                  return (
                    <div className="col-md-6 mb-3">
                      <DynamicField
                        field={field}
                        value={formData[field.key] || ""}
                        onChange={handleFieldChange}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No form configuration found for this doctype.</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormView;
