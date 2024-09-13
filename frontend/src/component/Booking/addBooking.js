import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBooking() {
  const navigate = useNavigate();
  const [date, setdate] = useState("");
  const [CusName, setCusName] = useState("");
  const [cus_id, setcus_id] = useState("");
  const [vehicleType, setvehicleType] = useState("");
  const [NoDays, setNoDays] = useState("");
   // eslint-disable-next-line
  const [Total, setTotal] = useState(0);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(0);

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getTypes = () => {
      axios
        .get("http://localhost:8080/api/vehicle/get")
        .then((res) => {
          setVehicleTypes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTypes();
  }, []);

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!date) {
      formIsValid = false;
      errors["date"] = "Please enter Booking Date";
    }

    if (!CusName) {
      formIsValid = false;
      errors["CusName"] = "Please enter Customer Name";
    }

    if (!cus_id) {
      formIsValid = false;
      errors["cus_id"] = "Please enter Customer ID";
    }

    if (!vehicleType) {
      formIsValid = false;
      errors["vehicleType"] = "Please select a Vehicle type";
    }

    if (!NoDays) {
      formIsValid = false;
      errors["NoDays"] = "Please enter No of days";
    }

    setErrors(errors);
    return formIsValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newBooking = {
        date,
        CusName,
        cus_id,
        vehicleType,
        NoDays,
        Total: selectedVehiclePrice * NoDays, // Calculate Total based on price and NoDays
      };

      axios
        .post("http://localhost:8080/api/Booking/save", newBooking)
        .then(() => {
          alert("Reservation added");
          navigate("/Booking/");
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  }

  return (
    <div className="container dashboard">
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <h1>Add Bookings</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">Booking Date</label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.date ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Booking date"
                  name="ReservationName"
                  min={new Date().toISOString().split("T")[0]} // Locks previous dates
                  onChange={(e) => {
                    setdate(e.target.value);
                  }}
                />

                {errors.date && (
                  <div className="invalid-feedback">{errors.date}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.CusName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Customer Name"
                  name="ReservationName"
                  onChange={(e) => {
                    setCusName(e.target.value);
                  }}
                />
                {errors.CusName && (
                  <div className="invalid-feedback">{errors.CusName}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Customer ID</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.cus_id ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Customer id"
                  name="NoPeople"
                  onChange={(e) => {
                    setcus_id(e.target.value);
                  }}
                />
                {errors.cus_id && (
                  <div className="invalid-feedback">{errors.cus_id}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Vehicle Type</label>
                <select
                  className="form-select"
                  id="validationCustom04"
                  required
                  onChange={(e) => {
                    const selectedVehicle = vehicleTypes.find(
                      (vehicle) => vehicle.vehicleModel === e.target.value
                    );
                    setvehicleType(e.target.value);
                    setSelectedVehiclePrice(
                      selectedVehicle ? selectedVehicle.price : 0
                    );
                  }}
                >
                  <option disabled selected value="">
                    Choose...
                  </option>
                  {vehicleTypes.map((vehicle, index) => (
                    <option key={index} value={vehicle.vehicleModel}>
                      {vehicle.vehicleModel}
                    </option>
                  ))}
                </select>

                {errors.vehicleType && (
                  <div className="invalid-feedback">{errors.vehicleType}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">No of days</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.NoDays ? "is-invalid" : ""
                  }`}
                  placeholder="Enter no of Days"
                  name="ReservationName"
                  onChange={(e) => {
                    setNoDays(e.target.value);
                  }}
                />
                {errors.NoDays && (
                  <div className="invalid-feedback">{errors.NoDays}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Total</label>
                <input
                  type="number"
                  className={"form-control "}
                  placeholder="Enter Total"
                  name="ReservationName"
                  value={selectedVehiclePrice * NoDays} // Calculate Total based on price and NoDays
                  onChange={(e) => {
                    setTotal(e.target.value);
                  }}
                />
              </div>

              <br />
              <input
                type="submit"
                className="btn btn-outline-success btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}