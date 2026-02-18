import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFormData, postFormData } from "../../services/formview";
import { formConfig } from "./FormConfig";

type FormViewParams = {
  doctype: "bank_account" | "expenses" | "income";
  name: string;
};

type FormField = {
  key: string;
  label: string;
  type: string;
  readonly?: boolean;
  hidden?: boolean;
};

const FormView = () => {
  const [formData, setFormData] = useState<any>({});
  const { doctype, name } = useParams<FormViewParams>();
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const saveFormData = () => {
    if(!doctype) return;
    const url = name === "new" ? formConfig[doctype].endpoint : `${formConfig[doctype].endpoint}/${name}`;
    setSaving(true);
    postFormData(url, formData).then((resp) => {
        if(resp.error) {
          setError(resp.error);
          console.error("Error saving data:", resp.error);
        } else {
          console.log("Data saved successfully", resp);
        }
        setSaving(false);
      })
  }

  const getFormData = () => {
    if (!doctype || !name || name === "new") return;
    const url = `${formConfig[doctype].endpoint}/${name}`;
    fetchFormData(url).then((resp) => {
      setFormData(resp.data);
    });
  };

  useEffect(() => {
    getFormData();
  }, [doctype, name]);

  return (
    <div className="container-fluid">
        <div className="d-flex justify-content-between">
            <h4>{name === "new" ? "New" : "Edit"} {doctype && formConfig[doctype].title}</h4>
            <button className="btn btn-primary" onClick={saveFormData} disabled={saving}> {saving ? "Saving..." : "Save"}</button>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      <div className="card mt-4">
        <div className="card-body">
          {doctype && formConfig[doctype].fields ? (
            <div className="row">
              {formConfig[doctype].fields.map((field: FormField) => {
                if (field.hidden) return null;
                return (
                  <div key={field.key} className="col-md-6 mb-3">
                    <label className="form-label">{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control"
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      readOnly={field.readonly ? true : false}
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
    </div>
  );
};

export default FormView;
