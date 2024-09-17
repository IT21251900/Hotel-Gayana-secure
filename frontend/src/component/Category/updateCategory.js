import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCategory() {
  const navigate = useNavigate();
  const [categoryname, setcategoryName] = useState("");
  const [locationStorage, setlocationStorage] = useState("");
  const [locationRack, setlocationRack] = useState("");
  const [categoryNote, setcategoryNote] = useState("");
  const [errors, setErrors] = useState({});
  let { id } = useParams();

//fetch Category data by ID
  useEffect(() => {
    const getCategory = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/category/get/${id}`)

        const category = response.data;
        setcategoryName(category.categoryname);
        setlocationStorage(category.locationStorage);
        setlocationRack(category.locationRack);
        setcategoryNote(category.categoryNote);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory(id);

  }, [id]);

  //update Category
  function updateData(e) {
    e.preventDefault();

    if (validateForm()) {
      const updatedCategory = {
        categoryname,
        locationStorage,
        locationRack,
        categoryNote,
      };
      axios
        .put(`http://localhost:8000/api/category/update/${id}`, updatedCategory)
        //console.log(id)
        .then(() => {
          swal("Category Updated Successfully", " ", "success")
          navigate("/category/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //validate Form
  function validateForm() {
    let formIsValid = true;
    let errors = {};

    setErrors({})

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

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className="container mt-5">
            <h1>Update Category</h1>
            <form onSubmit={updateData}>
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  placeholder="Enter Category Name"
                  name="categoryName"
                  value={categoryname}
                  onChange={(e) => {
                    setcategoryName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location Storage</label>
                <input
                  type="text"
                  className={`form-control ${errors.locationStorage ? 'is-invalid' : ''}`}
                  placeholder="Enter Location Storage"
                  name="locationStorage"
                  value={locationStorage}
                  onChange={(e) => {
                    setlocationStorage(e.target.value);
                  }}
                />
                {errors.locationStorage && <div className="invalid-feedback">{errors.locationStorage}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Location Rack</label>
                <input
                  type="text"
                  className={`form-control ${errors.locationRack ? 'is-invalid' : ''}`}
                  placeholder="Enter Location Rack"
                  name="locationRack"
                  value={locationRack}
                  onChange={(e) => {
                    setlocationRack(e.target.value);
                  }}
                />
                {errors.locationRack && <div className="invalid-feedback">{errors.locationRack}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Category Note</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter Category Note"
                  name="categoryNote"
                  value={categoryNote}
                  onChange={(e) => {
                    setcategoryNote(e.target.value);
                  }}
                ></textarea>
              </div>
              <br />
              <input
                type="submit"
                className="btn btn-success btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
