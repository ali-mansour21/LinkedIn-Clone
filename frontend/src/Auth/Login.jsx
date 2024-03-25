import "./index.css";
import logo from "../assets/Linkedin-Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
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
                const { email, password } = credentials;
                const userData = new FormData();
                userData.append("email", email);
                userData.append("password", password);
                axios
                  .post(
                    "http://localhost/linkedclone/server/auth/login.php",
                    userData
                  )
                  .then((response) => {
                    if (response.data.status === 200) {
                      Cookie.set("token", response.data.token);
                      navigate("/home");
                    }
                  });
              } catch (error) {}
            }}
          >
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
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
                placeholder="enter your  password"
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
            <div className="line">
              <hr />
            </div>
            <div className="link">
              Don't have an Account?
              <button
                className="toLogin"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
