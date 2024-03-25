import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../styles/skills.css";
import PopUp from "../../components/PopUp";

const Skills = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <>
      <div className="skills">
        <h2>Skills</h2>
        <div className="box">
          <p>Skill name</p>
          <FontAwesomeIcon icon={faPencil} onClick={togglePopup} />
        </div>
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Skills</h2>
          <div>
            <label htmlFor="skillName">Skill name</label>
            <select name="skillName" id="skillName"></select>
          </div>
          <div className="buttons">
            <button>Add</button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Skills;
