import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../Main/components/Header.jsx";
import Job from "./components/Job.jsx";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCheck,
  faGear,
  faList,
  faNoteSticky,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PopUp from "../components/PopUp.jsx";
const Index = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [cookies] = useCookies(["id", "type"]);
  const [allJobs, setAllJobs] = useState();
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
  });
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  const getAllJobs = () => {
    axios
      .get("http://localhost/linkedclone/server/jobposts.php")
      .then((res) => {
        setAllJobs(res.data);
      });
  };
  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <>
      <div>
        <Header />
        <div className="main-container">
          <div className="column-1">
            <div className="box">
              <ul>
                <li>
                  <FontAwesomeIcon icon={faBookmark} />
                  <h4>My Jobs</h4>
                </li>
                <li>
                  <FontAwesomeIcon icon={faList} />
                  <h4>Preferences</h4>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  <h4>Demonstrate</h4>
                </li>
                <li>
                  <FontAwesomeIcon icon={faNoteSticky} />
                  <h4>Interview Prep</h4>
                </li>
                <li>
                  <FontAwesomeIcon icon={faNoteSticky} />
                  <h4>Resume Builder</h4>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  <h4>Job seeker</h4>
                </li>
                <li>
                  <FontAwesomeIcon icon={faGear} />
                  <h4>Application</h4>
                </li>
              </ul>
            </div>
            {cookies.type === 1 ? (
              <div className="add-job">
                <button onClick={togglePopup}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span>Post a free job</span>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="column-2">
            {allJobs?.map((job, i) => {
              return <Job key={i} job={job} />;
            })}
          </div>
        </div>
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Create a new job</h2>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => {
                setNewJob({ ...newJob, title: e.target.value });
              }}
              placeholder="Job title"
            />
          </div>
          <div>
            <label htmlFor="description">Job description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              onChange={(e) => {
                setNewJob({ ...newJob, description: e.target.value });
              }}
              placeholder="enter a description"
              rows="10"
            ></textarea>
          </div>
          <div className="buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                const { title, description } = newJob;
                const jobData = new FormData();
                jobData.append("title", title);
                jobData.append("description", description);
                jobData.append("user_id", cookies.id);
                axios
                  .post(
                    "http://localhost/linkedclone/server/jobposts.php",
                    jobData
                  )
                  .then((res) => {
                    getAllJobs();
                    togglePopup();
                  });
              }}
            >
              Create
            </button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Index;
