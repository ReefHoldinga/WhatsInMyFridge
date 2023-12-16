import React, { useEffect } from "react";
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

  return (
    <div className="container">
      <h1>Register</h1>
      <form>
        <div className="form-body">
          <input type="text" required />
          <label>Email</label>
        </div>
        <div className="form-body">
          <input type="password" required />
          <label>Password</label>
        </div>
        <div className="form-body">
          <input type="password" required />
          <label>Confirm  Password</label>
        </div>
        <button className="btn">Register</button>
        <p className="text">Already have an account? <a href="/">Login here!</a></p>
      </form>
    </div>
  );
};

export default Register;