import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/activity.css";
import Post from "../../Main/components/Post";

const Activity = () => {
  return (
    <>
      <div className="activity">
        <div className="head">
          <div>
            <h2>Activity</h2>
            <p>500 follower</p>
          </div>
          <div className="buttons">
            <button>Create a post</button>
            <FontAwesomeIcon className="edit" icon={faPencil} />
          </div>
        </div>
        <div className="post">
          <Post />
        </div>
      </div>
    </>
  );
};

export default Activity;
