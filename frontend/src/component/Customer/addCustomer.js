import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Addcustomer() {
  const navigate = useNavigate();
  const [bookingRef, setBookingRef] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [NIC, setNIC] = useState("");
  const[DOB,setDOB]=useState("");
  const[telephoneNumber,settelephoneNumber]=useState("");
  const[email,setEmail]=useState("");
  const[address,setAddress]=useState("");
  const[country,setCountry]=useState("");
  const [errors, setErrors] = useState({});
  //const [errorMessage, setErrorMessage] = useState(null);
  
  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!bookingRef) {
      formIsValid = false;
      errors["bookingRef"] = "Please enter booking reference";
    }

    if (!customerName) {
      formIsValid = false;
      errors["customerName"] = "Please enter name";
    }

    
    if (!NIC) {
      formIsValid = false;
      errors["NIC"] = "Please enter NIC";
    }

    
    if (!telephoneNumber) {
      formIsValid = false;
      errors["telephoneNumber"] = "Please enter telephoneNumber";
    }

    if (!DOB) {
      formIsValid = false;
      errors["DOB"] = "Please enter Date of Birth";
    }

    if (!email) {
      formIsValid = false;
      errors["email"] = "Please enter Email";
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

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
    const newcustomer = {
        bookingRef,
        customerName,
        NIC,
        DOB,
        telephoneNumber,
        email,
        address,
        country
    };
    
      axios
        .post("http://localhost:8000/api/customer/save", newcustomer)
        .then(() => {
          alert("New customer added");
          navigate("/customer/");
        })
        
      .catch((err) => {
        console.log('having'+err);
      
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
              paddingRight: '5rem' ,
              paddingTop:'5rem',
              paddingBottom:'5rem',
              fontFamily:'Oswald, sans-serif'}}>
            
            <div 
                style={{ 
                  backgroundColor: 'rgba(68, 62, 162, 0.1',
                  padding:'3rem',
                  boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.1)'}}>
            <br/> 

            <h1 style={{fontFamily:'Oswald,sans-serif'}}>Add a New Customer</h1><br/>
            <form onSubmit={sendData}>
              
              
              <div className="mb-3">
                <label className="form-label">Booking Reference</label>
                  <input
                  type="Number"
                  className={`form-control ${errors.bookingRef ? 'is-invalid' : ''}`}
                  placeholder='Enter Booking Reference'
                  name='bookingRef'
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
                  placeholder='Enter Customer Name' 
                  name='customerName'
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                  }}
                /> 
               {errors.customerName && <div className="invalid-feedback">{errors.customerName}</div>}

               </div>

              <div></div>

               
              <div className="mb-3">
                <label className="form-label">NIC</label>
                <input
                  type="text"
                  className={`form-control ${errors.NIC ? 'is-invalid' : ''}`}
                  placeholder='Enter NIC' 
                  name='NIC'
                  onChange={(e) => {
                    setNIC(e.target.value);
                  }}
                /> 
               {errors.NIC && <div className="invalid-feedback">{errors.NIC}</div>}

               
              </div>
              
              <div className="mb-3">
                <label className="form-label">Enter DOB</label>
               <input
                  type="Date"
                  className={`form-control ${errors.DOB ? 'is-invalid' : ''}`}
                  placeholder='Enter DOB' 
                  name='DOB'
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                />
               {errors.DOB && <div className="invalid-feedback">{errors.DOB}</div>}
                </div>

                <div className="mb-3">
                <label className="form-label">Telephone Number</label>
                  <input
                  type="Number"
                  className={`form-control ${errors.telephoneNumber ? 'is-invalid' : ''}`}
                  placeholder='Enter Telephone Number'
                  name='telephoneNumber'
                  onChange={(e) => {
                    settelephoneNumber(e.target.value);
                  }}
                />
               {errors.telephoneNumber && <div className="invalid-feedback">{errors.telephoneNumber}</div>}

              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                  <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder='Enter Email'
                  name='Email'
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
                  name='Address'
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}

              </div>

              <div className="mb-3">
                <label className="form-label">Country</label>
                  <input
                  type="Text"
                  className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                  placeholder='Enter Country'
                  name='country'
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
               {errors.country && <div className="invalid-feedback">{errors.country}</div>}

              </div>
              <br/>
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
              />
            </form>
          </div></div>
        </div>
      </div>
    </div>
  );

}