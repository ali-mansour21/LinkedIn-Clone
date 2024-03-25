import "./index.css";
import logo from "../assets/Linkedin-Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    type: "",
  });
  return (
    <>
      <section className="login-page">
        <div className="logo">
          <img srcSet={logo} alt="logo" />
        </div>
      </section>
      <div className="login-container">
        <h1>Make the most of your professional life</h1>
        <div className="form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              try {
                const { username, email, password, type } = credentials;
                const userData = new FormData();
                userData.append("user_name", username);
                userData.append("email", email);
                userData.append("password", password);
                userData.append("type", type);
                axios
                  .post(
                    "http://localhost/linkedclone/server/auth/signup.php",
                    userData
                  )
                  .then((response) => {
                    if (response.data.status === 200) {
                      Cookie.set("token", response.data.token);
                      Cookie.set("id", response.data.user_id);
                      Cookie.set("type", response.data.user_type);
                      navigate("/home");
                    }
                  });
              } catch (error) {}
            }}
          >
            <div>
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                placeholder="enter your  name"
                onChange={(e) => {
                  setCredentials({ ...credentials, username: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="enter your  email"
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="enter your  password"
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="userType">Type</label>
              <select
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    type: parseInt(e.target.value),
                  });
                }}
              >
                <option value="0">User</option>
                <option value="1">Company</option>
              </select>
            </div>
            <div>
              <button type="submit">Agree & Join</button>
            </div>
            <div className="line">
              <hr />
            </div>
            <div className="link">
              Already on LinkedIn?
              <button
                className="toLogin"
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
