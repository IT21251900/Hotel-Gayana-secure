import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from 'validator';

export default function AddCustomer() {
  const navigate = useNavigate();
  const [bookingRef, setBookingRef] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [NIC, setNIC] = useState("");
  const [DOB, setDOB] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});
  const [sanitizationMessage, setSanitizationMessage] = useState("");

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!bookingRef.trim() || !validator.isNumeric(bookingRef)) {
      formIsValid = false;
      errors["bookingRef"] = "Please enter a valid booking reference";
    }
    if (!customerName.trim()) {
      formIsValid = false;
      errors["customerName"] = "Please enter a name";
    }
    if (!NIC.trim()) {
      formIsValid = false;
      errors["NIC"] = "Please enter NIC";
    }
    if (!DOB) {
      formIsValid = false;
      errors["DOB"] = "Please enter Date of Birth";
    }
    if (!telephoneNumber.trim() || !validator.isNumeric(telephoneNumber)) {
      formIsValid = false;
      errors["telephoneNumber"] = "Please enter a valid telephone number";
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors["email"] = "Please enter a valid email";
    }
    if (!address.trim()) {
      formIsValid = false;
      errors["address"] = "Please enter address";
    }
    if (!country.trim()) {
      formIsValid = false;
      errors["country"] = "Please enter country";
    }

    setErrors(errors);
    return formIsValid;
  }

  function sanitizeInput(input) {
    // Replace unwanted characters with an empty string
    return input.replace(/[^A-Za-z0-9' -]+/g, '');
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      // Sanitizing customerName field
      let sanitizedCustomerName = sanitizeInput(customerName);
      let message = customerName !== sanitizedCustomerName ? "Note: Some special characters in the name were sanitized." : "";

      const newcustomer = {
        bookingRef: validator.escape(bookingRef),
        customerName: sanitizedCustomerName,  // Use sanitized customerName
        NIC: validator.escape(NIC),
        DOB,  
        telephoneNumber, 
        email: validator.escape(email),
        address: validator.escape(address),
        country: validator.escape(country),
      };

      setSanitizationMessage(message);

      axios
        .post("http://localhost:8000/api/customer/save", newcustomer)
        .then(() => {
          alert("New customer added");
          navigate("/customer/");
        })
        .catch((err) => {
          console.log('Error: ' + err);
        });
    }
  }

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container m-5'
            style={{
              paddingLeft: '5rem',
              paddingRight: '5rem',
              paddingTop: '5rem',
              paddingBottom: '5rem',
              fontFamily: 'Oswald, sans-serif'
            }}>
            <div
              style={{
                backgroundColor: 'rgba(68, 62, 162, 0.1)',
                padding: '3rem',
                boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.1)'
              }}>
              <br />
              <h1 style={{ fontFamily: 'Oswald, sans-serif' }}>Add a New Customer</h1><br />
              <form onSubmit={sendData}>
                <div className="mb-3">
                  <label className="form-label">Booking Reference</label>
                  <input
                    type="number"
                    className={`form-control ${errors.bookingRef ? 'is-invalid' : ''}`}
                    placeholder='Enter Booking Reference'
                    name='bookingRef'
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value)}
                  />
                  {errors.bookingRef && <div className="invalid-feedback">{errors.bookingRef}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Customer Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
                    placeholder='Enter Customer Name'
                    name='customerName'
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  {errors.customerName && <div className="invalid-feedback">{errors.customerName}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">NIC</label>
                  <input
                    type="text"
                    className={`form-control ${errors.NIC ? 'is-invalid' : ''}`}
                    placeholder='Enter NIC'
                    name='NIC'
                    value={NIC}
                    onChange={(e) => setNIC(e.target.value)}
                  />
                  {errors.NIC && <div className="invalid-feedback">{errors.NIC}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className={`form-control ${errors.DOB ? 'is-invalid' : ''}`}
                    name='DOB'
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                  {errors.DOB && <div className="invalid-feedback">{errors.DOB}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Telephone Number</label>
                  <input
                    type="number"
                    className={`form-control ${errors.telephoneNumber ? 'is-invalid' : ''}`}
                    placeholder='Enter Telephone Number'
                    name='telephoneNumber'
                    value={telephoneNumber}
                    onChange={(e) => setTelephoneNumber(e.target.value)}
                  />
                  {errors.telephoneNumber && <div className="invalid-feedback">{errors.telephoneNumber}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder='Enter Email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                    placeholder='Enter Country'
                    name='country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                </div>

                <br />
                <input
                  type='submit'
                  className='btn btn-outline-success btn-block mt-4'
                  style={{
                    borderColor: '#443ea2',
                    color: '#443ea2'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#443ea2';
                    e.target.style.color = 'white'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = '#443ea2';
                  }}
                  value="Add Customer"
                />

                {sanitizationMessage && (
                  <div className="alert alert-warning mt-3" role="alert">
                    {sanitizationMessage}
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
