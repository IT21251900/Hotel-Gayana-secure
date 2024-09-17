import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getAdmins = () => {
      axios
        .get('http://localhost:8000/api/admin/get')
        .then((res) => {
          setAdmins(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getAdmins();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = admins.find(
      (admin) => admin.adminUserName === username || admin.adminEmail === username
    );

    if (admin && admin.adminPassword === password) {
      navigate('/Reservation/');
    } else {
      setMessage('Invalid username or password');

      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }

    setUsername('');
    setPassword('');
  };

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are The Gayana Hotel Team</h4>
                    </div>
                    <form onSubmit={handleLogin}>
                      <p>Please login to Admin account</p>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">
                          Username
                        </label>
                        <input
                          type="text"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Username or email address"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {message && (
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      )}
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block gradient-custom-2"
                          type="submit"
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Welcome to Gayana Guest House & Restaurant, your Tangalle "home away from home."
                      Gayana Guest House & Restaurant aims to make your visit as relaxing and enjoyable as possible,
                      which is why so many guests continue to come back year after year.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
