import React, { useEffect, useState } from "react";
import "./styles/Register.css";

const Register = () => {
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
    document.body.classList.add('register-body');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('register-body');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {email, password}

    const response = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setEmail('')
      setPassword('')
      setError(null)
      console.log('New user added', json)
    }
  }


  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <input type="text" required />
          <label>Email</label>
        </div>
        <div className="form-body">
          <input 
            type="password" 
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
        </div>
        <div className="form-body">
          <input 
            type="password" 
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
        </div>
        <button className="btn">Register</button>
        <p className="text">Already have an account? <a href="/">Login here!</a></p>
      </form>
    </div>
  );
};

export default Register;