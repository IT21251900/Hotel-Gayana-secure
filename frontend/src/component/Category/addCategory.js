import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const navigate = useNavigate();
  const [categoryname, setcategoryName] = useState("");
  const [locationStorage, setloctionStorage] = useState("");
  const [locationRack, setloctionRack] = useState("");
  const [categoryNote, setcategoryNote] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

//form Validation 
  function validateForm() {
    let formIsValid = true;
    let errors = {};

    setErrors({})

    if (!categoryname) {
      formIsValid = false;
      errors["categoryname"] = "Please enter category name";

    }

    if (!locationStorage) {
      formIsValid = false;
      errors["locationStorage"] = "Please enter location storage";
    }

    if (!locationRack) {
      formIsValid = false;
      errors["locationRack"] = "Please enter location rack";
    }

    setErrors(errors);
    return formIsValid;
  }

  //data save function
  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newCategory = {
        categoryname,
        locationStorage,
        locationRack,
        categoryNote
      };

      axios
        .post("http://localhost:8000/api/category/save", newCategory)
        .then(() => {
          swal("Category Added Successfully", " ", "success")
          navigate("/category/");
        })
        .catch((err) => {
          setErrorMessage("Category already exists")
        });
    }
  }

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container mt-5'>
            <h1>Add Category</h1>
            <form onSubmit={sendData}>
              <input
                type="text"
                className={`form-control ${errors.categoryname || errorMessage ? 'is-invalid' : ''}`}
                placeholder='Enter Category Name'
                name='categoryName'
                value={categoryname}
                onChange={(e) => setcategoryName(e.target.value)}
              />
              {errors.categoryname && <div className="invalid-feedback">{errors.categoryname}</div>}
              {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}

              <div className="mb-3">
                <label className="form-label">Location Storage</label>
                <input type="text"
                  className={`form-control ${errors.locationStorage ? 'is-invalid' : ''}`}
                  placeholder='Enter Location Storage'
                  name='locationStorage'
                  value={locationStorage}
                  onChange={(e) => {
                    setloctionStorage(e.target.value);
                  }}
                />
                {errors.locationStorage && <div className="invalid-feedback">{errors.locationStorage}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Location Rack</label>
                <input type="text"
                  className={`form-control ${errors.locationRack ? 'is-invalid' : ''}`}
                  placeholder='Enter Location Rack'
                  name='locationRack'
                  value={locationRack}
                  onChange={(e) => {
                    setloctionRack(e.target.value);
                  }}
                />
                {errors.locationRack && <div className="invalid-feedback">{errors.locationRack}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Category Note</label>
                <textarea
                  className={`form-control`}
                  rows="3"
                  placeholder='Enter Category Note'
                  name='categoryNote'
                  value={categoryNote}
                  onChange={(e) => {
                    setcategoryNote(e.target.value);
                  }}
                >
                </textarea>
              </div>

              <br />
              <input type='submit' className='btn btn-success btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}