import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRoomType() {
  const navigate = useNavigate();
  const [RoomType, setRoomType] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [errors, setErrors] = useState({});
  

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!RoomType) {
      formIsValid = false;
      errors["RoomType"] = "Please enter Room Type";
    }

    if (!price) {
      formIsValid = false;
      errors["price"] = "Please enter Price";
    }

    if (!description) {
      formIsValid = false;
      errors["description"] = "Please enter Description";
    }

  

    

    
    setErrors(errors);
    return formIsValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {

    const newRoom = {
      RoomType,
      price,
      description
    };
    
 

    axios
      .post("http://localhost:8000/api/Room/save", newRoom)
      .then(() => {
        alert("Room added");
        navigate("/Room/");
      })
      .catch((err) => {
        console.log('having'+err);
      });
  }
}

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container m-5'>
            <h1>Add Room Types</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">Room Type</label>
                <input
                  type="text"
                  className={`form-control ${errors.RoomType ? 'is-invalid' : ''}`}
                  placeholder='Enter Room Type'
                  name='RoomName'
                  onChange={(e) => {
                    setRoomType(e.target.value);
                  }}
                />
                {errors.RoomType && <div className="invalid-feedback">{errors.RoomType}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  placeholder='Enter price'
                  name='locationStorage'
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Discription</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  rows="3"
                  placeholder='Enter description'
                  name='RoomNote'
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>
              <br />
              <input type='submit' className='btn btn-outline-success btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
