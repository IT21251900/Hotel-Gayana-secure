import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddReservationType() {
  const navigate = useNavigate();
  const [date, setdate] = useState("");
  const [CusName, setCusName] = useState("");
  const [NoPeople, setNoPeople] = useState("");
  const [RoomType, setRoomType] = useState("");
  const [NoDays, setNoDays] = useState("");
  const [errors, setErrors] = useState({});
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/rooms");
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

    // Rest of the validation code...

    setErrors(errors);
    return formIsValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newReservation = {
        date,
        CusName,
        NoPeople,
        RoomType,
        NoDays,
      };

      axios
        .post("http://localhost:4066/api/Reservation/save", newReservation)
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
            <h1>Add Reservation Types</h1>
            <form onSubmit={sendData}>
            <div className="mb-3">
                <label className="form-label">Reservation Date</label>
                <input
                  type="Date"
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  placeholder="Enter Customer Name"
                  name="ReservationName"
                  onChange={(e) => {
                    setdate(e.target.value);
                  }}
                />
                {errors.date &&                   <div className="invalid-feedback">{errors.date}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.CusName ? "is-invalid" : ""}`}
                  placeholder="Enter Customer Name"
                  name="ReservationName"
                  onChange={(e) => {
                    setCusName(e.target.value);
                  }}
                />
                {errors.CusName && <div className="invalid-feedback">{errors.CusName}</div>}
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
                value={RoomType}
                onChange={(e) => {
                  setRoomType(e.target.value);
                }}
              >
                
                <option value="Standard Room">Standard Room</option>
                
              </select>

                {errors.RoomType && (
                  <div className="invalid-feedback">{errors.RoomType}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">No of days you stay</label>
                <input
                  type="Number"
                  className={`form-control ${errors.NoDays ? "is-invalid" : ""}`}
                  placeholder="Enter no of Days you stay"
                  name="ReservationName"
                  onChange={(e) => {
                    setNoDays(e.target.value);
                  }}
                />
                {errors.NoDays && <div className="invalid-feedback">{errors.NoDays}</div>}
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
