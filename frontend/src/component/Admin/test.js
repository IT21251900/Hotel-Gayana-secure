import React, { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  console.log(username)
  console.log(password)
  console.log(isLoggedIn)
  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login logic here
    // You can send the login data to the server or handle it locally
    // For simplicity, let's assume the login is successful if the username and password are not empty
    if (username !== '' && password !== '') {
      setLoggedIn(true);
      console.log('Login successful');
    } else {
      console.log('Invalid username or password');
    }

    // Reset the form fields
    setUsername('');
    setPassword('');
  };

  if (isLoggedIn) {
    // If the user is already logged in, render a different component or redirect to another page
    return <div>You are already logged in.</div>;
  }

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
