import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";

export default function AddItem() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();
  const [itemName, setitemName] = useState("")
  const [category, setcategory] = useState("")
  const [quantitiy, setquantitiy] = useState("")
  const [price, setprice] = useState("")
  const [supplier, setsupplier] = useState("")
  const [description, setdescription] = useState("")
  const [errors, setErrors] = useState({});
  const [qntitiyerrorMessage, setQntityErrorMessage] = useState('');
  let { id } = useParams()

  //validate Form
  function validateForm() {
    let formIsValid = true;
    let errors = {};

    setErrors({})

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
      errors["supplier"] = "Please enter supplier Name";
    }

    setErrors(errors);
    return formIsValid;
  }

  //fetch Category Details
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

  //fetch Item dat by Id
  useEffect(() => {
    const getItem = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/item/get/${id}`)
        const item = response.data
        setitemName(item.itemName)
        setcategory(item.category)
        setquantitiy(item.quantitiy)
        setprice(item.price)
        setsupplier(item.supplier)
        setdescription(item.description)
      } catch (err) {
        console.log(err)
      }
    }
    getItem(id)
  }, [id])

  //Update Item 
  function UpdateData(e) {
    e.preventDefault()

    if (validateForm()) {
      const UpdatedItem = {
        itemName,
        category,
        quantitiy,
        price,
        supplier,
        description
      }

      axios
        .put(`http://localhost:8000/api/item/update/${id}`, UpdatedItem)
        //console.log(id)
        .then(() => {
          swal("Item  Updated Successfully", " ", "success")
          navigate('/item/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }


  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container mt-5'>
            <h1>Update item</h1>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Add Supplier</button>
            &nbsp;&nbsp;&nbsp;
            <form onSubmit={UpdateData}>
              <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input type="text"
                  disabled
                  className="form-control"
                  placeholder='Enter Item Name'
                  name='itemName'
                  value={itemName}
                  onChange={(e) => setitemName(e.target.value.toUpperCase())}
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Select Category</label>
                <select className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                  value={category}
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}>
                  {categories.map((category, index) => (
                    <option key={index} value={category.categoryname}>{category.categoryname}</option>
                  ))}
                </select>
                {errors.category && (<div className="invalid-feedback">{errors.category}</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Quntitiy</label>
                <input type="number"
                  className={`form-control ${errors.quantitiy ? 'is-invalid' : ''}`}
                  placeholder='Enter Quntitiy'
                  name='Quntitiy'
                  value={quantitiy}
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setquantitiy(e.target.value);
                      setQntityErrorMessage('');
                    } else {
                      setquantitiy(0);
                      setQntityErrorMessage('Please enter a positive number only.');
                    }
                  }}
                />
                {errors.quantitiy && (<div className="invalid-feedback">{errors.quantitiy}</div>)}
                {qntitiyerrorMessage && <div className="invalid-feedback">{qntitiyerrorMessage}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Price(Rs.)</label>
                <input type="number"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  min="0" step="0.01"
                  placeholder='Enter Per Item Price'
                  name='price'
                  value={price}
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
                {errors.price && (<div className="invalid-feedback">{errors.price}</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Supplier </label>
                <input type="text"
                  className={`form-control ${errors.supplier ? 'is-invalid' : ''}`}
                  placeholder='Enter Supplier'
                  name='Supplier'
                  value={supplier}
                  onChange={(e) => {
                    setsupplier(e.target.value);
                  }}
                />
                {errors.supplier && (<div className="invalid-feedback">{errors.supplier}</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control"
                  rows="3"
                  placeholder='Enter Item Description'
                  name='Description'
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                >
                </textarea>
              </div>
              <br />
              <input type='submit' className='btn btn-outline-success btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}