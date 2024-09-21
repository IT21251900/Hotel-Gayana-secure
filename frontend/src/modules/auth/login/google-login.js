import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "911259510627-hpck0jrs9j8qv2ip416duu8n93sqk7em.apps.googleusercontent.com",
        scope: 'email',
      });
    }
  
    gapi.load('client:auth2', start);
  }, []);

  const responseGoogle = (response) => {
    console.log('Google response:', response);

    if (response.profileObj) {
      console.log('Login successful:', response);
      navigate('/adminHome', { replace: true });
    } else {
      console.log('Login failed:', response);
    }
  };

  const onError = (error) => {
    console.error('Login error:', error);
  };

  return (
    <div>
      <GoogleLogin
        clientId="911259510627-hpck0jrs9j8qv2ip416duu8n93sqk7em.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={onError}
        cookiePolicy={'single_host_origin'}
        accessType={'offline'}
        prompt={'consent'}
        uxMode="redirect"
      />
    </div>
  );
};

export default GoogleLoginButton;
