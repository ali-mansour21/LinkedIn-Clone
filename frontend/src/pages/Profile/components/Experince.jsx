import React, { useEffect, useState } from "react";
import "../styles/experince.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import axios from "axios";
import PopUp from "../../components/PopUp";

const Experince = () => {
  const [cookies] = useCookies(["id", "type"]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [experienceData, setExperienceData] = useState();
  const [newExperience, setNewExperience] = useState({
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  const getData = () => {
    axios
      .get(
        `http://localhost/linkedclone/server/experience.php?user_id=${cookies.id}`
      )
      .then((res) => {
        setExperienceData(res.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="experince">
        <div className="add">
          <h2>Experince</h2>
          <FontAwesomeIcon icon={faPencil} onClick={togglePopup} />
        </div>
        {experienceData?.map((e, i) => (
          <div className="box" key={i}>
            <div className="info">
              <h2>{e.company_name}</h2>
              <p>
                {e.start_date} - {e.end_date}
              </p>
              <p>{e.description}</p>
            </div>
          </div>
        ))}
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
              onChange={(e) => {
                setNewExperience({ ...newExperience, company: e.target.value });
              }}
              placeholder="Company name"
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              onChange={(e) => {
                setNewExperience({
                  ...newExperience,
                  startDate: e.target.value,
                });
              }}
              placeholder="start date"
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              onChange={(e) => {
                setNewExperience({ ...newExperience, endDate: e.target.value });
              }}
              placeholder="end date"
            />
          </div>
          <div>
            <label htmlFor="description"> Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              onChange={(e) => {
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                });
              }}
              placeholder="enter a description"
            ></textarea>
          </div>
          <div className="buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                const { description, startDate, endDate, company } =
                  newExperience;
                const newData = new FormData();
                newData.append("description", description);
                newData.append("start_date", startDate);
                newData.append("end_date", endDate);
                newData.append("company_name", company);
                newData.append("user_id", cookies.id);
                axios
                  .post(
                    "http://localhost/linkedclone/server/experience.php",
                    newData
                  )
                  .then((res) => {
                    getData();
                    togglePopup();
                  });
              }}
            >
              Add
            </button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Experince;
