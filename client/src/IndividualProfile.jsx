


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MyProfile.css";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const IndividualProfile = () => {

//   const [data, setData] = useState(null);

//   // const [loading, setLoading] = useState(true);
//   const [review, setReview] = useState([])
//   const [rating, setRating] = useState("")


//   console.log(data)

//   const {id} = useParams()
//   const navigate = useNavigate();

//   // ✅ Single function for all API calls
//   const fetchData = async () => {
//     try {
//       const profile = await axios.get(
//         `http://localhost:5000/myprofile/${id}`,
//         {
//           headers: { "x-token": localStorage.getItem("token") }
//         }
//       );

//       const reviews = await axios.get(
//         `http://localhost:5000/myreview/${id}`,
//         {
//           headers: { "x-token": localStorage.getItem("token") }
//         }
//       );

//       setData(profile.data);
//       setReview(reviews.data);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//       return;
//     }

//     fetchData();
//   }, [id]);

//   // ✅ Add review (clean way)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:5000/addreview",
//         {
//           taskworker: id,
//           rating
//         },
//         {
//           headers: {
//             "x-token": localStorage.getItem("token")
//           }
//         }
//       );

//       setRating("");
//       fetchData(); // refresh UI

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };
//   return (
//     <div className="profile-container">

//       {/* Navbar */}
//       <nav className="navbar">
//         <h2 className="logo"> Developers Hub</h2>

//         <div className="nav-links">
//           <Link to="/myprofile">My Profile</Link>
//           <button onClick={handleLogout} className="logout-btn">Logout</button>
//         </div>
//       </nav>

//       {/* Loading */}
//       {!data ? (
//         <h2 className="loading">Loading...</h2>
//       ) : (
//         <section className="section-container">

//           <div className="profile-card">

//             {/* Image */}
//             <img
//               src={
//                 data.profilePic
//                   ? `http://localhost:5000/uploads/${data.profilePic}`
//                   : "https://i.pravatar.cc/150"
//               }
//               alt="profile"
//               className="profile-img"

//             />


//             {/* Info */}
//               <h2 className="profile-card-h2">{data.fullname}</h2>
//               <p className="profile-card-p"> {data.email}</p>
//               <p className="profile-card-p"> {data.mobile}</p>



//             {/* Skills */}
//             <div className="skills">
//               <h3>Skills</h3>
//               {data.skills &&
//                 data.skills.split(",").map((skill, i) => (
//                   <span key={i} className="skill-badge">
//                     {skill}
//                   </span>
//                 ))}
//             </div>

//           </div>

//         </section>
//       )}


//       <div className="review-section">
//         <h2 className="review-title"> Reviews and Ratings</h2>


//         <form onSubmit={handleSubmit} className="review-form" >


//           <input type="text"
//             placeholder="Enter Your Rating out of 5"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)} />

//           <button type="submit"> Add Rating</button>
//         </form>

//         <div>
//           {review.length === 0 ? (
//             <p> No Reviews Yet</p>
//           )
//             : (
//               review.map((review,i) => (
//                 <div key={i}>

//                   <h4> <Link to="/#">{review.taskprovider} </Link></h4>

//                   <p> {review.rating} </p>

//                 </div>
//               ))


//             )
//           }


//         </div>

//       </div>



//     </div>
//   );
// };

// export default IndividualProfile;




import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyProfile.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const IndividualProfile = () => {
  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 Fetch profile + reviews
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const profileRes = await axios.get(
        `http://localhost:5000/myprofile/${id}`,
        {
          headers: { "x-token": token }
        }
      );

      const reviewRes = await axios.get(
        `http://localhost:5000/myreview/${id}`,
        {
          headers: { "x-token": token }
        }
      );

      setData(profileRes.data);
      setReviews(reviewRes.data);

    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    fetchData();
  }, [id]);

  // 🔥 Add rating
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) return alert("Please enter rating");

    try {
      await axios.post(
        "http://localhost:5000/addreview",
        {
          taskworker: id,
          rating
        },
        {
          headers: {
            "x-token": localStorage.getItem("token")
          }
        }
      );

      setRating("");
      fetchData(); // refresh instantly

    } catch (err) {
      console.log("ADD REVIEW ERROR:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-container">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Developers Hub</h2>

        <div className="nav-links">
          <Link to="/myprofile">My Profile</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      {/* Profile Section */}
      {!data ? (
        <h2 className="loading">Loading...</h2>
      ) : (

         <section className="section-container">
        <div className="profile-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile"
            className="profile-img"
          />

          <h2 className="profile-card-h2">{data.fullname}</h2>
          <p className="profile-card-p">{data.email}</p>
          <p className="profile-card-p">{data.mobile}</p>

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

      {/* Reviews Section */}
      <div className="review-section">
        <h2 className="review-title">Reviews & Ratings</h2>

        <form onSubmit={handleSubmit} className="review-form" >
          <input
            type="number"
            placeholder="Enter rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button type="submit">Add Rating</button>
        </form>


       <div> {/* Reviews List */}
        {reviews.length === 0 ? (
          <p>No Reviews Yet</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="review-card">
              <h4>{r.taskprovider}</h4>
              <p>⭐ {r.rating} / 5</p>
            </div>
          ))
        )}
        </div>
      </div>

    </div>
  );
};

export default IndividualProfile;