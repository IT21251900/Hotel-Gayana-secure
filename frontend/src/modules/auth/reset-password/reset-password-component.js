// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Form, Input, Button, Alert } from "antd";
// import "antd/dist/reset.css"; // For Ant Design v5
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
// import { ForgotResetPasswordService } from "../../../services/forgot-reset-password-service";

// const ResetPassword = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [newPasswordVisible, setNewPasswordVisible] = useState(false);
//   const   
//  [btnLoading, setBtnLoading] = useState(false);
//   const [actionMessage, setActionMessage] = useState(null);
//   const { id: token } = useParams();
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const forgotResetPasswordService = new ForgotResetPasswordService();

//   useEffect(() => {
//     if (token) {
//       validateToken();
//     }
//   }, [token]);

//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
//   const toggleNewPasswordVisibility = () => setNewPasswordVisible(!newPasswordVisible);   


//   const validateToken = async () => {
//     try {
//       const result = await forgotResetPasswordService.validatePWResetToken(token);
//       if (!result.valid) {
//         setActionMessage({ type: "error", message: "Token is invalid or expired." });
//       }
//     } catch (error) {
//       setActionMessage({ type: "error", message: "Token validation failed." });
//     }
//   };

//   const onFinish = async () => {
//     const values = form.getFieldValue(); // Get form values using form.getFieldValue()

//     if (values.newPassword !== values.confirmPassword) {
//       setActionMessage({ type: "error", message: "Passwords do not match!" });
//       return;
//     }

//     setBtnLoading(true);
//     try {
//       const payload = { token, password: values.newPassword };
//       console.log(payload);
//       const response = await forgotResetPasswordService.resetPassword(payload);
//       if (response) {
//         setActionMessage({ type: "success", message: "Password has been reset successfully." });
//         setTimeout(() => navigate("/admin"), 4000);
//       } else {
//         setActionMessage({ type: "error", message: "Password reset failed. Please try again." });
//       }
//     } catch (error) {
//       setActionMessage({ type: "error", message: "Password reset failed. Please try again." });
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#F9FBFF]">
//       <div className="min-h-screen w-full flex flex-col justify-between">
//         <div className="my-auto 2xl:mt-32 mb-0 h-[60px]">
//           <img src="../../../../assets/img/logo.svg" className="w-full h-full object-contain" alt="Logo" />
//         </div>
//         <div className="w-[360px] mx-auto my-auto flex flex-col">
//           <h1 className="text-[1.5rem] mx-6 md:mx-0">Reset Password</h1>
//           <p className="text-[0.875rem] text-[#64748B] mx-6 md:mx-0">Enter your new password here</p>
//           <Form form={form} layout="vertical" className="mt-6 mx-6 md:mx-0" onSubmitCapture={onFinish}>
//             <Form.Item
//               name="newPassword"
//               rules={[
//                 { required: true, message: "Please input your new password!" },
//                 { min: 8, message: "Password must be at least   8 characters long!" },
//                 {
//                   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                   message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",   

//                 },
//               ]}
//             >
//               <Input.Password
//                 placeholder="New Password"
//                 iconRender={(visible) =>
//                   visible ? <EyeOutlined onClick={togglePasswordVisibility} /> : <EyeInvisibleOutlined onClick={togglePasswordVisibility}   
//  />
//                 }
//                 visibilityToggle={passwordVisible}
//               />
//             </Form.Item>

//             <Form.Item
//               name="confirmPassword"
//               rules={[
//                 { required: true, message: "Please confirm your new password!" },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if   
//  (!value || getFieldValue("newPassword") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new   
//  Error("Passwords do not match!"));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 placeholder="Confirm   
//  New Password"
//                 iconRender={(visible) =>
//                   visible ? <EyeOutlined onClick={toggleNewPasswordVisibility} /> : <EyeInvisibleOutlined onClick={toggleNewPasswordVisibility} />
//                 }
//                 visibilityToggle={newPasswordVisible}
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit" loading={btnLoading} block>
//                 <strong>Submit</strong>
//               </Button>
//             </Form.Item>
//           </Form>
//           {actionMessage && (
//             <Alert className="mt-2 mx-6 md:mx-0" type={actionMessage.type} message={actionMessage.message} showIcon />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ForgotResetPasswordService } from "../../../services/forgot-reset-password-service";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [actionMessage, setActionMessage] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const { id: token } = useParams();
  const navigate = useNavigate();
  const forgotResetPasswordService = new ForgotResetPasswordService();

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  const validateToken = async () => {
    try {
      const result = await forgotResetPasswordService.validatePWResetToken(token);
      if (!result.validateToken) {
        setActionMessage({ type: "error", message: "Token is invalid or expired." });
      }
    } catch (error) {
      setActionMessage({ type: "error", message: "Token validation failed." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setActionMessage({ type: "error", message: "Passwords do not match!" });
      return;
    }

    setBtnLoading(true);
    try {
      const payload = { token, password: newPassword };
      console.log(payload);
      const response = await forgotResetPasswordService.resetPassword(payload);
      if (response) {
        setActionMessage({ type: "success", message: "Password has been reset successfully." });
        setTimeout(() => navigate("/admin"), 4000);
      } else {
        setActionMessage({ type: "error", message: "Password reset failed. Please try again." });
      }
    } catch (error) {
      setActionMessage({ type: "error", message: "Password reset failed. Please try again." });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="logo-container">
        <img src="../../../../assets/img/logo.svg" alt="Logo" />
      </div>
      <div className="form-container">
        <h1>Reset Password</h1>
        <p>Enter your new password here</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength="8"
              placeholder="Enter your new password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your new password"
            />
          </div>
          <button type="submit" disabled={btnLoading}>
            {btnLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {actionMessage && (
          <div className={`message ${actionMessage.type}`}>
            {actionMessage.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

