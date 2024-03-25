import React, { useState } from "react";
import "../styles/education.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../components/PopUp";
const Education = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <>
      <div className="education">
        <h2>Education</h2>
        <div className="box">
          <div className="info">
            <h4>University of Michigan</h4>
            <h5>Bachelor of Engineering</h5>
            <h6>2020 - Present</h6>
          </div>
          <div className="edit">
            <FontAwesomeIcon icon={faPencil} onClick={togglePopup} />
          </div>
        </div>
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Education</h2>
          <div>
            <label htmlFor="degree">Degree</label>
            <input name="degree" id="degree" type="text" placeholder="degree" />
          </div>
          <div>
            <label htmlFor="institutionName">Institution name</label>
            <input
              name="institutionName"
              id="institutionName"
              type="text"
              placeholder="Institution name"
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              placeholder="start date"
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="end date"
            />
          </div>
          <div className="buttons">
            <button>Add</button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Education;
