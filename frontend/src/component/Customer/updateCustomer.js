import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

export default function UpdateCustomer() {
  const navigate = useNavigate();
  const [bookingRef, setBookingRef] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [DOB, setDOB] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [NIC, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  let { id } = useParams();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
     
  useEffect(() => {
    
    const getCustomer = async (id) => { 
     
      try {
        const response = await axios.get(`http://localhost:8000/api/customer/get/${id}`)
        
        const customer = response.data;
        setBookingRef(customer.bookingRef);
        setCustomerName(customer.customerName);
        setDOB(customer.DOB);
        setNIC(customer.NIC)
        setTelephoneNumber(customer.telephoneNumber);
        setEmail(customer.email);
        setAddress(customer.address);
        setCountry(customer.country);        
       
      } catch (err) {
        console.log(err);
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000)
      }
    };
    getCustomer(id);
    
  }, [id]);
  

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!bookingRef) {
      formIsValid = false;
      errors["bookingRef"] = "Please enter booking Reference";
    }

    if (!customerName) {
      formIsValid = false;
      errors["customerName"] = "Please enter name";
    }

    if (!NIC) {
      formIsValid = false;
      errors["NIC"] = "Please enter NIC";
    }

    if (!DOB) {
      formIsValid = false;
      errors["DOB"] = "Please enter date of birth";
    }

    if (!telephoneNumber) {
      formIsValid = false;
      errors["telephoneNumber"] = "Please enter telephone number";
    }

    if (!email) {
      formIsValid = false;
      errors["email"] = "Please enter email";
    }

    if (!address) {
      formIsValid = false;
      errors["address"] = "Please enter address";
    }

    if (!country) {
      formIsValid = false;
      errors["country"] = "Please enter country";
    }
    
    setErrors(errors);
    return formIsValid;
  }

  function updateData(e) {
    e.preventDefault();
    console.log("form submitted");
    
    if (validateForm()) {
      console.log("form is valid");

    const updatedcustomer = {
      bookingRef,
      customerName,
      DOB,
      telephoneNumber,
      NIC,
      email,
      address,
      country,
     
    };

    console.log("updating customer with data: ", updatedcustomer);

    axios
      .put(`http://localhost:8000/api/customer/update/${id}`, updatedcustomer)

      //console.log(id)
      .then(() => {
        console.log("customer updated");
        alert("Customer updated");
        navigate("/customer/");
      })
      .catch((err) => {
        console.log("error updating customer: ", err);
      });
  }
}

  return (
    <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
    <div className="container">
      <h1>Update Customer Details</h1>
      <form onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Booking Reference</label>
          <input
            type="text"
            className={`form-control ${errors.bookingRef ? 'is-invalid' : ''}`}
            placeholder="Enter Booking Reference"
            name="bookingRef"
            value={bookingRef}
            onChange={(e) => {
             setBookingRef(e.target.value);
            }}
          />
          {errors.bookingRef && <div className="invalid-feedback">{errors.bookingRef}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
            placeholder="Enter Customer Name"
            name="customerName"
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
            }}
          />
          {errors.customerName && <div className="invalid-feedback">{errors.customerName}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">NIC</label>
          <input
            type="text"
            className={`form-control ${errors.NIC ? 'is-invalid' : ''}`}
            placeholder="Enter NIC"
            name="NIC"
            value={NIC}
            onChange={(e) => {
              setNIC(e.target.value);
            }}
          />
          {errors.NIC && <div className="invalid-feedback">{errors.NIC}</div>}
          {errorMessage && <div style={{ color: "red" }}>NIC already exists</div>}
        </div>


        <div className="mb-3">
          <label className="form-label">Telephone Number</label>
          <input
            type="Number"
            className={`form-control ${errors.telephoneNumber ? 'is-invalid' : ''}`}
            placeholder="Enter Date of Birth"
            name="TelephoneNumber"
            value={telephoneNumber}
            onChange={(e) => {
              setTelephoneNumber(e.target.value);
            }}
          />
          {errors.telephoneNumber && <div className="invalid-feedback">{errors.telephoneNumber}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  rows="3"
                  placeholder='Enter Address'
                  name='address'
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>


        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
            placeholder="Enter country"
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          {errors.country && <div className="invalid-feedback">{errors.country}</div>}
        </div>
        
        
        <br />
        <input
          type="submit"
          className="btn btn-outline-success btn-block mt-4"
          
        />
        <br></br>      
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}