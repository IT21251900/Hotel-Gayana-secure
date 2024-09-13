import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const navigate = useNavigate();
  const [itemName, setitemName] = useState("")
  const [category, setcategory] = useState("")
  const [quantitiy, setquantitiy] = useState("")
  const [price, setprice] = useState("")
  const [supplier, setsupplier] = useState("")
  const [description, setdescription] = useState("")
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [qntitiyerrorMessage, setQntityErrorMessage] = useState('');

  //form Validate
  function validateForm() {
    let formIsValid = true;
    let errors = {};

    setErrors({})

    if (!itemName) {
      formIsValid = false;
      errors["itemName"] = "Please enter item name";

    }
    if (!quantitiy) {
      formIsValid = false
      errors["quantitiy"] = "Please enter Valid quantitiy";
    }

    if (!category) {
      formIsValid = false;
      errors["category"] = "Please select valid category ";
    }

    if (!price) {
      formIsValid = false;
      errors["price"] = "Please enter price";
    }
    if (!supplier) {
      formIsValid = false;
      errors["supplier"] = "Please select valid supplier Name";
    }

    setErrors(errors);
    return formIsValid;
  }
  //gete Category Details
  useEffect(() => {
    const getCategories = () => {
      axios.get("http://localhost:8000/api/category/get/")
        .then((res) => {
          setCategories(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getCategories()
  }, [])

  //get Supplier Details
  useEffect(() => {
    const getSupplier = () => {
      axios.get("http://localhost:8000/api/supplier/get")
        .then((res) => {
          setSuppliers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSupplier();
  }, []);

  //Save Item Data
  function sendData(e) {
    e.preventDefault()
    if (validateForm()) {
      const newItem = {
        itemName,
        category,
        quantitiy,
        price,
        supplier,
        description
      }

      axios
        .post("http://localhost:8000/api/item/save", newItem)
        .then(() => {
          swal("Item  Added Successfully", " ", "success")
          navigate('/item/')
        })
        .catch((err) => {
          setErrorMessage("Item already exists")
        })
    }
  }


  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container mt-5'>
            <h1>Add item</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  className={`form-control ${errors.itemName || errorMessage ? 'is-invalid' : ''}`}
                  onChange={(e) => setitemName(e.target.value.toUpperCase())}
                  style={{ textTransform: 'uppercase' }}
                />
                {errors.itemName && (<div className="invalid-feedback">{errors.itemName}</div>)}
                {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
              </div>



              <div className="mb-3">
                <label className="form-label">Select Category</label>
                <select className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                  value={category}
                >
                  <option value="" disabled>Choose...</option>
                  {categories.map((category) => (
                    <option key={category.categoryname} value={category.categoryname}>{category.categoryname}</option>
                  ))}
                </select>
                {errors.category && (<div className="invalid-feedback">{errors.category}</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className={`form-control ${errors.quantitiy ? 'is-invalid' : ''}`}
                  placeholder='Enter Quantity'
                  name='Quantity'
                  value={quantitiy}
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setquantitiy(e.target.value);
                      setQntityErrorMessage('');
                    } else {
                      setQntityErrorMessage('Please enter a positive number only.');
                    }
                  }}
                />
                {errors.quantitiy && (<div className="invalid-feedback">{errors.quantitiy}</div>)}
                {qntitiyerrorMessage && <div className="invalid-feedback">{qntitiyerrorMessage}</div>}
              </div>
              <div className="input-group mb-3">
                <label className="input-group mb-3">Price(Rs.)</label>
                <span className="input-group-text">Rs. </span>
                <input type="number"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  aria-label="Amount (to the nearest dollar)"
                  min="0"
                  step="0.01"
                  placeholder='Enter Per Item Price'
                  name='price'
                  onChange={(e) => {
                    setprice(e.target.value);
                  }} />
                {errors.price && (<div className="invalid-feedback">{errors.price}</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Select Supplier</label>
                <select
                  className={`form-select ${errors.supplier ? 'is-invalid' : ''}`}
                  onChange={(e) => {
                    setsupplier(e.target.value);
                  }}
                  value={supplier}
                >
                  <option value="" disabled>Choose...</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier.supplier}>
                      {supplier.supplier}
                    </option>
                  ))}
                </select>


                {errors.supplier && (<div className="invalid-feedback">{errors.supplier}</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control"
                  rows="3"
                  placeholder='Enter Item Description'
                  name='Description'
                  onChange={(e) => {
                    setdescription(e.target.value);
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
  )
}