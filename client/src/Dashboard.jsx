import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate()

  // Fetch data from backend
  useEffect(() => {
    axios.get("http://localhost:5000/allprofiles",{
        headers : {
            "x-token" : localStorage.getItem("token")
        }
    }) // your backend API
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(()=>{

    if(!localStorage.getItem("token")){
    navigate("/login")
  }
  },[])
  

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo"> Developers Hub</h2>

        <div className="nav-links">
          <Link to="/myprofile">My Profile</Link>
          <Link to="/login" onClick={()=> localStorage.removeItem("token")}>Logout</Link>
        </div>
      </nav>

      {/* Dashboard */}
      <div className="dashboard-container">

        <h1 className="large text-primary">Developers</h1>
        <p className="lead">Browse and connect with developers</p>

        {/* Loop all users */}
        {data.map((dev, index) => (
          <div className="profile bg-light" key={index}>

            <img
              className="round-img"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt=""
            />

            <div >
              <h2 className="fullname">{dev.fullname}</h2>
              <p>{dev.email}</p>
              <p>{dev.location || "India"}</p>
              {/* <p>{dev.mobile}</p> */}



              <Link to= {`/indprofile/${dev._id}`} /*{`/profile/${dev._id}`} */  className="btn btn-primary">
                View Profile
              </Link>
            </div>

            {/*  Dynamic Skills */}
            <ul>
              {dev.skills && dev.skills.split(",").map((skill, i) => (
                <li key={i} className="text-primary">
                  ✔ {skill}
                </li>
              ))}
            </ul>

          </div>
        ))}

      </div>
    </>
  );
};

export default Dashboard;