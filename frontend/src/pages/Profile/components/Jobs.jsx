import React, { useState } from "react";
import Post from "../../Main/components/Post";
import "../styles/jobs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../components/PopUp";

const Jobs = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <>
      <div className="jobs">
        <div className="head">
          <h2>Posts</h2>
          <FontAwesomeIcon icon={faPlus} onClick={togglePopup} />
        </div>
        <Post />
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Create a Post</h2>
          <div>
            <label htmlFor="description">Job description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              placeholder="enter a description"
              rows="10"
            ></textarea>
          </div>
          <div>
            <label htmlFor="description">Job Image</label>
            <input type="file" placeholder="Job Image" />
          </div>
          <div className="buttons">
            <button>Create</button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Jobs;
