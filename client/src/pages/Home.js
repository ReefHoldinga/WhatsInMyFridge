import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import '@fortawesome/fontawesome-free/css/all.css';

const Home = () => {

  const [mainContent, setMainContent] = useState([]);

  useEffect(()=> {
    // Add class to the body element
    document.body.classList.add('home-body');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('home-body');
    }
  }, []);

  // const displayItem = (event) => {
  //   const item = event.currentTarget.closest('h2').innerText.trim(); // gets clicked container
  //   const parent = event.currentTarget.closest('div'); // gets entire storage container

  //   parent.querySelectorAll('.storage').forEach((child) => {
  //     child.remove();
  //   }) REPURPOSE FOR SETTING ACTIVE CLASS TO CATAEGORY TAB
      // console.log(parent);
    // console.log(item);
  // }

  // configure backend to support adding items to db
  // set up click event on each category tab
  // inject HTML consisting of items

  const addItem = async (e) => {
    e.preventDefault();

    const item = {
      name: 'Peanuts',
      expires: '10/26',
      section: 'Pantry',
      amount: '0.5lbs',
    };

    setMainContent((prevContent) => [...prevContent, item]);

    // add item to db
    const response = await fetch('/api/foodstuffs/add', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    console.log(json);
  };

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
      {mainContent.map((item) => (
          <div className="item-container" key={item.id}>
            <h2>{item.name}</h2>
            <p>Expires {item.expires}</p>
            <p className="section">Section: {item.section}</p>
            <p>Amount: {item.amount}</p>
          </div>
        ))}
    </main>
    <div className="storage-container">
      <aside className="storage">
        <h2>Categories</h2>
      </aside>
      <aside className="storage inactive">
        <h2>Fridge <i className="fa-solid fa-plus" onClick={addItem}></i></h2>
      </aside>
      <aside className="storage">
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