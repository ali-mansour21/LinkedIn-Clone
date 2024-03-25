import React, { useEffect, useState } from "react";
import Header from "../Main/components/Header";
import "./index.css";
import profileImage from "../../assets/empty-image.jpeg";
import cover from "../../assets/cover.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Activity from "./components/Activity";
import Education from "./components/Education";
import Experince from "./components/Experince";
import Skills from "./components/Skills";
import { useCookies } from "react-cookie";
import Jobs from "./components/Jobs";
import Description from "./components/Description";

const Index = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if (token) {
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        setUserId(payload.user_id);
        setUserType(payload.user_type);
      } else {
        console.error("Invalid JWT token format");
      }
    }
  }, [token]);
  return (
    <>
      <Header />
      <div className="main-section">
        <div className="column-1">
          <div className="profile">
            <div className="profile-image">
              <img className="cover" srcSet={cover} alt="" />
              <img className="profile" srcSet={profileImage} alt="" />
              <FontAwesomeIcon className="pencil" icon={faPencil} />
            </div>
            <div className="profile-info">
              <h2>Name</h2>
              <p>title</p>
              <p className="location">location</p>
              <p className="connections">400 connection</p>
            </div>
          </div>
          {userType === 0 ? (
            <div>
              <Activity />
              <Education />
              <Experince />
              <Skills />
            </div>
          ) : (
            <div>
              <Description />
              <Jobs />
            </div>
          )}
        </div>
        <div className="column-2">
          <h2>section 2</h2>
        </div>
      </div>
    </>
  );
};
export default Index;
