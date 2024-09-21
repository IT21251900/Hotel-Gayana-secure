import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateVehicle() {
  const navigate = useNavigate();
  const [menu, setmenuName] = useState("");
  const [menucat, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [menunumber, setmenuNumber] = useState("");
  const [description, setDescription] = useState("");
  let { id } = useParams();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getmenu = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/menu/get/${id}`);
        const menuData = response.data;
        setmenuName(menuData.menu);
        setCategory(menuData.menucat);
        setPrice(menuData.price);
        setmenuNumber(menuData.menunumber);
        setDescription(menuData.description);
      } catch (err) {
        console.log(err);
        setErrorMessage(err.response?.data?.error || "An error occurred while fetching menu details");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
    };
    getmenu(id);
  }, [id]);

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

    if (!price || price <= 0) {
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

  function updateData(e) {
    e.preventDefault();

    if (validateForm()) {
      const updatedmenu = {
        menu,
        menucat,
        price,
        menunumber,
        description,
      };

      axios
        .put(`http://localhost:8000/api/menu/update/${id}`, updatedmenu)
        .then(() => {
          alert("Menu updated");
          navigate("/menu/");
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.response?.data?.error || "An error occurred while updating the menu");
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        });
    }
  }

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className="container m-5">
            <h1>Update Menu Details</h1>
            <form onSubmit={updateData}>
              <div className="mb-3">
                <label className="form-label">Menu</label>
                <input
                  type="text"
                  className={`form-control ${errors.menu ? 'is-invalid' : ''}`}
                  placeholder="Enter menu"
                  name="menu"
                  value={menu}
                  onChange={(e) => setmenuName(e.target.value)}
                />
                {errors.menu && <div className="invalid-feedback">{errors.menu}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className={`form-control ${errors.menucat ? 'is-invalid' : ''}`}
                  placeholder="Enter category"
                  name="menucat"
                  value={menucat}
                  onChange={(e) => setCategory(e.target.value)}
                />
                {errors.menucat && <div className="invalid-feedback">{errors.menucat}</div>}
              </div>

              <div className="input-group mb-3">
                <label className="input-group mb-3">Price</label>
                <span className="input-group-text">Rs. </span>
                <input
                  type="number"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  aria-label="Amount"
                  min="0"
                  step="0.01"
                  placeholder='Enter price' 
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Menu No.</label>
                <input
                  type="number"
                  className={`form-control ${errors.menunumber ? 'is-invalid' : ''}`}
                  placeholder="Enter menu number"
                  name="menunumber"
                  value={menunumber}
                  onChange={(e) => setmenuNumber(e.target.value)}
                />
                {errors.menunumber && <div className="invalid-feedback">{errors.menunumber}</div>}
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  placeholder="Enter description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <br />
              <input
                type="submit"
                className="btn btn-outline-success btn-block mt-4"
                disabled={Object.keys(errors).length > 0} // Disable button if there are errors
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
