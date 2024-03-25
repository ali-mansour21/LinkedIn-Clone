import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/skills.css";

const Skills = () => {
  return (
    <>
      <div className="skills">
        <h2>Skills</h2>
        <div className="box">
          <p>Skill name</p>
          <FontAwesomeIcon icon={faPencil} />
        </div>
      </div>
    </>
  );
};

export default Skills;
