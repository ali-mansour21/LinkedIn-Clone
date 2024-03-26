import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../styles/description.css";
import { useCookies } from "react-cookie";
import PopUp from "../../components/PopUp";
import axios from "axios";

const Description = () => {
  const [cookies] = useCookies(["id", "type"]);
  const [companyData, setCompanyData] = useState();
  const [newCompanyData, setNewCompanyData] = useState({
    name: "",
    description: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  const getCompany = () => {
    axios
      .get(
        `http://localhost/linkedclone/server/createCompany.php?user_id=${cookies.id}`
      )
      .then((res) => {
        setCompanyData(res.data.data);
      });
  };
  useEffect(() => {
    getCompany();
  }, []);
  return (
    <>
      <div className="descritpion">
        <div className="head">
          <h2>Description</h2>
          <FontAwesomeIcon onClick={togglePopup} icon={faPencil} />
        </div>
        <p>{companyData?.Name}</p>
        <p>{companyData?.Description}</p>
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Add Name & Description</h2>
          <div>
            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => {
                setNewCompanyData({
                  ...newCompanyData,
                  name: e.target.value,
                });
              }}
              placeholder="name"
            />
          </div>
          <div>
            <textarea
              name="description"
              id="description"
              cols="30"
              onChange={(e) => {
                setNewCompanyData({
                  ...newCompanyData,
                  description: e.target.value,
                });
              }}
              placeholder="enter a description"
              rows="10"
            ></textarea>
          </div>
          <div className="buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                const { name, description } = newCompanyData;
                const companyFormData = new FormData();
                companyFormData.append("name", name);
                companyFormData.append("descritpion", description);
                companyFormData.append("user_id", cookies.id);
                axios
                  .post(
                    "http://localhost/linkedclone/server/createCompany.php",
                    companyFormData
                  )
                  .then((res) => {
                    getCompany();
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

export default Description;
