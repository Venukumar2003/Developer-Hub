

// import React from "react";

// const MyProfile =()=>{
//     return(
//         <>

//         <nav className="navbar">
//           <div className="logo"> Developers Hub</div>

//           <div className="nav-links">
//             <Link to="/myprofile">My Profile</Link>
//             <Link to="/login">Login</Link>
//           </div>
//         </nav>




// <div>
//     <div>
//         <h4><Link  to="#">Jagan</Link> </h4>
//         <p> 4/5</p>
//     </div>
// </div>



// <div>


//     <div>
//         <h2> Enter Your Reviews</h2>
//         <form autoComplete="off">
//             <div>

//                 <input type="text"
//                     placeholder="Enter your rating out of 5"
//                     name="rating"
//                     required />
//             </div>
//         </form>

//     </div>
// </div>








//         </>

//     )
// }

// export default MyProfile;
















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MyProfile.css";
// import { Link, useNavigate } from "react-router-dom";

// const MyProfile = () => {
//     const [data, setData] = useState([]);

//     const navigate = useNavigate()

//     // Fetch data from backend
//     useEffect(() => {
//         axios.get("http://localhost:5000/myprofile", {
//             headers: {
//                 "x-token": localStorage.getItem("token")
//             }
//         }) // your backend API
//             .then(res => setData(res.data))
//             .catch(err => console.log(err));
//     }, []);

//     if (!localStorage.getItem("token")) {
//         return navigate("/login")
//     }


//     return (
//         <div className="profile-container">
//             {/* Navbar */}
//             <nav className="navbar">
//                 <h2 className="logo"> Developers Hub</h2>

//                 <ul className="nav-links">
//                     <li><Link to="/myprofile">My Profile</Link></li>
//                     <li><Link to="/login" >Logout</Link></li>
//                 </ul>
//             </nav>

//             {data && 
//              <section className="section-container">
//                 <Link to="/myprofile" className="btn btn-light">Back to Profiles</Link>

//                 <div className="profile-card">

//                     {/* Profile Image */}
//                     <img
//                         src={
//                             data.profilePic
//                                 ? `http://localhost:5000/uploads/${data.profilePic}`
//                                 : "https://via.placeholder.com/150"
//                         }
//                         alt="profile"
//                         className="profile-img"
//                     />

//                     {/* User Info */}
//                     <h2>{data.name}</h2>
//                     <p><strong>Email:</strong> {data.email}</p>
//                     <p><strong>Phone:</strong> {data.phone}</p>
//                     <p><strong>Role:</strong> {data.role}</p>

//                     {/* Bio */}
//                     <div className="bio">
//                         <h3>About</h3>
//                         <p>{data.bio || "No bio available"}</p>
//                     </div>

//                 </div>
//             </section>

//             }
//         </div>
//     );
// };

// export default MyProfile;




import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyProfile.css";
import { Link, useNavigate, Navigate } from "react-router-dom";

const MyProfile = () => {

  const [data, setData] = useState(null);

  // const [loading, setLoading] = useState(true);
  const [review, setReview] = useState([])
  const [rating, setRating] = useState("")


  console.log(data)

  const navigate = useNavigate();

  // 🔥 Get logged-in user ID from token (simple way)
  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user.id;
  };

  const userId = getUserId();

  // 🔥 Fetch Data
  const fetchData = async () => {
    try {
      const profile = await axios.get(
        `http://localhost:5000/myprofile/${userId}`,
        {
          headers: {
            "x-token": localStorage.getItem("token")
          }
        }
      );

      const reviews = await axios.get(
        `http://localhost:5000/myreview/${userId}`,
        {
          headers: {
            "x-token": localStorage.getItem("token")
          }
        }
      );

      setData(profile.data);
      setReview(reviews.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    fetchData();
  }, []);

  // 🔥 Add Review
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/addreview",
        {
          taskworker: userId, // ✅ important
          rating
        },
        {
          headers: {
            "x-token": localStorage.getItem("token")
          }
        }
      );

      setRating("");
      fetchData(); // refresh

    } catch (err) {
      console.log(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-container">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo"> Developers Hub</h2>

        <div className="nav-links">
          <Link to="/myprofile">My Profile</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      {/* Loading */}
      {!data ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <section className="section-container">

          <div className="profile-card">

            {/* Image */}
            <img
              src={
                data.profilePic
                  ? `http://localhost:5000/uploads/${data.profilePic}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="profile-img"

            />


            {/* Info */}
            <h2 className="profile-card-h2">{data.fullname}</h2>
            <p className="profile-card-p"> {data.email}</p>
            <p className="profile-card-p"> {data.mobile}</p>



            {/* Skills */}
            <div className="skills">
              <h3>Skills</h3>
              {data.skills &&
                data.skills.split(",").map((skill, i) => (
                  <span key={i} className="skill-badge">
                    {skill}
                  </span>
                ))}
            </div>

          </div>

        </section>
      )}


      {/* <div className="review-section">
        <h2 className="review-title"> Reviews and Ratings</h2>


        <form onSubmit={handleSubmit} className="review-form" >
          <input type="text"
          onChange={(e)=>setRating(e.target.value)} />

          <h4> Enter Your Reviews</h4>
          <br/>

          <input type="text"
            placeholder="Enter Your Rating out of 5"
            value={rating}
            onChange={(e) => setRating(e.target.value)} />

          <button type="submit"> Add Rating</button>
        </form>

        <div>
          {review.length === 0 ? (
            <p> No Reviews Yet</p>
          )
            : (
              review.map((review,i) => (
                <div key={i}>

                  <h4> <Link to="/#">{review.taskprovider} </Link></h4>

                  <p> {review.rating} </p>

                </div>
              ))


            )
          }


        </div> */}




      <div className="review-section">
        <h2 className="review-title">Reviews and Ratings</h2>

        {/* 🔥 SHOW REVIEWS FIRST */}
        <div className="review-list">
          {review.length === 0 ? (
            <p className="review-list-reviews">No Reviews Yet</p>
          ) : (
            review.map((r, i) => (
              <div key={i} className="review-card">
                <h4>{r.taskprovider}</h4>
                <p>⭐ {r.rating} / 5</p>
              </div>
            ))
          )}
        </div>

        {/* 🔥 ADD REVIEW BELOW */}
        <h3 className="add-review-title">Enter Your Reviews</h3>

        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="number"
            placeholder="Enter Your Rating out of 5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button type="submit">Add Rating</button>
        </form>
      </div>

    </div>


  );
};

export default MyProfile;