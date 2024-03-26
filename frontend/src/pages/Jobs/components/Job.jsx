import React, { useState } from "react";
import "../../Main/styles/post.css";
import emptyProfile from "../../../assets/empty-image.jpeg";
import PopUp from "../../components/PopUp";
const Job = ({ job }) => {
  return (
    <>
      <div className="post">
        <div className="first-section">
          <div>
            <img srcSet={emptyProfile} alt="" />
            <div className="post-info">
              <h4>{job?.company_name}</h4>
              <h5>Bio</h5>
              <h5>{job?.job_date}</h5>
            </div>
          </div>
        </div>
        <div className="second-section">
          <p>{job?.job_description}</p>
        </div>
        <div className="apply">
          <button>Apply Now</button>
        </div>
      </div>
    </>
  );
};

export default Job;
