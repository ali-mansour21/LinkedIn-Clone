import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBriefcase,
  faHouse,
  faMessage,
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import linkedLogo from "../../../assets/linked-logo.png";
import profile from "../../../assets/empty-image.jpeg";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo">
        <img src={linkedLogo} alt="" srcset="" />
        <div className="search">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="links">
        <ul>
          <li>
            <button
              onClick={() => {
                navigate("/home");
              }}
            >
              <FontAwesomeIcon icon={faHouse} />
              Home
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faUsers} />
              My Network
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/jobs");
              }}
            >
              <FontAwesomeIcon icon={faBriefcase} />
              Jobs
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faMessage} />
              Messaging
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faBell} />
              Notifications
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/profile");
              }}
            >
              <img src={profile} alt="" />
              Me
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
