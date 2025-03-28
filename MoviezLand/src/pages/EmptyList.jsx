import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const EmptyList = ({ showHeading = true }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      {showHeading && <h2 className="mb-4 fw-bold">Watch list</h2>}
      <div className="position-relative mb-4 opacity-50">
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            fontSize: "20rem",
            color: "#C4C4C4",
            transform: "translateY(-60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(45deg)",
            width: "25rem",
            height: "12px",
            backgroundColor: "#C4C4C4",
          }}
        />
      </div>
      <h4
        className="mb-4 text-secondary"
        style={{ transform: "translateY(-60px)", fontSize: "30px" }}
      >
        No Movies in watch list
      </h4>
      <button
        className="btn btn-warning"
        style={{
          borderRadius: "20px",
          padding: "10px 60px",
          backgroundColor: "#FFD740",
          border: "none",
          transform: "translateY(-50px)",
        }}
        onClick={() => navigate("/details")}
      >
        Back to home
      </button>
    </div>
  );
};

export default EmptyList;