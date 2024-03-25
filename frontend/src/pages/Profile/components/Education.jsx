import React from "react";
import "../styles/education.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
const Education = () => {
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
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Education;
