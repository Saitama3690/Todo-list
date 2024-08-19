import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({Name: "", email: "", password: "", cpassword:"" });

  let navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {Name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", { 
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success){
      //redirect
      localStorage.setItem('token', json.authtoken);
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
    <div className="container containerss shadow-lg p-4 rounded">
      <h1 text-center mb-4>Sign Up</h1>
      <form onSubmit = {handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            name="Name"
            onChange = {onChange}
            aria-describedby="emailHelp"
          />

          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange = {onChange}
            aria-describedby="emailHelp"
          />

          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange = {onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange = {onChange}
            minLength={5}
            required
          />
        </div>
       
          
        
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
        <h6 className='text-center my-3'><br/>----Already Logged in?----</h6>

        <p className='text-center mt-4 mb-0'><Link to='/login' ><button className="btn btn-glow">Login Now</button></Link></p>
      </form>
      </div>
    </div>
  );
};

export default Signup;
