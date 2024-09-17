import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const taxTypes = [
  { code: "VAT", rate: 5.75 },
  { code: "RoomTax", rate: 5.00 },
  { code: "TourismTax", rate: 8.00 },
  { code: "ResortTax", rate: 7.25 },
];

export default function AddInvoice() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Invoice_No, setInvoice_No] = useState("");
  const [Due_Date, setDue_Date] = useState(null);
  const [Running_Total, setRunning_Total] = useState("");
  const [Tax_code, setTax_code] = useState("");
  const [Sub_Total, setSub_Total] = useState("");
  // eslint-disable-next-line
  const [Tax_codes, setTax_codes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getTypes = () => {
      axios
        .get("http://localhost:8000/api/tax/get")
        .then((res) => {
          setTax_codes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTypes();
  }, []);

  useEffect(() => {
    if (Running_Total && Tax_code) {
      const selectedTaxType = taxTypes.find((type) => type.code === Tax_code);
      const rate = selectedTaxType ? selectedTaxType.rate : 0;
      const subTotal = parseFloat(Running_Total) + (parseFloat(Running_Total) * rate) / 100;
      setSub_Total(subTotal.toFixed(2));
    }
  }, [Running_Total, Tax_code]);

  function valiDue_DateForm() {
    let formIsValid = true;
    let errors = {};

    if (!Name) {
      formIsValid = false;
      errors["Name"] = "Please enter Customer Name";
    }

    if (!Invoice_No) {
      formIsValid = false;
      errors["Invoice_No"] = "Please enter Invoice Number";
    }

    if (!Due_Date) {
      formIsValid = false;
      errors["Due_Date"] = "Please enter Due Date";
    }

    if (!Running_Total) {
      formIsValid = false;
      errors["Running_Total"] = "Please enter Running Total";
    }

    if (!Tax_code) {
      formIsValid = false;
      errors["Tax_code"] = "Please select a Tax code";
    }

    if (!Sub_Total) {
      formIsValid = false;
      errors["Sub_Total"] = "Please enter Sub Total";
    }

    setErrors(errors);
    return formIsValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (valiDue_DateForm()) {
      const newInvoice = {
        Name,
        Invoice_No,
        Due_Date,
        Running_Total,
        Tax_code,
        Sub_Total,
      };

      axios
        .post("http://localhost:8000/api/Invoice/save", newInvoice)
        .then(() => {
          alert("Reservation added");
          navigate("/Invoice/");
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }

  return (
    <div className="container dashboard">
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <h1>Add Invoice Details</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                  placeholder="Enter Customer Name"
                  name="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {errors.Name && <div className="invalid-feedback">{errors.Name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Invoice No</label>
                <input
                  type="number"
                  className={`form-control ${errors.Invoice_No ? "is-invalid" : ""}`}
                  placeholder="Enter Invoice Number"
                  name="Invoice_No"
                  onChange={(e) => {
                    setInvoice_No(e.target.value);
                  }}
                />
                {errors.Invoice_No && <div className="invalid-feedback">{errors.Invoice_No}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <DatePicker
                  className={`form-control ${errors.Due_Date ? "is-invalid" : ""}`}
                  placeholderText="Select Due Date"
                  selected={Due_Date}
                  minDate={new Date()}
                  onChange={(date) => setDue_Date(date)}
                />
                {errors.Due_Date && <div className="invalid-feedback">{errors.Due_Date}</div>}
              </div>

              <div className="input-group mb-3">
                <label className="input-group mb-3">Running Total(Rs.)</label>
                <span className="input-group-text">Rs. </span>
                <input
                  type="number"
                  className={`form-control ${errors.Running_Total ? "is-invalid" : ""}`}
                  aria-label="Amount (to the nearest dollar)"
                  min="0"
                  step="0.01"
                  placeholder="Enter Running Total"
                  name="Running_Total"
                  onChange={(e) => {
                    setRunning_Total(e.target.value);
                  }}
                />
                {errors.Running_Total && (
                  <div className="invalid-feedback">{errors.Running_Total}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Tax_code</label>
                <select
                  className={`form-select ${errors.Tax_code ? "is-invalid" : ""}`}
                  value={Tax_code}
                  onChange={(e) => {
                    setTax_code(e.target.value);
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

              <div className="input-group mb-3">
                <label className="input-group mb-3">Sub Total(Rs.)</label>
                <span className="input-group-text">Rs. </span>
                <input
                  type="number"
                  className={`form-control ${errors.Sub_Total ? "is-invalid" : ""}`}
                  aria-label="Amount (to the nearest dollar)"
                  min="0"
                  step="0.01"
                  placeholder="Enter Sub Total"
                  name="Sub_Total"
                  value={Sub_Total}
                  readOnly
                />
                {errors.Sub_Total && <div className="invalid-feedback">{errors.Sub_Total}</div>}
              </div>

              <br />
              <br />
              <input type='submit' className='btn btn-outline-success btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
