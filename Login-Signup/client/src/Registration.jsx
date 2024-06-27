import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8001/register", { name, email, pass })
      .then((res) => {
        navigate('/login')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Submit
          </button>
          <p>Already have an Account?</p>
          <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
