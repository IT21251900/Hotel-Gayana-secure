import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateRoom() {
  const navigate = useNavigate();
  const [RoomType, setroomType] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  let { id } = useParams();
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

  console.log(RoomType)
  //console.log(roomType)
  useEffect(() => {

    const getRoom = async (id) => {

      try {
        const response = await axios.get(`http://localhost:8000/api/Room/get/${id}`)

        const Room = response.data;
        setroomType(Room.RoomType);
        setprice(Room.price);
        setdescription(Room.description);

      } catch (err) {
        console.log(err);
      }
    };
    getRoom(id);

    console.log(id)


  }, [id]);

  function updateData(e) {
    e.preventDefault();

    if (validateForm()) {

      const updatedRoom = {
        RoomType,
        price,
        description,
      };
      axios
        .put(`http://localhost:8000/api/Room/update/${id}`, updatedRoom)

        //console.log(id)
        .then(() => {
          alert("Room updated");
          navigate("/Room/");
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
          <div className="container m-5">
            <h1>Update Room</h1>
            <form onSubmit={updateData}>
              <div className="mb-3">
                <label className="form-label">Room Type</label>
                <input
                  type="text"
                  className={`form-control ${errors.RoomType ? 'is-invalid' : ''}`}
                  placeholder="Enter Room Type"
                  name="roomType"
                  value={RoomType}
                  onChange={(e) => {
                    setroomType(e.target.value);
                  }}
                />
                {errors.RoomType && <div className="invalid-feedback">{errors.RoomType}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  placeholder="Enter Price"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">description</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  rows="3"
                  placeholder="Enter Description"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                ></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
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
