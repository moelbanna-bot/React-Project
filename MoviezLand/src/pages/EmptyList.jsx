import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

const EmptyList = ({ showHeading = true }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-4 flex-column justify-content-center align-items-center text-center">
      <div className="position-relative mb-4 opacity-50">
        <img
          src="/heart_slash.svg"
          alt="Empty watchlist"
          style={{
            width: "20rem",
            height: "20rem",
            transform: "translateY(-60px)",
          }}
        />
      </div>
      <h4
        className="mb-4 text-secondary"
        style={{ transform: "translateY(-60px)", fontSize: "30px" }}
      >
        {t("emptyWatchlist")}
      </h4>
      <button
        className="btn btn-warning back-home"
        style={{
          borderRadius: "20px",
          padding: "10px 60px",
          backgroundColor: "#FFD740",
          border: "none",
          transform: "translateY(-50px)",
        }}
        onClick={() => navigate("/")}
      >
        {t("backToHome")}
      </button>
    </div>
  );
};

export default EmptyList;
