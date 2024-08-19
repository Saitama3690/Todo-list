import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", { 
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success){
      //redirect
      localStorage.setItem('token', json.authtoken);
      localStorage.setItem('userName', response.Name);

      navigate("/")
    }
    else{
      alert("Invalid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="gradient-bg min-vh-100 d-flex justify-content-center align-items-center">
    <div className="containerss container shadow-lg p-4 rounded">
      <h1 className="text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={credentials.email} 
            onChange={onChange} 
            aria-describedby="emailHelp" 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={credentials.password} 
            onChange={onChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>

        <h6 className='text-center my-3'><br/>----Don't have an Account----</h6>

        <p className='text-center mt-4 mb-0'><Link to='/signup' ><button className="btn btn-glow">create new Account</button></Link></p>

      </form>
    </div>
  </div>
  );
}

export default Login;
