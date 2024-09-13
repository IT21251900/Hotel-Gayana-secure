import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate,useParams } from "react-router-dom";
//import { format } from 'date-fns';


export default function UpdateReservation() {
  const navigate = useNavigate();
  const [date, setdate] = useState("");
  const [CusName, setCusName] = useState("");
  const [Email, setEmail] = useState("");
  const [NoPeople, setNoPeople] = useState("");
  const [RoomType, setRoomType] = useState("");
  const [NoDays, setNoDays] = useState("");
  const [RoomPrice, setRoomPrice] = useState(0);
  const [RoomTypes, setRoomTypes] = useState([]);
  let { id } = useParams();

  const [errors, setErrors] = useState({});
  
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
      errors["CusName"] = "Please enter Customer Name";
    }
    if (!Email) {
      formIsValid = false;
      errors["Email"] = "Please enter Email";
    }

    
    if (!NoPeople) {
      formIsValid = false;
      errors["NoPeople"] = "Please enter No of people coming";
    }

    if (!RoomType) {
        formIsValid = false;
        errors["RoomType"] = "Please enter Select Room type";
      }
  

    
    if (!NoDays) {
      formIsValid = false;
      errors["NoDays"] = "Please enter No of days stay";
    }

    
    setErrors(errors);
    return formIsValid;
  }

  
  useEffect(() => {
    
    const getReservation = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/Reservation/get/${id}`);
        const reservation = response.data;
    
        const selectedRoomType = RoomTypes.find((room) => room.RoomType === reservation.RoomType);
        const price = selectedRoomType ? selectedRoomType.price : 0;
    
        setdate(reservation.date);
        setCusName(reservation.CusName);
        setEmail(reservation.Email);
        setNoPeople(reservation.NoPeople);
        setRoomType(reservation.RoomType);
        setNoDays(reservation.NoDays);
        setRoomPrice(price);
      } catch (err) {
        console.log(err);
      }
    };
    
    getReservation(id);

    
     // eslint-disable-next-line
  }, [id]);

  function updateData(e) {
    e.preventDefault();
  
    if (validateForm()) {
      const updatedReservation = {
        date,
        CusName,
        Email,
        NoPeople,
        RoomType,
        NoDays,
        Total: RoomPrice * NoDays,
      };
  
      axios
        .put(`http://localhost:8000/api/Reservation/update/${id}`, updatedReservation)
        .then(() => {
          alert("Reservation updated");
          navigate("/Reservation/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  


  return (
    <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
    <div className="container">
      <h1>Update Reservation</h1>
      <form onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Reservation Date</label>
          <input
            type="Date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            placeholder="Enter Reservation Type"
            name="date"
            min={new Date().toISOString().split('T')[0]}
            value={date}
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
                  className={`form-control ${errors.CusName ? 'is-invalid' : ''}`}
                  placeholder='Enter Customer Name'
                  name='CusName'
                  value={CusName}
                  onChange={(e) => {
                    setCusName(e.target.value);
                  }}
                />
                {errors.CusName && <div className="invalid-feedback">{errors.CusName}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="email"
                  className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                  placeholder='Enter Email'
                  name='Email'
                  value={Email}
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
                  className={`form-control ${errors.NoPeople ? 'is-invalid' : ''}`}
                  placeholder='Enter No of people'
                  name='locationStorage'
                  value={NoPeople}
                  onChange={(e) => {
                    setNoPeople(e.target.value);
                  }}
                />
                {errors.CusName && <div className="invalid-feedback">{errors.NoPeople}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Room Type</label>
                <select
                  className="form-select"
                  id="validationCustom04"
                  required
                  onChange={(e) => {
                    const selectedRoomType = e.target.value;
                    const price = RoomTypes.find((Room) => Room.RoomType === selectedRoomType)?.price || 0;
                    setRoomType(selectedRoomType);
                    setRoomPrice(price);
                  }}
                >
                  {RoomTypes.map((room, index) => (
                  <option key={index} value={room.RoomType} data-price={room.price}>
                    {room.RoomType}
                  </option>
                ))}

                  <option selected disabled value="">
                    Choose...
                  </option>
                </select>

                {errors.RoomType && <div className="invalid-feedback">{errors.RoomType}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">No of days you stay</label>
                <input
                  type="Number"
                  className={`form-control ${errors.NoDays ? 'is-invalid' : ''}`}
                  min="1" step="0.01"
                  placeholder='Enter No of Days'
                  name='NoDays'
                  value={NoDays}
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