import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import "./Login.css";

const Login = () => {


  const navigate = useNavigate()




  const [auth, setAuth] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  // const {email,password} = data

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/login", data).then((res) => {
      localStorage.setItem("token", res.data.token); /*setAuth(true)*/
      navigate("/dashboard")
    })
  }

  // if (auth) {                      /* localStorage.getItem("token")  */
  //   return navigate("/dashboard")
  // }
  // if (localStorage.getItem("token")) {
  //   return navigate("/dashboard");
  // }

   useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      {/* Navbar */}
      <div className="login--container">

        <nav className="navbar">
          <div className="logo"> Developers Hub</div>

          <div className="nav-links">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>

        {/* Login Section */}

        <div className="login-container">

          <h1 className="title-signIn">Sign In</h1>

          <p className="subtitle-signIn"> SignIn into Your Account</p>

          <form className="login-form" onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email Address"
              value={data.email}
              name="email"
              onChange={handleChange}
            />

            <input
              type="password"
              value={data.password}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <button type="submit" onClick={() => setData(data)}>
              Login
            </button>

          </form>

          <p className="signup-text">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default Login;