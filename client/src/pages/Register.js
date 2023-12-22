import React, { useEffect, useState } from "react";
import "./styles/Register.css";

const errors = document.getElementsByClassName('error');

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
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {email, password};

    if(!checkPassStrength(password)) {
      resetErrors(errors);
      errors[2].style.visibility = "visible";
      errors[2].style.position = "relative";
      return;
    }

    if(password !== confirm) {

      resetErrors(errors); // will reset errors so only one will show at a time

      console.log('Passwords do not match. Please try again.');
      errors[3].style.visibility = "visible";
      errors[3].style.position = "relative";
      return;
    }
    
    const response = await fetch('api/users/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json);
      console.log(error);
      if(json === 'EMAIL ALREADY EXISTS') {
        resetErrors(errors); // will reset errors so only one will show at a time
        errors[0].style.visibility = "visible";
        errors[0].style.position = "relative";
      }
    }

    if (response.ok) {
      setEmail('')
      setPassword('')
      setConfirm('')
      setError(null)
      console.log('New user added', json)
      window.location.replace("http://localhost:3000");
    }
  }

  const resetErrors = ((errors) => {
    errors = Array.from(errors)
    errors.forEach((error) => {
      error.style.visibility = "hidden";
      error.style.position = "absolute";
    })
  });

  const checkPassStrength = ((password) => {
    const passTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // ensures atleast 8 chars, one upper, one lower, one num, and one symbol
    if(passTest.test(password)) {
      return true;
    }
    return false;
  });

  const togglePass = (() => {
    
  });

  return (
    <div className="container">
      <h1>Register</h1>
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
        <div className="form-body">
          <input 
            type="password" 
            required
            onChange={(e) => setConfirm(e.target.value)}
          />
          <label>Confirm Password</label>
        </div>

        <p className="error email registered">This email is already registered.</p>
        <p className="error email invalid">Invalid email address</p>
        <p className="error pass weak">Please input a stronger password</p>
        <p className="error pass diff">Your passwords do not match.</p>

        <button className="btn">Register</button>
        <p className="text">Already have an account? <a href="/">Login here!</a></p>
      </form>
    </div>
  );
};

export default Register;