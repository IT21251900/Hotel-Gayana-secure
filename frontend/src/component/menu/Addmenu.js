import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddVehicle() {
  const navigate = useNavigate();
  const [menu, setmenu] = useState("");
  const [menucat, setmenucat] = useState("");
  const [price, setprice] = useState("");
  const [menunumber, setmenunumber] = useState("");
  const [description, setdescription] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!menu) {
      formIsValid = false;
      errors["menu"] = "Please enter the menu";
    }

    if (!menucat) {
      formIsValid = false;
      errors["menucat"] = "Please enter the category";
    }

    if (!price) {
      formIsValid = false;
      errors["price"] = "Please enter the price";
    }

    if (!description) {
      formIsValid = false;
      errors["description"] = "Please enter the description";
    }

    if (!menunumber) {
      formIsValid = false;
      errors["menunumber"] = "Please enter the menu number";
    }

    setErrors(errors);
    return formIsValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newmenu = {
        menu,
        menucat,
        price,
        description,
        menunumber
      };

      axios
        .post("http://localhost:8000/api/menu/save", newmenu)
        .then(() => {
          alert("New menu added");
          navigate("/menu/");
        })
        .catch((err) => {
          console.log('having' + err);
          setErrorMessage(err.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        });
    }
  }

  return (
    <div className="container dashboard">
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container m-5">
            <h1>Add a New mwnu</h1>
            <form onSubmit={sendData}>
              {/* Vehicle Model */}
              <div className="mb-3">
                <label className="form-label">Menu</label>
                <input
                  type="text"
                  className={`form-control ${errors.menu ? "is-invalid" : ""}`}
                  placeholder="Enter menu"
                  name="menu"
                  onChange={(e) => {
                    setmenu(e.target.value);
                  }}
                />
                {errors.menu && <div className="invalid-feedback">{errors.menu}</div>}
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label"> Menu Category</label>
                <input
                  type="text"
                  className={`form-control ${errors.menucat ? "is-invalid" : ""}`}
                  placeholder="Enter category"
                  name="menucat"
                  onChange={(e) => {
                    setmenucat(e.target.value);
                  }}
                />
                {errors.menucat && <div className="invalid-feedback">{errors.menucat}</div>}
              </div>

              {/* Price */}
              <div className="input-group mb-3">
                <label className="input-group mb-3">Price (Rs.)</label>
                <span class="input-group-text">Rs. </span>
                <input
                  type="number"
                  className={`form-control ${errors.price ? "is-invalid"
                  : ""}`}
                  aria-label="Amount (to the nearest dollar)"
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                  name="price"
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>

              {/* Enter vehicle Dash No */}
              <div className="mb-3">
                <label className="form-label">Enter menu NO.</label>
                <input
                  type="number"
                  className={`form-control ${errors.menunumber ? "is-invalid" : ""}`}
                  placeholder="Enter menu number"
                  name="menunumber"
                  onChange={(e) => {
                    setmenunumber(e.target.value);
                  }}
                />
                {errors.menunumber && <div className="invalid-feedback">{errors.menunumber}</div>}
                {errorMessage && <div style={{ color: "red" }}>menu no already exists</div>}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className={`form-control ${errors.description ? "is-invalid" : ""}`}
                  rows="3"
                  placeholder="Enter description"
                  name="description"
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
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
