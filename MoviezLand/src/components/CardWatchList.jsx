import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faLink } from "@fortawesome/free-solid-svg-icons";
import "../style/component/style.css";

const CardDetails = () => {
  return (
    <div className="container mt-4">
      <div className="movie-card">
        <div className="poster">
          <img
            src="https://static.printler.com/product-images/site-images/185186/185186-p1.jpg"
            alt="Black Widow"
          />
        </div>

        <div className="details">
          <div className="title-container">
            <h1>BLACK WIDOW</h1>
            <FontAwesomeIcon icon={faHeart} className="heart-icon" />
          </div>
          <p className="release-date">Sep 25, 2017</p>

          <div className="rating">
            {[...Array(4)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="star filled" />
            ))}
            <FontAwesomeIcon icon={faStar} className="star" />
            <span className="rating-count">9288</span>
          </div>

          <p className="description">
            Natasha Romanoff, also known as Black Widow, confronts the darker
            parts of her ledger when a dangerous conspiracy with ties to her past
            arises. Pursued by a force that will stop at nothing to bring her
            down, Natasha must deal with her history as a spy and the broken
            relationships left in her wake long before she became an Avenger.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;