import React, { useState } from "react";
import "../styles/experince.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../components/PopUp";

const Experince = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <>
      <div className="experince">
        <h2>Experince</h2>
        <div className="box">
          <div className="info">
            <h2>Company Name</h2>
            <p>AUG 2020 - JAN 2021</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              cum magni ducimus odio error illum ullam, fugiat optio eveniet
              consequatur reprehenderit laudantium explicabo quis vel. Fuga vero
              sunt dolorum inventore?
            </p>
          </div>
          <FontAwesomeIcon icon={faPencil} onClick={togglePopup} />
        </div>
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Expirence</h2>
          <div>
            <label htmlFor="companyName">Company name</label>
            <input
              name="companyName"
              id="companyName"
              type="text"
              placeholder="Company name"
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
          <div>
            <label htmlFor="description"> Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              placeholder="enter a description"
              rows="10"
            ></textarea>
          </div>
          <div className="buttons">
            <button>Add</button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Experince;
