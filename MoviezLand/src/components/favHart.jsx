import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons"; 
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

const FavHart = ({ isfav }) => {
  if (isfav) {
    return (
      <div style={{ color: "yellow", fontSize: "40px" }}>
        <FontAwesomeIcon icon={fasHeart} />
      </div>
    );
  } else {
    return (
      <div style={{ color: "black", fontSize: "40px" }}>
        <FontAwesomeIcon icon={faHeart} />
      </div>
    );
  }
};

export default FavHart;
