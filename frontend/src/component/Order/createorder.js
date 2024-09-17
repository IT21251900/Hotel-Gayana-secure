import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [orderNumber, setorderNumber] = useState('');
  const [itemName, setitemName] = useState('');
  const [itemDescription, setitemDescription] = useState('');
  const [category, setcategory] = useState('');
  const [supplier, setsupplier] = useState('');
  const [supplierContacNo, setsupplierContacNo] = useState('');
  const [supplierAddress, setsupplierAddress] = useState('');
  const [supplierEmail, setsupplierEmail] = useState('');
  const [rate, setrate] = useState('');
  const [quantity, setquantity] = useState('');
  const [orderNote, setorderNote] = useState('');
  const [orderStatus] = useState('Pending Approval');
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});

 
  //order Validate
  function validateForm() {
    let formIsValid = true;
    let errors = {};

    setErrors({});

    if (!itemName) {
      formIsValid = false;
      errors["itemName"] = "Please select an item";
    }

    if (!quantity) {
      formIsValid = false;
      errors["quantity"] = "Please enter quantity";
    } else if (quantity <= 0) {
      formIsValid = false;
      errors["quantity"] = "Quantity must be a positive number";
    }

    setErrors(errors);
    return formIsValid;
  }
  
  //fetch supplier data
  useEffect(() => {
    const getSuppliers = () => {
      axios
        .get("http://localhost:8000/api/supplier/get")
        .then((res) => {
          const matchedSupplier = res.data.find((s) => s.supplier === supplier);
          if (matchedSupplier) {
            setsupplierAddress(matchedSupplier.supplierAddress);
            setsupplierContacNo(matchedSupplier.supplierContacNo);
            setsupplierEmail(matchedSupplier.supplierEmail);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSuppliers();
  }, [supplier]);

  //fetch item data
  useEffect(() => {
    const getItems = () => {
      axios
        .get('http://localhost:8000/api/item/get')
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getItems();
  }, []);

  //set data drop down
  const handleItemChange = (e) => {
    const selectedItem = items.find((item) => item.itemName === e.target.value);
    setitemName(selectedItem.itemName);
    setitemDescription(selectedItem.description);
    setcategory(selectedItem.category);
    setsupplier(selectedItem.supplier);
    setrate(selectedItem.price);
  };

  //get last order number
  const getOrderNumber = async () => {
    const response = await fetch('http://localhost:8000/api/order/lastNumber');
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getOrderNumber()
      .then((data) => {
        setorderNumber(data.lastOrderNumber + 1);
      })
      .catch((error) => {
        setorderNumber(1);
      });
  }, []);

  //save order Data
  const sendData = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newOrder = {
        orderNumber,
        itemName,
        itemDescription,
        category,
        supplier,
        supplierAddress,
        supplierContacNo,
        supplierEmail,
        rate,
        quantity,
        orderNote,
        orderStatus,
      };
      axios
        .post('http://localhost:8000/api/order/save', newOrder)
        .then(() => {
          swal("Order Added Successfully", " ", "success")
          navigate('/orders/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container mt-5'>
            <h1>Create Order</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">Order Number</label>
                <input
                  type="number"
                  className="form-control"
                  name='orderNumber'
                  id='orderNumber'
                  readOnly
                  value={orderNumber}
                  onChange={(e) => {
                    setorderNumber(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Select Item</label>
                <select
                  className={`form-select ${errors.itemName ? 'is-invalid' : ''}`}
                  onChange={handleItemChange}
                  value={itemName}
                >
                  <option value="" disabled>Choose...</option>
                  {items.map((item) => (
                    <option key={item.itemName} value={item.itemName}>{item.itemName}</option>
                  ))}
                </select>
                {errors.itemName && (<div className="invalid-feedback">{errors.itemName}</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Category Name'
                  name='category'
                  id='category'
                  readOnly
                  value={category}
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Supplier Name</label>
                <input
                  type="text"
                  className="form-control"
                  name='supplierName'
                  placeholder='Supplier Name'
                  id='supplierName'
                  readOnly
                  value={supplier}
                  onChange={(e) => {
                    setsupplier(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group mb-3">Price(Rs.)</label>
                <span className="input-group-text">Rs. </span>
                <input
                  type="number"
                  className={`form-control ${errors.rate ? 'is-invalid' : ''}`}
                  min="0"
                  step="0.01"
                  placeholder='Enter Per Item Price'
                  name='price'
                  value={rate}
                  onChange={(e) => {
                    setrate(e.target.value);
                  }}
                />
                {errors.rate && (<div className="invalid-feedback">{errors.rate}</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                  name='quantity'
                  placeholder='Please enter Quantity'
                  id='quantity'
                  min="0"
                  value={quantity}
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setquantity(e.target.value);
                      setErrors('');
                    } else {
                      setErrors('Please enter a positive number only.');
                    }
                  }}
                />
                {errors.quantity && (<div className="invalid-feedback">{errors.quantity}</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Order Note</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder='Enter order Note'
                  name='orderNote'
                  value={orderNote}
                  onChange={(e) => {
                    setorderNote(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
