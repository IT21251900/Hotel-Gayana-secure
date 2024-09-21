import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { ForgotResetPasswordService } from "../../../services/forgot-reset-password-service"; // Adjust path as necessary

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);
  const navigate = useNavigate();

  // Create an instance of the service
  const forgotResetPasswordService =
    new ForgotResetPasswordService(/* pass http client here */);

  const navigateWithDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    navigate("/admin");
  };

  const onFinish = async (values) => {
    setBtnLoading(true);
    try {
      const res = await forgotResetPasswordService.requestResetPassword(values);

      if (res.done) {
        setActionMessage({
          type: "success",
          message: "Password reset link has been sent to your email address.",
        });
      } else {
        setActionMessage({
          type: "error",
          message: res.message || "Password reset failed. Please try again.",
        });
      }
    } catch (e) {
      setActionMessage({
        type: "error",
        message: e.message || "Password reset failed. Please try again.",
      });
    } finally {
      setBtnLoading(false);
      navigateWithDelay();
    }
  };

  return (
    <div
      className="bg-light"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#0d6efd"
      }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: "360px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          className="text-center"
          style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
        >
          Forgot Password
        </h1>
        <p className="text-muted text-center" style={{ fontSize: "0.875rem" }}>
          Enter your email address to get the reset link
        </p>
        <Form
          form={form}
          layout="vertical"
          className="mx-auto"
          style={{ width: "100%", marginTop: "1.5rem" }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email address!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email Address"
              style={{
                padding: "0.75rem",
                borderRadius: "0.25rem",
                border: "1px solid #ced4da",
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              block
              loading={btnLoading}
              htmlType="submit"
              disabled={btnLoading}
              style={{ padding: "0.75rem" }}
            >
              <strong>Send Password Reset Link</strong>
            </Button>
          </Form.Item>
        </Form>
        {actionMessage && (
          <Alert
            className="mt-2"
            type={actionMessage.type}
            message={actionMessage.message}
            showIcon
            style={{ margin: "0 auto", maxWidth: "360px" }}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
