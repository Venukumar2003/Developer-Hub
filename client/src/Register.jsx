import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
import "./Register.css";

const Register = () => {

  const [data, setData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    skills: "",
    password: "",
    confirmPassword: "",
  })

  const navigate = useNavigate();
  // const {email,password} = data

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)


     if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/register",
        data
      );

      alert(res.data.message || "Registered Successfully");

    

      // clear form
      setData({
        fullname: "",
        email: "",
        mobile: "",
        skills: "",
        password: "",
        confirmPassword: "",
      });

      // redirect to login
      navigate("/login");

    } catch (error) {
      console.log("REGISTER ERROR:", error);

      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }

  }
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"> Developers Hub</div>

        <div className="nav-links">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      {/* Register Section */}
      <div className="register-container">

        <h1 className="title-signUp">Sign Up</h1>

        <p className="subtitle-signUp">Create Your Account</p>

        <form className="register-form" onSubmit={handleSubmit}>

          <input type="text" placeholder="Name" name="fullname"value={data.fullname} onChange={handleChange} />
          <input type="email" placeholder="Email Address" name="email" value={data.email} onChange={handleChange} />
          <input type="text" placeholder="Mobile" name="mobile" value={data.mobile} onChange={handleChange} />
          <input type="text" placeholder="Skills" name="skills" value={data.skills} onChange={handleChange} />

          <small className="skill-note">
            Please provide skills by separation of comma ( , )
          </small>

          <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} />
          <input type="password" placeholder="Confirm Password" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} />

          <button type="submit">Register</button>

        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </>
  );
};

export default Register;