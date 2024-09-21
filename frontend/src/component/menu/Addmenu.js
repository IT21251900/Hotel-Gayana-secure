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

    if (!price || price < 0) {
      formIsValid = false;
      errors["price"] = "Please enter a valid price";
    }

    if (!description) {
      formIsValid = false;
      errors["description"] = "Please enter the description";
    }

    if (!menunumber || menunumber <= 0) {
      formIsValid = false;
      errors["menunumber"] = "Please enter a valid menu number";
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
        menunumber,
      };

      axios
        .post("http://localhost:8000/api/menu/save", newmenu)
        .then(() => {
          alert("New menu added");
          navigate("/menu/");
        })
        .catch((err) => {
          console.log("Error: " + err);
          setErrorMessage(err.response?.data?.error || "An error occurred");
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
            <h1>Add a New Menu</h1>
            <form onSubmit={sendData}>
              {/* Menu */}
              <div className="mb-3">
                <label className="form-label">Menu</label>
                <input
                  type="text"
                  className={`form-control ${errors.menu ? "is-invalid" : ""}`}
                  placeholder="Enter menu"
                  onChange={(e) => setmenu(e.target.value)}
                  disabled={false} // You can add conditions to disable based on other states
                />
                {errors.menu && <div className="invalid-feedback">{errors.menu}</div>}
              </div>

              {/* Menu Category */}
              <div className="mb-3">
                <label className="form-label">Menu Category</label>
                <input
                  type="text"
                  className={`form-control ${errors.menucat ? "is-invalid" : ""}`}
                  placeholder="Enter category"
                  onChange={(e) => setmenucat(e.target.value)}
                />
                {errors.menucat && <div className="invalid-feedback">{errors.menucat}</div>}
              </div>

              {/* Price */}
              <div className="input-group mb-3">
                <label className="input-group mb-3">Price (Rs.)</label>
                <span className="input-group-text">Rs.</span>
                <input
                  type="number"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                  onChange={(e) => setprice(e.target.value)}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>

              {/* Menu No */}
              <div className="mb-3">
                <label className="form-label">Enter Menu No.</label>
                <input
                  type="number"
                  className={`form-control ${errors.menunumber ? "is-invalid" : ""}`}
                  placeholder="Enter menu number"
                  onChange={(e) => setmenunumber(e.target.value)}
                />
                {errors.menunumber && <div className="invalid-feedback">{errors.menunumber}</div>}
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className={`form-control ${errors.description ? "is-invalid" : ""}`}
                  rows="3"
                  placeholder="Enter description"
                  onChange={(e) => setdescription(e.target.value)}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <br />
              <input type="submit" className="btn btn-outline-success btn-block mt-4" disabled={Object.keys(errors).length > 0} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
