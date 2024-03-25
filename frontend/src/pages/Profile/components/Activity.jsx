import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../styles/activity.css";
import Post from "../../Main/components/Post";
import PopUp from "../../components/PopUp";
import axios from "axios";
const Activity = ({ data }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showEditPopUp, setEditShowPopUp] = useState(false);
  const [postsData, setPostsData] = useState();
  const [newPost, setNewPost] = useState({
    description: "",
    image: "",
  });
  const togglePopup = () => {
    setShowPopUp(!showPopUp);
  };
  const toggleEditPopup = () => {
    setEditShowPopUp(!showEditPopUp);
  };
  useEffect(() => {
    if (data) {
      setPostsData(data);
    }
  }, [data]);
  return (
    <>
      <div className="activity">
        <div className="head">
          <div>
            <h2>Activity</h2>
            <p>500 follower</p>
          </div>
          <div className="buttons">
            <button onClick={togglePopup}>Create a post</button>
            <FontAwesomeIcon
              className="edit"
              icon={faPencil}
              onClick={toggleEditPopup}
            />
          </div>
        </div>
        <div className="post">
          {postsData?.posts?.map((post, i) => (
            <Post
              key={i}
              post={post}
              name={postsData.user_name}
              bio={postsData.profile_bio}
            />
          ))}
        </div>
      </div>
      {showPopUp && (
        <PopUp onClose={togglePopup}>
          <h2>Create a Post</h2>
          <div>
            <label htmlFor="description">Post description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              onChange={(e) => {
                setNewPost({
                  ...newPost,
                  description: e.target.value,
                });
              }}
              placeholder="enter a description"
              rows="10"
            ></textarea>
          </div>
          <div>
            <label htmlFor="description">Post Image</label>
            <input
              type="file"
              placeholder="Job Image"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setNewPost({
                  ...newPost,
                  image: selectedFile,
                });
              }}
            />
          </div>
          <div className="buttons">
            <button
              onClick={(e) => {
                const { description, image } = newPost;
                const dataForm = new FormData();
                dataForm.append("description", description);
                dataForm.append("post_image", image);
                dataForm.append("user_id", postsData.user_id);
                e.preventDefault();
                axios
                  .post(
                    "http://localhost/linkedclone/server/posts.php",
                    dataForm
                  )
                  .then((response) => {
                    console.log(response);
                  });
                togglePopup();
              }}
            >
              Create
            </button>
          </div>
        </PopUp>
      )}
      {showEditPopUp && (
        <PopUp onClose={toggleEditPopup}>
          <h2>Edit a Post</h2>
          <div>
            <label htmlFor="description">Post description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              placeholder="enter a description"
              rows="10"
            ></textarea>
          </div>
          <div>
            <label htmlFor="description">Post Image</label>
            <input type="file" placeholder="Job Image" />
          </div>
          <div className="buttons">
            <button>Edit</button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Activity;
