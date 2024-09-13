import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
//import { format } from 'date-fns';


export default function UpdateEmployee() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setaddress] = useState("");
  const [telephone, settelephone] = useState("");
  const [email, setemail] = useState("");
  let { id } = useParams();

  const [errors, setErrors] = useState({});
  

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!firstName) {
      formIsValid = false;
      errors["firstName"] = "Please enter First Name";
    }

    if (!lastName) {
      formIsValid = false;
      errors["lastName"] = "Please enter Last Name";
    }

    
    if (!DOB) {
      formIsValid = false;
      errors["DOB"] = "Please enter Date of Birth";
    }

    if (!address) {
      formIsValid = false;
      errors["address"] = "Please enter Address";
    }

    if (!telephone) {
        formIsValid = false;
        errors["telephone"] = "Please enter Employee Telephone";
      }
  

    
    if (!email) {
      formIsValid = false;
      errors["NoDays"] = "Please enter Employee Email";
    }

    
    setErrors(errors);
    return formIsValid;
  }

  
  useEffect(() => {
    
    const getEmployee = async (id) => { 
     
      try {
        const response = await axios.get(`http://localhost:8000/api/Employee/get/${id}`)
        
        const Employee = response.data;
       // const formattedDate = format(new Date(reservation.date), 'MM/dd/yyyy'); // format date here
       // setdate(formattedDate);
        setfirstName(Employee.firstName);
        setlastName(Employee.lastName);
        setDOB(Employee.DOB);
        setaddress(Employee.address);
        settelephone(Employee.telephone);
        setemail(Employee.email);
       
      } catch (err) {
        console.log(err);
      }
    };
    getEmployee(id);

    console.log(id)
    
    
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    if (validateForm()) {

    const updatedEmployee = {
        firstName,
        lastName,
        DOB,
        address,
        telephone,
        email
    };
    axios
      .put(`http://localhost:8000/api/Employee/update/${id}`, updatedEmployee)

      //console.log(id)
      .then(() => {
        alert("Employee details updated");
        navigate("/Employee/");
      })
      .catch((err) => {
        console.log(err); 
      });
  }
}


console.log("firstName:", firstName);
console.log("lastName:", lastName);
console.log("DOB:", DOB);
console.log("address:", address);
console.log("telephone:", telephone);
console.log("email:", email);


  return (
    <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
    <div className="container m-5">

      <h1>Update Employee Details</h1>

      <form onSubmit={updateData}>

        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="string"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            placeholder="Enter first name"
            name="firstName"
            value={firstName}
            onChange={(e) => {
                setfirstName(e.target.value);
            }}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  placeholder='Enter Last Name'
                  name='lastName'
                  value={lastName}
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

            
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${errors.DOB ? 'is-invalid' : ''}`}
                  placeholder='Enter Date of Birth'
                  name='locationStorage'
                  value={DOB}
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                />
                {errors.DOB && <div className="invalid-feedback">{errors.DOB}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="string"
                  className={`form-control ${errors.address? 'is-invalid' : ''}`}
                  placeholder='Enter Address'
                  name='address'
                  value={address}
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Employee Telephone</label>
                <input
                  type="text"
                  className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                  placeholder='Enter Room Type'
                  name='telephone'
                  value={telephone}
                  onChange={(e) => {
                    settelephone(e.target.value);
                  }}
                />
                {errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Employee Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder='Enter employee email'
                  name='email'
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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