import React from "react";
import "../styles/experince.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Experince = () => {
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
          <FontAwesomeIcon icon={faPencil} />
        </div>
      </div>
    </>
  );
};

export default Experince;
