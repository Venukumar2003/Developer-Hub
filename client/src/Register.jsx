import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {

     const[data,setData] = useState({
        fullname : "",
        email : "",
        mobile: "",
        skills : "",
        password : "",
        confirmPassword : "",
      })
    
      // const {email,password} = data
    
      const handleChange = (e)=>{
        setData({
          ...data,
          [e.target.name] : e.target.value
        })
      }
    
      const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(data)
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

          <input type="text" placeholder="Name"  name="fullname" onChange={handleChange}/>
          <input type="email" placeholder="Email Address" name="email" onChange={handleChange} />
          <input type="text" placeholder="Mobile" name="mobile" onChange={handleChange} />
          <input type="text" placeholder="Skills" name="skills" onChange={handleChange}/>

          <small className="skill-note">
            Please provide skills by separation of comma ( , )
          </small>

          <input type="password" placeholder="Password" name="password" onChange={handleChange} />
          <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} />

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