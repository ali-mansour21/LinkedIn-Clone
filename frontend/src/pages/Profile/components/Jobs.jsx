import React from "react";
import Post from "../../Main/components/Post";
import "../styles/jobs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Jobs = () => {
  return (
    <>
      <div className="jobs">
        <div className="head">
          <h2>Jobs</h2>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <Post />
      </div>
    </>
  );
};

export default Jobs;
