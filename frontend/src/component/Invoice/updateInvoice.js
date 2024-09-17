import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Name, setName] = useState("");
  const [Invoice_No, setInvoice_No] = useState("");
  const [Due_Date, setDue_Date] = useState(new Date());
  const [Running_Total, setRunning_Total] = useState("");
  const [Tax_code, setTax_code] = useState("");
  const [Sub_Total, setSub_Total] = useState("");
  const [errors, setErrors] = useState({});

  const handleDateChange = (date) => {
    setDue_Date(date);
  };

  function validateForm() {
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

  useEffect(() => {
    const getInvoice = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/Invoice/get/${id}`);
        const Invoice = response.data;
        setName(Invoice.Name);
        setInvoice_No(Invoice.Invoice_No);
        setDue_Date(new Date(Invoice.Due_Date));
        setRunning_Total(Invoice.Running_Total);
        setTax_code(Invoice.Tax_code);
        setSub_Total(Invoice.Sub_Total);
      } catch (err) {
        console.log(err);
      }
    };

    getInvoice(id);
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    if (validateForm()) {
      const updatedInvoice = {
        Name,
        Invoice_No,
        Due_Date,
        Running_Total,
        Tax_code,
        Sub_Total,
      };

      axios
        .put(`http://localhost:8000/api/Invoice/update/${id}`, updatedInvoice)
        .then(() => {
          alert("Invoice updated");
          navigate("/Invoice/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="container dashboard">
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <h1>Update Invoice</h1>
            <form onSubmit={updateData}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                  placeholder="Enter Customer Name"
                  name="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={Invoice_No}
                  onChange={(e) => setInvoice_No(e.target.value)}
                />
                {errors.Invoice_No && (
                  <div className="invalid-feedback">{errors.Invoice_No}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <DatePicker
                  className={`form-control ${errors.Due_Date ? "is-invalid" : ""}`}
                  selected={Due_Date}
                  minDate={new Date()}
                  onChange={handleDateChange}
                />
                {errors.Due_Date && (
                  <div className="invalid-feedback">{errors.Due_Date}</div>
                )}
              </div>

              <div className="input-group mb-3">
                <label className="input-group mb-3">Running Total</label>
                <span className="input-group-text">Rs. </span>
                <input
                  type="number"
                  className={`form-control ${errors.Running_Total ? "is-invalid" : ""}`}
                  aria-label="Amount (to the nearest dollar)"
                  min="0"
                  step="0.01"
                  placeholder="Enter Running Total"
                  name="Running_Total"
                  value={Running_Total}
                  onChange={(e) => setRunning_Total(e.target.value)}
                />
                {errors.Running_Total && (
                  <div className="invalid-feedback">{errors.Running_Total}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Tax Code</label>
                <input
                  type="text"
                  className={`form-control ${errors.Tax_code ? "is-invalid" : ""}`}
                  placeholder="Enter Tax code"
                  name="Tax_code"
                  value={Tax_code}
                  onChange={(e) => setTax_code(e.target.value)}
                />
                {errors.Tax_code && <div className="invalid-feedback">{errors.Tax_code}</div>}
              </div>

              <div className="input-group mb-3">
                <label className="input-group mb-3">Sub Total</label>
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
                  onChange={(e) => setSub_Total(e.target.value)}
                />
                {errors.Sub_Total && (
                  <div className="invalid-feedback">{errors.Sub_Total}</div>
                )}
              </div>

              <br />
              <br />
              <input type="submit" className="btn btn-outline-success btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
