import {
  faComment,
  faEllipsis,
  faPaperPlane,
  faRepeat,
  faThumbsUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import emptyProfile from "../../../assets/empty-image.jpeg";
import cover from "../../../assets/cover.jpeg";
import "../styles/post.css";

const Post = ({ post, name, bio }) => {
  return (
    <>
      <div className="post">
        <div className="first-section">
          <div>
            <img srcSet={emptyProfile} alt="" />
            <div className="post-info">
              <h4>{name}</h4>
              <h5>{bio}</h5>
              <h5>Time</h5>
            </div>
          </div>
          <div className="buttons">
            <FontAwesomeIcon icon={faEllipsis} />
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="second-section">
          <p>{post?.post_description}</p>
          <img srcSet="../frontend/src/assets/6601bbeca07cf_OIP.jpeg" alt="" />
        </div>
        <div className="third-section">
          <div className="likes">
            <p>
              <span>
                <FontAwesomeIcon icon={faThumbsUp} />
              </span>
              ali and 21 others liked your post
            </p>
            <p>3 comments</p>
          </div>
          <div className="line"></div>
          <div className="actions">
            <ul>
              <li>
                <FontAwesomeIcon icon={faThumbsUp} />
                Like
              </li>
              <li>
                <FontAwesomeIcon icon={faComment} />
                Comment
              </li>
              <li>
                <FontAwesomeIcon icon={faRepeat} />
                Repost
              </li>
              <li>
                <FontAwesomeIcon icon={faPaperPlane} />
                Send
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
