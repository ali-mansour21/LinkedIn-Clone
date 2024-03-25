import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../styles/description.css";
import PopUp from "../../components/PopUp";

const Description = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <>
      <div className="descritpion">
        <div className="head">
          <h2>Description</h2>
          <FontAwesomeIcon onClick={togglePopup} icon={faPencil} />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          aspernatur consequatur corporis delectus doloremque dolorum eos
          expedita facilis fuga harum impedit ipsa ipsam itaque laudantium
          maiores molestiae nobis nihil nulla quae quasi quos repellendus
          repudiandae saepe sequi sint soluta tempora tenetur ullam unde ut
          voluptates voluptatum.
        </p>
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          {/* Content to be rendered inside the popup */}
          <h2>Edit Description</h2>
          <div>
            <textarea
              name="description"
              id="description"
              cols="30"
              placeholder="enter a description"
              rows="10"
            ></textarea>
          </div>
          <div className="buttons">
            <button>Edit</button>
          </div>
        </PopUp>
      )}
      
    </>
  );
};

export default Description;
