import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Addsupport() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [NIC, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});
  
  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!customerName) {
      formIsValid = false;
      errors["customerName"] = "Please enter name";
    }
    
    if (!NIC) {
      formIsValid = false;
      errors["NIC"] = "Please enter NIC";
    }
    
    if (!email) {
      formIsValid = false;
      errors["email"] = "Please enter email";
    }

    if (!category) {
      formIsValid = false;
      errors["category"] = "Please select a category";
    }

    if (!subject) {
      formIsValid = false;
      errors["subject"] = "Please enter a subject";
    }

    if (!description) {
      formIsValid = false;
      errors["description"] = "Please enter the description";
    }

    setErrors(errors);
    return formIsValid;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
    const newsupport = {
      customerName,
      NIC,
      email,
      category,
      subject,
      description
    };
    
    console.log("New support:", newsupport); // Log the support data

      axios
        .post("http://localhost:8000/api/support/save", newsupport)
        .then(() => {
          alert("New support added");
          navigate("/support/");
        })
        
      .catch((err) => {
        console.log("Error:", err);    
      });
    }
  }
  
  return (
    <div className='container dashboard' >
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container m-5' 
             style={{ 
              paddingLeft: '5rem',
              paddingRight: '5rem' ,
              paddingTop:'5rem',
              paddingBottom:'5rem',
              fontFamily:'Oswald, sans-serif'}}>
            
            <div style={{ 
              backgroundColor: 'rgba(68, 62, 162, 0.1',
              padding:'3rem',
              boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.1)'}}>
            <br/>
            
            <h2><center>Submit a Support Ticket</center></h2>
            <br/>
            <form onSubmit={sendData} > 

             <div className="mb-3" style={{ display: 'flex', gap: '1rem'}}>
              <div style={{ flex: '1' }}>
                <label className="form-label" style={{marginLeft: '5px'}}>Customer Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
                  placeholder='Enter your name' 
                  name='customerName'
                  onChange={(e) => {
                    console.log("Customer Name:", e.target.value);
                    setCustomerName(e.target.value);
                  }}
                  style={{ width: '100%' }}
                /> 
               {errors.customerName && <div className="invalid-feedback">{errors.customerName}</div>}
               </div>
               
              <div style={{ flex: '1' }}>
                <label className="form-label"style={{marginLeft: '5px'}}>NIC</label>
                <input
                  type="text"
                  className={`form-control ${errors.NIC ? 'is-invalid' : ''}`}
                  placeholder='Enter your NIC' 
                  name='NIC'
                  onChange={(e) => {
                    console.log("NIC:", e.target.value);
                    setNIC(e.target.value);
                  }}
                  style={{ width: '100%' }}
                /> 
               {errors.NIC && <div className="invalid-feedback">{errors.NIC}</div>}               
              </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label"style={{marginLeft: '5px'}}>Email</label>
               <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder='Enter your email' 
                  name='email'
                  onChange={(e) => {
                    console.log("Hear about hotel:", e.target.value);
                    setEmail(e.target.value);
                  }}
                />
               {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              
              {/*category*/}
              <div className="mb-3">
                <label className="form-label" style={{marginLeft: '5px'}}>Select a category</label>
                  <select className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                    name='category'
                    onChange={(e) => {
                      console.log('Selected value:', e.target.value);      
                      setCategory(e.target.value);
                    }}  >
                      <option value="">Select an option</option>
                      <option value="Room Reservation">Room Reservation</option>   
                      <option value="Check-in/Check-out">Check-in/Check-out</option>    
                      <option value="Facilities and Amenities">Facilities and Amenities</option>    
                      <option value="Housekeeping">Housekeeping</option>                          
                      <option value="Billing and Payments">Billing and Payments</option>    
                      <option value="Wi-Fi and Internet">Wi-Fi and Internet</option>
                      <option value="Event or Conference Services">Event or Conference Services</option>
                      <option value="Concierge Services">Concierge Services</option>
                      <option value="Other Complaints">Other Complaints</option>
                  </select>

                  {errors.category && <div className="invalid-feedback">{errors.category}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label"style={{marginLeft: '5px'}}>Subject</label>
                <input
                  type="text"
                  className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                  placeholder='Enter a subject' 
                  name='subject'
                  onChange={(e) => {
                    console.log("subject:", e.target.value);
                    setSubject(e.target.value);
                  }}
                /> 
               {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}               
              </div>

              <div className="mb-3">
                <label className="form-label"style={{marginLeft: '5px'}}>Description</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  rows="5"
                  placeholder='Enter the description'
                  name='description'
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}

              </div>

              <br/>
              {/* Submit button */}
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