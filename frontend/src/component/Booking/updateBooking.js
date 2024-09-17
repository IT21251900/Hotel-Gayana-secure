import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
//import { format } from 'date-fns';


export default function UpdateBooking() {
  const navigate = useNavigate();
  const [date, setdate] = useState("");
  const [CusName, setCusName] = useState("");
  const [cus_id, setcus_id] = useState("");
  const [vehicleType, setvehicleType] = useState("");
  const [NoDays, setNoDays] = useState("");
  let { id } = useParams();

  const [errors, setErrors] = useState({});
  

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
        errors["vehicleType"] = "Please enter Select Vehicle type";
      }
  

    
    if (!NoDays) {
      formIsValid = false;
      errors["NoDays"] = "Please enter No of days stay";
    }

    
    setErrors(errors);
    return formIsValid;
  }

  
  useEffect(() => {
    
    const getBooking = async (id) => { 
     
      try {
        const response = await axios.get(`http://localhost:8000/api/Booking/get/${id}`)
        
        const Booking = response.data;
       // const formattedDate = format(new Date(reservation.date), 'MM/dd/yyyy'); // format date here
       // setdate(formattedDate);
        setdate(Booking.date);
        setCusName(Booking.CusName);
        setcus_id(Booking.cus_id);
        setvehicleType(Booking.vehicleType);
        setNoDays(Booking.NoDays);
       
      } catch (err) {
        console.log(err);
      }
    };
    getBooking(id);

    console.log(id)
    
    
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    if (validateForm()) {

    const updatedBooking = {
        date,
        CusName,
        cus_id,
        vehicleType,
        NoDays,
    };
    axios
      .put(`http://localhost:8000/api/Booking/update/${id}`, updatedBooking)

      //console.log(id)
      .then(() => {
        alert("Booking updated");
        navigate("/Booking/");
      })
      .catch((err) => {
        console.log(err); 
      });
  }
}


console.log("date:", date);
console.log("CusName:", CusName);
console.log("cus_id:", cus_id);
console.log("vehicleType:", vehicleType);
console.log("NoDays:", NoDays);


  return (
    <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
    <div className="container m-5">

      <h1>Update Booking</h1>

      <form onSubmit={updateData}>

        <div className="mb-3">
          <label className="form-label">Booking Date</label>
          <input
            type="Date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            placeholder="Enter Reservation Type"
            name="date"
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
                <label className="form-label">Customer ID</label>
                <input
                  type="number"
                  className={`form-control ${errors.cus_id ? 'is-invalid' : ''}`}
                  placeholder='Enter No of people'
                  name='locationStorage'
                  value={cus_id}
                  onChange={(e) => {
                    setcus_id(e.target.value);
                  }}
                />
                {errors.CusName && <div className="invalid-feedback">{errors.cus_id}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Room Type</label>
                <input
                  type="text"
                  className={`form-control ${errors.vehicleType ? 'is-invalid' : ''}`}
                  placeholder='Enter Room Type'
                  name='RoomType'
                  value={vehicleType}
                  onChange={(e) => {
                    setvehicleType(e.target.value);
                  }}
                />
                {errors.RoomType && <div className="invalid-feedback">{errors.vehicleType}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">No of days you stay</label>
                <input
                  type="Number"
                  className={`form-control ${errors.NoDays ? 'is-invalid' : ''}`}
                  placeholder='Enter No of Days'
                  name='NoDays'
                  value={NoDays}
                  onChange={(e) => {
                    setNoDays(e.target.value);
                  }}
                />
                {errors.NoDays && <div className="invalid-feedback">{errors.NoDays}</div>}
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
