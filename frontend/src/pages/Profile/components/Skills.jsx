import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "../styles/skills.css";
import PopUp from "../../components/PopUp";

const Skills = () => {
  const [cookies] = useCookies(["id", "type"]);
  const [allSkills, setAllSkills] = useState();
  const [newSkill, setNewSkill] = useState({
    skill_id: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  useEffect(() => {
    axios.get("http://localhost/linkedclone/server/skills.php").then((res) => {
      console.log(res.data);
      setAllSkills(res.data);
    });
  }, []);
  return (
    <>
      <div className="skills">
        <div className="add">
          <h2>Skills</h2>
          <FontAwesomeIcon icon={faPencil} onClick={togglePopup} />
        </div>
        <div className="box">
          <p>Skill name</p>
        </div>
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Skills</h2>
          <div>
            <label htmlFor="skillName">Skill name</label>
            <select
              name="skillName"
              id="skillName"
              onChange={(e) => {
                setNewSkill({
                  ...newSkill,
                  skill_id: e.target.value,
                });
              }}
            >
              {allSkills?.map((skill, i) => (
                <option key={i} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                const { skill_id } = newSkill;
                const newSkillData = new FormData();
                newSkillData.append("skill_id", skill_id);
                newSkillData.append("user_id", cookies.id);
                axios
                  .post(
                    "http://localhost/linkedclone/server/userSkills.php",
                    newSkillData
                  )
                  .then((res) => {
                    console.log(res.data);
                    setNewSkill({
                      skill_id: "",
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

export default Skills;
