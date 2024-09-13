import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddReservationType() {
  const navigate = useNavigate();
  const [date, setdate] = useState("");
  const [CusName, setCusName] = useState("");
  const [NoPeople, setNoPeople] = useState("");
  const [Email, setEmail] = useState("");
  const [RoomType, setRoomType] = useState("");
  const [NoDays, setNoDays] = useState("");
  const [errors, setErrors] = useState({});
  const [RoomTypes, setRoomTypes] = useState([]);
  const [RoomPrice, setRoomPrice] = useState(0);

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/Room/get");
      setRoomTypes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!date) {
      formIsValid = false;
      errors["date"] = "Please enter Reservation Date";
    }

    if (!CusName) {
      formIsValid = false;
      errors["CusName"] = "Please enter Customer name";
    }

    if (!NoPeople) {
      formIsValid = false;
      errors["NoPeople"] = "Please enter no of people";
    }

    if (!RoomType) {
      formIsValid = false;
      errors["RoomType"] = "Please select a Room Type";
    }

    if (!NoDays) {
      formIsValid = false;
      errors["NoDays"] = "Please enter Reservation Date";
    }

    if (!Email) {
      formIsValid = false;
      errors["Email"] = "Please enter Email";
    }

    setErrors(errors);
    return formIsValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const totalPrice = RoomPrice * NoDays;

      const newReservation = {
        date,
        CusName,
        NoPeople,
        RoomType,
        NoDays,
        Email,
        Total: totalPrice,
      };

      axios
        .post("http://localhost:8000/api/Reservation/save", newReservation)
        .then(() => {
          alert("Reservation added");
          navigate("/Reservation/");
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
            <h1>Add Reservation</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">Reservation Date</label>
                <input
                  type="Date"
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  placeholder="Enter Reservation Date"
                  name="Date"
                  min={new Date().toISOString().split("T")[0]} // Set min attribute to current date
                  onChange={(e) => {
                    setdate(e.target.value);
                  }}
                />
                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.CusName ? "is-invalid" : ""}`}
                  placeholder="Enter Customer Name"
                  name="Cusname"
                  onChange={(e) => {
                    setCusName(e.target.value);
                  }}
                />
                {errors.CusName && <div className="invalid-feedback">{errors.CusName}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                  placeholder="Enter Email"
                  name="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">No of People</label>
                <input
                  type="number"
                  className={`form-control ${errors.NoPeople ? "is-invalid" : ""}`}
                  placeholder="Enter No of people"
                  name="NoPeople"
                  onChange={(e) => {
                    setNoPeople(e.target.value);
                  }}
                />
                {errors.NoPeople && <div className="invalid-feedback">{errors.NoPeople}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Room Type</label>
                <select
                  className={`form-select ${errors.RoomType ? "is-invalid" : ""}`}
                  id="validationCustom04"
                  required
                  onChange={(e) => {
                    const selectedRoomType = e.target.value;
                    const price =
                      RoomTypes.find((Room) => Room.RoomType === selectedRoomType)?.price || 0;
                    setRoomType(selectedRoomType);
                    setRoomPrice(price);
                  }}
                >
                  <option disabled value="">
                    Choose...
                  </option>
                  {RoomTypes.map((Room, index) => (
                    <option key={index} value={Room.RoomType} data-price={Room.price}>
                      {Room.RoomType}
                    </option>
                  ))}
                  <option selected disabled value="">
                    Select Room type
                  </option>
                </select>
                {errors.RoomType && (
                  <div className="invalid-feedback">{errors.RoomType}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">No of days you stay</label>
                <input
                  type="number"
                  className={`form-control ${errors.NoDays ? "is-invalid" : ""}`}
                  min="1"
                  step="0.01"
                  placeholder="Enter no of Days you stay"
                  name="ReservationName"
                  onChange={(e) => {
                    setNoDays(e.target.value);
                  }}
                />
                {errors.NoDays && <div className="invalid-feedback">{errors.NoDays}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Total Amount</label>
                <input
                  readOnly
                  type="number"
                  className={`form-control ${errors.Total ? "is-invalid" : ""}`}
                  placeholder="Total number will display here"
                  name="Total"
                  value={RoomPrice * NoDays}
                />
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
