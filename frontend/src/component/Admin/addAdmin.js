import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AdminRegistration() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  const [adminUserName, setAdminUserName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    const newAdmin = {
      adminName,
      adminUserName,
      adminEmail,
      adminPassword

    }

    axios
      .post("http://localhost:8000/api/admin/save", newAdmin)
      .then(() => {
        alert("added");
        navigate("/admin/");
      })
      .catch((err) => {
        alert("Fail Add")
      });

    // Reset the form fields
    setAdminName('');
    setAdminUserName('');
    setAdminEmail('');
    setAdminPassword('');
  };

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className="container mt-5">
            <h1>Admin Registration</h1>
            <form onSubmit={handleRegistration}>
              <div className="mb-3">
                <label htmlFor="adminName" className="form-label">
                  Admin Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="adminName"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="adminUserName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="adminUserName"
                  value={adminUserName}
                  onChange={(e) => setAdminUserName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="adminEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="adminEmail"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="adminPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
