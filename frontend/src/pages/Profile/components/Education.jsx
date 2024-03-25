import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "../styles/education.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../components/PopUp";
import axios from "axios";
const Education = () => {
  const [cookies] = useCookies(["id", "type"]);
  const [educationData, setEducationData] = useState();
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institutionName: "",
    start_year: "",
    end_year: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost/linkedclone/server/education.php?user_id=${cookies.id}`
      )
      .then((response) => {
        console.log(response.data);
        setEducationData(response.data);
      });
  }, []);
  return (
    <>
      <div className="education">
        <div className="add">
          <h2>Education</h2>
          <FontAwesomeIcon icon={faPencil} onClick={togglePopup} />
        </div>
        {educationData?.map((e, i) => (
          <div className="box" key={i}>
            <div className="info">
              <h4>{e.institution}</h4>
              <h5>{e.degree}</h5>
              <h6>
                {e.start_date} - {e.end_date}
              </h6>
            </div>
          </div>
        ))}
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Education</h2>
          <div>
            <label htmlFor="degree">Degree</label>
            <input
              name="degree"
              id="degree"
              type="text"
              onChange={(e) => {
                setNewEducation({
                  ...newEducation,
                  degree: e.target.value,
                });
              }}
              placeholder="degree"
            />
          </div>
          <div>
            <label htmlFor="institutionName">Institution name</label>
            <input
              onChange={(e) => {
                setNewEducation({
                  ...newEducation,
                  institutionName: e.target.value,
                });
              }}
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
              onChange={(e) => {
                setNewEducation({
                  ...newEducation,
                  start_date: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="end date"
              onChange={(e) => {
                setNewEducation({
                  ...newEducation,
                  end_date: e.target.value,
                });
              }}
            />
          </div>
          <div className="buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                const { degree, institutionName, start_date, end_date } =
                  newEducation;
                const educationData = new FormData();
                educationData.append("degree", degree);
                educationData.append("institution", institutionName);
                educationData.append("start_date", start_date);
                educationData.append("end_date", end_date);
                educationData.append("user_id", cookies.id);
                axios
                  .post(
                    `http://localhost/linkedclone/server/education.php`,
                    educationData
                  )
                  .then((response) => {
                    console.log(response.data);
                    setNewEducation({
                      degree: "",
                      institutionName: "",
                      start_year: "",
                      end_year: "",
                    });
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

export default Education;
