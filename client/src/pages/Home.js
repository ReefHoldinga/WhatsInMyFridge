import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import '@fortawesome/fontawesome-free/css/all.css';

const Home = () => {

  const [mainContent, setMainContent] = useState([]);
  const [food, setFood] = useState('');
  const [date, setDate] = useState('');
  const [section, setSection] = useState('');
  const [amount, setAmount] = useState('');


  // const overlay = document.querySelector('.overlay');

  const changeType = (e) => {
    e.target.type = 'date'
  }

  const closePopup = (e) => {
    document.querySelector('.overlay').style.visibility='hidden';
    document.querySelector('.add').style.visibility='hidden';
  }

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

  const toggleOverlay = (e) => {
    e.preventDefault();

    document.querySelector('.overlay').style.visibility='visible';
    document.querySelector('.add').style.visibility='visible';
  };

  const addItem = async (e) => {
    let item = {
      name: food,
      expires: date,
      section: section,
      amount: amount,
    };

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

    if(response.ok) {
      setMainContent((prevContent) => [...prevContent, item]);
      closePopup();
      document.querySelector('.add form').reset();
    } else {
      document.querySelector('.form-nav-container p').style.visibility="visible";
    }
    
  }

  return (
    <>
      <div className="overlay"></div>
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

        <div className="add">
          <form>
            <input 
              type="text"
              required
              placeholder="Food or Drink"
              onChange={(e) => setFood(e.target.value)} 
            />
            <input 
              type="text"
              required
              placeholder="Expiration Date"
              onFocus={changeType}
              onChange={(e) => setDate(e.target.value)} 
            />
            <input 
              type="text"
              required
              placeholder="Section"
              onChange={(e) => setSection(e.target.value)} 
            />
            <input 
              type="text"
              required
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)} 
            />
          </form>
          <div className="form-nav-container">
            <i className="fa-solid fa-x" onClick={closePopup}></i>
            <p>Please fill out all form options!</p>
            <i class="fa-solid fa-arrow-right" onClick={addItem}></i>
          </div>
        </div>

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
            <h2>Fridge <i className="fa-solid fa-plus" onClick={toggleOverlay}></i></h2>
          </aside>
          <aside className="storage">
            <h2>Pantry</h2>
          </aside>
          <aside className="storage inactive">
            <h2>Freezer</h2>
          </aside>
        </div>
      </div> 
    </>
  )
}

export default Home