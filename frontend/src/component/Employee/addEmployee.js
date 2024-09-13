import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!firstName) {
      formIsValid = false;
      errors["firstName"] = "Please enter first name";
    }

    if (!lastName) {
      formIsValid = false;
      errors["lastName"] = "Please enter last name";
    }

    if (!DOB) {
      formIsValid = false;
      errors["DOB"] = "Please enter Date of Birth";
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(DOB);

      if (selectedDate >= currentDate) {
        formIsValid = false;
        errors["DOB"] = "Please select a date before today";
      }
    }

    if (!address) {
      formIsValid = false;
      errors["address"] = "Please enter address";
    }

    if (!telephone) {
      formIsValid = false;
      errors["telephone"] = "Please enter Employee Telephone";
    }

    if (!email) {
      formIsValid = false;
      errors["email"] = "Please enter Employee Email";
    }

    setErrors(errors);
    return formIsValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newEmployee = {
        firstName,
        lastName,
        DOB,
        address,
        telephone,
        email,
      };
  
      axios
        .post("http://localhost:8000/api/Employee/save", newEmployee)
        .then(() => {
          alert("Employee added");
          navigate("/Employee/");
        })
        .catch((err) => {
          console.log("Error adding employee:", err);
        });
    }
  }

  return (
    <div className="container dashboard">
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container m-5">
            <h1>Add Employees</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter first name"
                  name="firstName"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter last name"
                  name="lastName"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Employee Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.DOB ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Date of Birth"
                  name="DOB"
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                  max={new Date().toISOString().split("T")[0]} // Set the max attribute to the current date
                />
                {errors.DOB && (
                  <div className="invalid-feedback">{errors.DOB}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Employee Address</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Address"
                  name="address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Employee Telephone</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.telephone ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Employee Telephone"
                  name="telephone"
                  onChange={(e) => {
                    setTelephone(e.target.value);
                  }}
                />
                {errors.telephone && (
                  <div className="invalid-feedback">{errors.telephone}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Employee Email</label>
                <input
                  type="email"
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Employee Email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <br />
              <input
                type="submit"
                className="btn btn-outline-success btn-block mt-4"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
