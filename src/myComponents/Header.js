import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = (prop) => {

  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token') 
          }
        });
        const data = await response.json();
        setUserName(data.Name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUserName();
    }
  }, []);

  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname)
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <header>
      <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className={`navbar-brand ${location.pathname === "/" ? "active" : ""}`} to="/">{prop.title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} aria-current="page" to="/About">About</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/">Action</Link></li>
                  <li><Link className="dropdown-item" to="/">Another action</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                </ul>
              </li>
            </ul>
            {localStorage.getItem('token')? (
              <>
              {userName && <span className="navbar-text mx-3 text-light"> Welcome <a href=""> {userName}</a> </span> } <i class="fa-regular me-3 fa-circle-user" style={{color: '#c5c43d', fontSize:'30px'}}></i>
              </>
            )
            :<h1></h1> }
            
            {!localStorage.getItem('token') ?
              <form className="d-flex" role="search">
                <Link type="button" to="/login" className="btn btn-success mx-1">Login</Link>
                <Link type="button" to="/signup" className="btn btn-outline-danger mx-1">Sign up</Link>
              </form> :
              <button className="btn btn-primary" onClick={handleLogout}>Sign out</button>}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
