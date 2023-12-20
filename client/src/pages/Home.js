import React, { useEffect } from "react";
import "./styles/Home.css";

const Home = () => {
  useEffect(()=> {
    // Add class to the body element
    document.body.classList.add('home-body');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('home-body');
    }
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <li>Navbar (Hello Name)</li>
        <li>X items Expiring Soon!</li> 
        <li>Logout</li>
      </nav>
      <main className="main-body">Main Body</main>
      <aside className="details">Specific details</aside>
      <div className="logo-container">Logo</div>
    </div>
  )
}

export default Home