import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';   


const FacebookLoginButton = () => {
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const responseFacebook = (response) => {
    if (response.status !== 'unknown') {
      setIsLoading(true);
      fetch('/auth/facebook/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: response.accessToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data",data)
          setIsLoading(false);
          if (data.success) {
            history.push('/auth/facebook/success');
          } else {
            history.push('/auth/facebook/error');
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error logging in with Facebook:', error);
          // Handle the error here, e.g., show an error message to the user
        });
    } else {
      history.push('/auth/facebook/error');
    }
  };

  return (
    <FacebookLogin
      appId= "3797704980470064"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}   

      icon="fa-facebook"
      buttonText={isLoading ? 'Logging in...' : 'Login with Facebook'}
    />
  );
};

export default FacebookLoginButton;