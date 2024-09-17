import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const taxTypes = [
  { code: "VAT", rate: 5.75 },
  { code: "RoomTax", rate: 5.00 },
  { code: "TourismTax", rate: 8.00 },
  { code: "ResortTax", rate: 7.25 },
];

export default function AddTax() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Tax_code, setTax_code] = useState("");
  const [Tax_Rate_Type, setTax_Rate_Type] = useState("");
  const [Rate_Amount, setRate_Amount] = useState("");
  const [Available_for_Invoicing, setAvailable_for_Invoicing] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!Name) {
      formIsValid = false;
      errors["Name"] = "Please enter Name";
    }

    if (!Tax_code) {
      formIsValid = false;
      errors["Tax_code"] = "Please enter Tax code";
    }

    if (!Tax_Rate_Type) {
      formIsValid = false;
      errors["Tax_Rate_Type"] = "Please enter Tax Rate Type";
    }

    if (!Available_for_Invoicing) {
      formIsValid = false;
      errors["Available_for_Invoicing"] = "Please enter Available for Invoicing";
    }

    if (!Rate_Amount) {
      formIsValid = false;
      errors["Rate_Amount"] = "Please enter Rate Amount";
    }
    setErrors(errors);
    return formIsValid;
  }

  function updateRateAmount(code) {
    const selectedType = taxTypes.find((type) => type.code === code);
    if (selectedType) {
      setRate_Amount(selectedType.rate);
    } else {
      setRate_Amount("");
    }
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newTax = {
        Name,
        Tax_code,
        Rate_Amount,
        Available_for_Invoicing,
      };

      axios
        .post("http://localhost:8000/api/tax/save", newTax)
        .then(() => {
          alert("New tax added");
          navigate("/tax/");
        })
        .catch((err) => {
          console.log("Error:", err);
          setErrorMessage(err.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        });
    }
  }

  return (
    <div className="container dashboard">
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container m-5">
            <h1>Add Additional Taxes</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                  placeholder="Enter Name"
                  name="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {errors.Name && <div className="invalid-feedback">{errors.Name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Tax_code</label>
                <select
                  className={`form-select ${errors.Tax_code ? "is-invalid" : ""}`}
                  value={Tax_code}
                  onChange={(e) => {
                    setTax_code(e.target.value);
                    updateRateAmount(e.target.value);
                  }}
                >
                  <option value="">Select Tax code</option>
                  {taxTypes.map((type) => (
                    <option key={type.code} value={type.code}>
                      {type.code}
                    </option>
                  ))}
                </select>
                {errors.Tax_code && <div className="invalid-feedback">{errors.Tax_code}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Tax Rate Type</label>
                <input
                  type="text"
                  className={`form-control ${errors.Tax_Rate_Type ? "is-invalid" : ""}`}
                  placeholder="Percentage"
                  name="Tax_Rate_Type"
                  onChange={(e) => {
                    setTax_Rate_Type(e.target.value);
                  }}
                />
                {errors.Tax_Rate_Type && <div className="invalid-feedback">{errors.Tax_Rate_Type}</div>}
              </div>

              <div className="input-group mb-3">
                <label className="input-group mb-3">Rate Amount</label>
                <input
                  type="number"
                  className={`form-control ${errors.Rate_Amount ? "is-invalid" : ""}`}
                  aria-label="Amount (to the nearest dollar)"
                  min="0"
                  step="0.01"
                  placeholder="Enter Rate Amount"
                  name="Rate_Amount"
                  value={Rate_Amount}
                  onChange={(e) => {
                    setRate_Amount(e.target.value);
                  }}
                />
                <span className="input-group-text">%</span>
                {errors.Rate_Amount && <div className="invalid-feedback">{errors.Rate_Amount}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Available_for_Invoicing</label>
                <textarea
                  className={`form-control ${errors.Available_for_Invoicing ? "is-invalid" : ""}`}
                  placeholder="Yes/No"
                  name="Available_for_Invoicing"
                  onChange={(e) => {
                    setAvailable_for_Invoicing(e.target.value);
                  }}
                />
                {errors.Available_for_Invoicing && (
                  <div className="invalid-feedback">{errors.Available_for_Invoicing}</div>
                )}
              </div>
              <br />
              <input type="submit" className="btn btn-outline-success btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
