// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../services/auth.service'; // Import the hook

// const LoginComponent = () => {
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [actionMessage, setActionMessage] = useState({
//     display: false,
//     type: '',
//     message: '',
//   });

//   const navigate = useNavigate();
//   const { login } = useAuth(); // Use the hook to get the login function

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLoginForm({
//       ...loginForm,
//       [name]: value,
//     });
//   };

//   const onLogin = async (e) => {
//     e.preventDefault();
//     if (!loginForm.email || !loginForm.password) {
//       setActionMessage({
//         display: true,
//         type: 'error',
//         message: 'Please fill in all fields.',
//       });
//       return;
//     }

//     setBtnLoading(true);
//     try {
//       await login(loginForm); // Call the login function from the hook
//       navigate('/adminHome/');
//     } catch (e) {
//       setActionMessage({
//         display: true,
//         type: 'error',
//         message: e.message || 'Login failed. Please try again.',
//       });
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>LOG IN</h1>
//       <form onSubmit={onLogin}>
//         <div>
//           <label>Email Address</label>
//           <input
//             type="email"
//             name="email"
//             value={loginForm.email}
//             onChange={handleInputChange}
//             placeholder="Email Address"
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type={passwordVisible ? 'text' : 'password'}
//             name="password"
//             value={loginForm.password}
//             onChange={handleInputChange}
//             placeholder="Password"
//             required
//           />
//           <button type="button" onClick={togglePasswordVisibility}>
//             {passwordVisible ? 'Hide' : 'Show'} Password
//           </button>
//         </div>
//         <button type="submit" disabled={btnLoading}>
//           {btnLoading ? 'Logging in...' : 'Sign In'}
//         </button>
//         {actionMessage.display && (
//           <div className={`alert ${actionMessage.type}`}>
//             {actionMessage.message}
//           </div>
//         )}
//       </form>
//       <button onClick={() => navigate('/forgot-password')}>
//         Forgot Your Password?
//       </button>
//     </div>
//   );
// };

// export default LoginComponent;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.service"; // Import the hook
import FacebookLoginButton from "./facebook-login"; // Import the Facebook login button component

const LoginComponent = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({
    display: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Use the hook to get the login function

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setActionMessage({
        display: true,
        type: "error",
        message: "Please fill in all fields.",
      });
      return;
    }

    setBtnLoading(true);
    try {
      await login(loginForm); // Call the login function from the hook
      navigate("/adminHome/");
    } catch (e) {
      setActionMessage({
        display: true,
        type: "error",
        message: e.message || "Login failed. Please try again.",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  // return (
  //   <section
  //     className="h-100 gradient-form"
  //     style={{ backgroundColor: "#eee" }}
  //   >
  //     <div className="container py-5 h-100">
  //       <div className="row d-flex justify-content-center align-items-center h-100">
  //         <div className="col-xl-10">
  //           <div className="card rounded-3 text-black">
  //             <div className="row g-0">
  //               <div className="col-lg-6">
  //                 <div className="card-body p-md-5 mx-md-4">
  //                   <div className="text-center">
  //                     <img
  //                       src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
  //                       style={{ width: "185px" }}
  //                       alt="logo"
  //                     />
  //                     <h4 className="mt-1 mb-5 pb-1">
  //                       We are The Gayana Hotel Team
  //                     </h4>
  //                     <div className="login-container">
  //                       <h1>LOG IN</h1>
  //                       <form onSubmit={onLogin}>
  //                       <div className="form-outline mb-4">
  //                       <label className="form-label" htmlFor="form2Example11">
  //                         Email Address
  //                       </label>
  //                           <input
  //                             type="email"
  //                             name="email"
  //                             value={loginForm.email}
  //                             onChange={handleInputChange}
  //                             placeholder="Email Address"
  //                             required
  //                           />
  //                         </div>
  //                         <div className="form-outline mb-4">
  //                       <label className="form-label" htmlFor="form2Example22">
  //                         Password
  //                       </label>
  //                           <input
  //                             type={passwordVisible ? "text" : "password"}
  //                             name="password"
  //                             value={loginForm.password}
  //                             onChange={handleInputChange}
  //                             placeholder="Password"
  //                             required
  //                           />
  //                           <button
  //                             type="button"
  //                             onClick={togglePasswordVisibility}
  //                           >
  //                             {passwordVisible ? "Hide" : "Show"} Password
  //                           </button>
  //                         </div>
  //                         <div className="text-center pt-1 mb-5 pb-1">
  //                         <button className="btn btn-primary btn-block gradient-custom-2" type="submit" disabled={btnLoading}>
  //                           {btnLoading ? "Logging in..." : "Sign In"}
  //                         </button>
  //                         </div>
  //                         {actionMessage.display && (
  //                           <div className={`alert ${actionMessage.type}`}>
  //                             {actionMessage.message}
  //                           </div>
  //                         )}
  //                       </form>
  //                       <button onClick={() => navigate("/forgot-password")}>
  //                         Forgot Your Password?
  //                       </button>
  //                       <div>
  //                         <FacebookLoginButton />
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                {/* Left side with image */}
                <div className="col-lg-6 d-none d-lg-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    alt="logo"
                  />
                </div>
                {/* Right side with login form */}
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">
                        We are The Gayana Hotel Team
                      </h4>
                      <div className="login-container">
                        <h1>LOG IN</h1>
                        <form onSubmit={onLogin}>
                          <div className="mb-4" style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                              type="email"
                              name="email"
                              value={loginForm.email}
                              onChange={handleInputChange}
                              placeholder="Email Address"
                              required
                              style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem' }}
                            />
                          </div>
                          <div className="mb-4" style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                              type={passwordVisible ? "text" : "password"}
                              name="password"
                              value={loginForm.password}
                              onChange={handleInputChange}
                              placeholder="Password"
                              required
                              style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem' }}
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
                            >
                              {passwordVisible ? "Hide" : "Show"} Password
                            </button>
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              disabled={btnLoading}
                              style={{ width: '100%', padding: '0.75rem' }}
                            >
                              {btnLoading ? "Logging in..." : "Sign In"}
                            </button>
                          </div>
                          {actionMessage.display && (
                            <div className={`alert ${actionMessage.type}`} style={{ marginBottom: '1rem' }}>
                              {actionMessage.message}
                            </div>
                          )}
                        </form>
                        <div className="mt-4 text-center">
                          <button
                            onClick={() => navigate("/forgot-password")}
                            style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
                          >
                            Forgot Your Password?
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <FacebookLoginButton />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  
  
};

export default LoginComponent;
