import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { ForgotResetPasswordService } from '../../../services/forgot-reset-password-service'; // Adjust path as necessary

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);
  const navigate = useNavigate();
  
  // Create an instance of the service
  const forgotResetPasswordService = new ForgotResetPasswordService(/* pass http client here */);

  const navigateWithDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    navigate('/admin');
  };

  const onFinish = async (values) => {
    setBtnLoading(true);
    try {
      const res = await forgotResetPasswordService.requestResetPassword(values);

      if (res.done) {
        setActionMessage({
          type: 'success',
          message: 'Password reset link has been sent to your email address.',
        });
      } else {
        setActionMessage({
          type: 'error',
          message: res.message || 'Password reset failed. Please try again.',
        });
      }
    } catch (e) {
      setActionMessage({
        type: 'error',
        message: e.message || 'Password reset failed. Please try again.',
      });
    } finally {
      setBtnLoading(false);
      navigateWithDelay();
    }
  };

  return (
    <div className="bg-[#F9FBFF]">
      <div className="min-h-screen w-full flex flex-col justify-between">
        <div className="my-auto 2xl:mt-32 mb-0 h-[60px]">
          <img src="../../../../assets/img/logo.svg" className="w-full h-full object-contain" alt="Logo" />
        </div>
        <div className="w-[360px] mx-auto my-auto flex flex-col">
          <h1 className="text-[1.5rem] mx-6 md:mx-0">Forgot Password</h1>
          <p className="text-[0.875rem] text-[#64748B] mx-6 md:mx-0">Enter your email address to get the reset link</p>
          <Form
            form={form}
            layout="vertical"
            className="mt-6 mx-6 md:mx-0"
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email address!' }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email Address"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                loading={btnLoading}
                htmlType="submit"
                disabled={btnLoading}
              >
                <strong>Send Password Reset Link</strong>
              </Button>
            </Form.Item>
          </Form>
          {actionMessage && (
            <Alert
              className="mt-2 mx-6 md:mx-0"
              type={actionMessage.type}
              message={actionMessage.message}
              showIcon
            />
          )}
        </div>
        <div className="mb-8 mt-auto flex flex-col items-center justify-center">
          <div className="h-[30px]">
            <img src="../../../../assets/img/purple_logo.svg" className="w-full h-full object-contain" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
