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
import axios from "axios";

const Index = () => {
  const [cookies] = useCookies(["id", "type"]);

  const [userId, setUserId] = useState();
  const [userType, setUserType] = useState();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserId(cookies.id);
    setUserType(cookies.type);
    axios
      .get(
        `http://localhost/linkedclone/server/posts.php?user_id=${cookies.id}`
      )
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cookies.id, cookies.type, userData]);
  return (
    <>
      <Header />
      <div className="main-section">
        <div className="column-1">
          {userData ? (
            <div className="profile">
              <div className="profile-image">
                <img
                  className="cover"
                  srcSet={userData.cover_image ? userData.cover_image : cover}
                  alt=""
                />
                <img
                  className="profile"
                  srcSet={
                    userData.profile_image
                      ? userData.profile_image
                      : profileImage
                  }
                  alt=""
                />
                <FontAwesomeIcon className="pencil" icon={faPencil} />
              </div>
              <div className="profile-info">
                <h2>{userData.user_name}</h2>
                <p>{userData.profile_bio}</p>
                <p className="location">location</p>
                <p className="connections">400 connection</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {userType === 0 ? (
            <div>
              <Activity data={userData} />
              <Education />
              <Experince />
              <Skills />
            </div>
          ) : (
            <div>
              <Description />
              <Activity data={userData} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Index;
