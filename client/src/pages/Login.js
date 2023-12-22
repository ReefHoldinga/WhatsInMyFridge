import React, { useEffect, useState } from "react";
import "./styles/Login.css";

const errorMsg = document.getElementsByClassName('error');
const reset = document.getElementsByClassName('reset');

const Login = () => {
  useEffect(() => {
    const labels = document.querySelectorAll('.form-body label');
    labels.forEach(label => {
      const text = label.innerText;
      label.innerHTML = ''; // Clear the original label content

      // Create and append spans with transition delay
      text.split('').forEach((letter, idx) => {
        const span = document.createElement('span');
        span.innerHTML = letter;
        span.style.transitionDelay = `${idx * 50}ms`;
        label.appendChild(span);
      });
    });
  }, []);

  useEffect(()=> {
    // Add class to the body element
    document.body.classList.add('login-body');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('login-body');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {email, password};

    const response = await fetch('api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if(!response.ok) {
      setError(json);
      console.log(error);
      errorMsg[0].style.visibility = "visible";
      errorMsg[0].style.position = "relative";
      reset[0].style.visibility = "hidden";
      reset[0].style.position = "absolute";
    } else {
      window.location.replace("http://localhost:3000/home");
    }
  };
  
  return (
    <div className="container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <input 
            type="email" 
            required 
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div className="form-body">
          <input 
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <p className="reset"><a href="">Reset Password</a></p>
        <p className="error">Incorrect email or password. <a href="">Reset here.</a></p>

        <button className="btn">Login</button>
        <p className="text">Don't have an account? <a href="/register">Register here!</a></p>
      </form>
    </div>
  );
};

export default Login;