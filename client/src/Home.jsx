
import React from "react"
import { Link } from "react-router-dom"
import "./Home.css"
const Home = () => {
    return (
        <>

            <div className="container">

                {/*  Navbar */}
                <nav className="navbar">
                    <div className="logo"> Developers Hub</div>
                    <div className="nav-links">
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="hero">
                    <h1>Developers Hub</h1>
                    <p>Create a developer profile/portfolio, share posts and get help from other developers</p>

                    <div className="buttons">
                       <Link to="/register"> <button className="signup">Sign Up</button></Link>
                        <Link to="/login"><button className="login">Login</button></Link>
                    </div>
                </section>

            </div>

        </>
    )
}


export default Home;