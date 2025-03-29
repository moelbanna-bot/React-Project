import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

const EmptyList = ({ showHeading = true }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="empty-list-container">
      <div className="mb-4">
        <img
          src="/heart_slash.svg"
          alt="Empty watchlist"
          className="img-fluid"
        />
      </div>
      <h4 className="mb-4 text-secondary">{t("emptyWatchlist")}</h4>
      <button
        className="btn btn-warning back-home"
        style={{
          borderRadius: "20px",
          padding: "10px 60px",
          backgroundColor: "#FFD740",
          border: "none",
        }}
        onClick={() => navigate("/")}
      >
        {t("backToHome")}
      </button>
    </div>
  );
};

export default EmptyList;
