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
        <ul>
          <li><h1>Hello Reef!</h1></li>
          <li>
            X items Expiring Soon!
            <ol className="click-me"> Click to view expiring soon.</ol>
          </li>
          <li>
            Running Low on X Items!
            <ol className="click-me">Click to view items that are running low.</ol>
          </li> 
          <li className="settings">
            <button>Settings</button>
          </li>
          <li className="logout">
            <button>Logout</button>
          </li>
        </ul>
      </nav>
      <main className="main-body">
        <div className="item-container">
          <h2>Peanut Butter</h2>
          <p>Expires 10/25</p>
          <p>Section: Pantry</p>
          <p>Amount: 1 jar</p>
        </div>

        <div className="item-container">
          <h2>Peanut Butter</h2>
          <p>Expires 10/25</p>
          <p>Section: Pantry</p>
          <p>Amount: 1 jar</p>
        </div>

        <div className="item-container">
          <h2>Peanut Butter</h2>
          <p>Expires 10/25</p>
          <p>Section: Pantry</p>
          <p>Amount: 1 jar</p>
        </div>

        <div className="item-container">
          <h2>Peanut Butter</h2>
          <p>Expires 10/25</p>
          <p>Section: Pantry</p>
          <p>Amount: 1 jar</p>
        </div>

      </main>
      <div className="storage-container">
        <aside className="storage">
          <h2>Categories</h2>
        </aside>
        <aside className="storage inactive">
          <h2>Fridge</h2>
        </aside>
        <aside className="storage inactive">
          <h2>Pantry</h2>
        </aside>
        <aside className="storage inactive">
          <h2>Freezer</h2>
        </aside>
      </div>
    </div>  
  )
}

export default Home