import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

export default function UpdateVehicle() {
  const navigate = useNavigate();
  const [vehicleModel, setVehicleName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const[vehicle_dash_number,setVehicleDashNumber]=useState("");
  const[description,setDescription]=useState("");
  let { id } = useParams();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    
    const getVehicle = async (id) => { 
     
      try {
        const response = await axios.get(`http://localhost:8000/api/vehicle/get/${id}`)

        const vehicle = response.data;
        setVehicleName(vehicle.vehicleModel);
        setCategory(vehicle.category);
        setPrice(vehicle.price);
        setVehicleDashNumber(vehicle.vehicle_dash_number);
        setDescription(vehicle.description);
        

      } catch (err) {
        console.log(err);
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000)
      }
    };
    getVehicle(id);
    
  }, [id]);

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!vehicleModel) {
      formIsValid = false;
      errors["vehicleModel"] = "Please enter Vehicle Model";
    }

    if (!category) {
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

    if (!vehicle_dash_number) {
      formIsValid = false;
      errors["vehicle_dash_number"] = "Please enter vehicle dash number";
    }
    setErrors(errors);
    return formIsValid;
  }


  function updateData(e) {
    e.preventDefault();
    
    if (validateForm()) {
    const updatedVehicle = {
      vehicleModel,
      category,
      price,
      vehicle_dash_number,
      description
    };
    axios
      .put(`http://localhost:8000/api/vehicle/update/${id}`, updatedVehicle)
      //console.log(id)
      .then(() => {
        alert("Vehicle updated");
        navigate("/vehicle/");
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
      <h1>Update Vehicle Details</h1>
      <form onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Vehicle Model</label>
          <input
            type="text"
            className={`form-control ${errors.vehicleModel ? 'is-invalid' : ''}`}
            placeholder="Enter vehicle model"
            name="vehicleModel"
            value={vehicleModel}
            onChange={(e) => {
              setVehicleName(e.target.value);
            }}
          />
         {errors.vehicleModel && <div className="invalid-feedback">{errors.vehicleModel}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Enter category</label>
          <input
            type="text"
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            placeholder="Enter category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>

        <div className="input-group mb-3">
          <label className="input-group mb-3">Enter price</label>
          <span class="input-group-text">Rs. </span>
          <input type="number"
           className={`form-control ${errors.price ? 'is-invalid' : ''}`}
           aria-label="Amount (to the nearest dollar)"
           min="0" step="0.01"
           placeholder='Enter price' 
           name='price'
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            />
         {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

    
        <div className="mb-3">
          <label className="form-label">Vehicle Dash Number</label>
          <input
            type="number"
            className={`form-control ${errors.vehicle_dash_number ? 'is-invalid' : ''}`}
            placeholder="Enter vehicle dash number"
            name="vehicle_dash_number"
            value={vehicle_dash_number}
            onChange={(e) => {
              setVehicleDashNumber(e.target.value);
            }}
          />
           {errors.vehicle_dash_number && <div className="invalid-feedback">{errors.vehicle_dash_number}</div>}
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
