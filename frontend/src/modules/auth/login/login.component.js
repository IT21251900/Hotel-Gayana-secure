import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.service"; // Import the hook
import FacebookLoginButton from "./facebook-login";
import GoogleLoginButton from "./google-auth";
import ReCAPTCHA from "react-google-recaptcha";

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
      const result = await login(loginForm);
      console.log(result); // Call the login function from the hook
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

  const [capVal, setCapVal] = useState();

  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div class="container min-vh-100 d-flex justify-content-center align-items-center">
        <div class="row w-100">
          <div class="col-xl-10 mx-auto">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                {/* Left side with image */}
                <div className="col-lg-6 d-none d-lg-block">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      alt="logo"
                    />
                  </div>
                </div>

                {/* Right side with login form */}
                <div className="col-lg-6 login-card">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="">
                      <div className="login-container">
                        <h1 className="mb-4 " style={{ color: "#0d6efd" }}>
                          Sign in
                        </h1>
                        <FacebookLoginButton></FacebookLoginButton>
                        <GoogleLoginButton></GoogleLoginButton>
                        <hr className="mt-2"></hr>
                        <form onSubmit={onLogin}>
                          <div
                            className="mb-3"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="email"
                              name="email"
                              value={loginForm.email}
                              onChange={handleInputChange}
                              placeholder="Email Address"
                              required
                              style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "0.75rem",
                                borderRadius: "0.25rem",
                                border: "1px solid #ced4da",
                                fontSize: "1rem",
                                backgroundColor: "#f9f9f9",
                              }}
                            />
                          </div>
                          <div
                            className="mb-4"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              width: "100%",
                            }}
                          >
                            <input
                              type={passwordVisible ? "text" : "password"}
                              name="password"
                              value={loginForm.password}
                              onChange={handleInputChange}
                              placeholder="Password"
                              required
                              className="form-control"
                              style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "0.75rem",
                                borderRadius: "0.25rem",
                                border: "1px solid #ced4da",
                                fontSize: "1rem",
                                backgroundColor: "#f9f9f9",
                              }}
                            />           
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="btn"
                              style={{
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                                padding: "0.25rem 0.5rem",
                                background: "none",
                                border: "none",
                                color: "#007bff",
                                fontWeight: "bold",
                                cursor: "pointer",
                                alignSelf: "flex-end",
                                fontSize: "0.9rem",
                              }}
                            >
                              {passwordVisible ? "Hide" : "Show"} Password
                            </button>

                            <ReCAPTCHA
                              sitekey="6Lf9oUwqAAAAAF-5AL37SSx0UXcUF84dfe44a1Ej"
                              onChange={(val) => setCapVal(val)}
                            />                                                     

                          </div>                    

                          <div className="text-center pt-1 mb-3 pb-1">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              disabled={btnLoading || !capVal}
                              style={{ width: "100%", padding: "0.75rem" }}
                            >
                              {btnLoading ? "Logging in..." : "Sign In"}
                            </button>
                          </div>
                          {actionMessage.display && (
                            <div
                              className={`alert ${actionMessage.type}`}
                              style={{ marginBottom: "1rem" }}
                            >
                              {actionMessage.message}
                            </div>
                          )}
                        </form>
                        <div className="">
                          <button
                            onClick={() => navigate("/forgot-password")}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#007bff",
                              cursor: "pointer",
                            }}
                          >
                            Forgot Your Password?
                          </button>
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
