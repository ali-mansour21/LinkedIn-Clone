import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../styles/activity.css";
import Post from "../../Main/components/Post";
import PopUp from "../../components/PopUp";

const Activity = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showEditPopUp, setEditShowPopUp] = useState(false);
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  const toggleEditPopup = () => {
    setEditShowPopUp(!showEditPopUp);
  };
  return (
    <>
      <div className="activity">
        <div className="head">
          <div>
            <h2>Activity</h2>
            <p>500 follower</p>
          </div>
          <div className="buttons">
            <button onClick={togglePopup}>Create a post</button>
            <FontAwesomeIcon
              className="edit"
              icon={faPencil}
              onClick={toggleEditPopup}
            />
          </div>
        </div>
        <div className="post">
          <Post />
        </div>
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Create a Post</h2>
          <div>
            <label htmlFor="description">Post description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              placeholder="enter a description"
              rows="10"
            ></textarea>
          </div>
          <div>
            <label htmlFor="description">Post Image</label>
            <input type="file" placeholder="Job Image" />
          </div>
          <div className="buttons">
            <button>Create</button>
          </div>
        </PopUp>
      )}
      {showEditPopUp && (
        <PopUp onClose={toggleEditPopup}>
          <h2>Edit a Post</h2>
          <div>
            <label htmlFor="description">Post description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              placeholder="enter a description"
              rows="10"
            ></textarea>
          </div>
          <div>
            <label htmlFor="description">Post Image</label>
            <input type="file" placeholder="Job Image" />
          </div>
          <div className="buttons">
            <button>Edit</button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Activity;
