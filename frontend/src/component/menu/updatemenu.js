import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

export default function UpdateVehicle() {
  const navigate = useNavigate();
  const [menu, setmenuName] = useState("");
  const [menucat, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const[menunumber,setmenuNumber]=useState("");
  const[description,setDescription]=useState("");
  let { id } = useParams();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

 
  useEffect(() => {
    
    const getmenu = async (id) => { 
     
      try {
        const response = await axios.get(`http://localhost:8000/api/menu/get/${id}`)

        const menu = response.data;
        setmenuName(menu.menu);
        setCategory(menu.menucat);
        setPrice(menu.price);
        setmenuNumber(menu.menunumber);
        setDescription(menu.description);
        

      } catch (err) {
        console.log(err);
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000)
      }
    };
    getmenu(id);
    
  }, [id]);

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!menu) {
      formIsValid = false;
      errors["vehicleModel"] = "Please enter Vehicle Model";
    }

    if (!menucat) {
      formIsValid = false;
      errors["category"] = "Please enter category";
    }

    
    if (!price) {
      formIsValid = false;
      errors["price"] = "Please enter price";
    }

    
    if (!description) {
      formIsValid = false;
      errors["description"] = "Please enter description";
    }

    if (!menunumber) {
      formIsValid = false;
      errors["vehicle_dash_number"] = "Please enter vehicle dash number";
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
      description
    };
    axios
      .put(`http://localhost:8000/api/menu/update/${id}`, updatedmenu)
      //console.log(id)
      .then(() => {
        alert("menu updated");
        navigate("/menu/");
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
      <h1>Update Menu Details</h1>
      <form onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Menu</label>
          <input
            type="text"
            className={`form-control ${errors.menu ? 'is-invalid' : ''}`}
            placeholder="Enter vehicle model"
            name="menu"
            value={menu}
            onChange={(e) => {
                setmenuName(e.target.value);
            }}
          />
         {errors.menu && <div className="invalid-feedback">{errors.menu}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">category</label>
          <input
            type="text"
            className={`form-control ${errors.menucat ? 'is-invalid' : ''}`}
            placeholder="Enter menucat"
            name="menucat"
            value={menucat}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          {errors.menucat && <div className="invalid-feedback">{errors.menucat}</div>}
        </div>

        <div className="input-group mb-3">
          <label className="input-group mb-3">price</label>
          <span class="input-group-text">Rs. </span>
          <input type="number"
           className={`form-control ${errors.price ? 'is-invalid' : ''}`}
           aria-label="Amount (to the nearest dollar)"
           min="0" step="0.01"
           placeholder='Enter price' 
           name="price"
           value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            />
         {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

    
        <div className="mb-3">
          <label className="form-label">Menus No.</label>
          <input
            type="number"
            className={`form-control ${errors.menunumber ? 'is-invalid' : ''}`}
            placeholder="Enter vehicle dash number"
            name="vehicle_dash_number"
            value={menunumber}
            onChange={(e) => {
                setmenuNumber(e.target.value);
            }}
          />
           {errors.menunumber && <div className="invalid-feedback">{errors.menunumber}</div>}
          {errorMessage && <div style={{ color: "red" }}>Vehicle dash number already exists</div>}     
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
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
