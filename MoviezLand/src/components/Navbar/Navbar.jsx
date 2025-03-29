import React, { useEffect, lazy } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/slices/language";
import { useTranslation } from "../../hooks/useTranslation";
import {
  fetchPaginatedMovies,
  fetchMovieDetails,
  fetchMovieRecommendations,
} from "../../store/slices/moviesSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentLanguage = useSelector((state) => state.language.value);
  const { t } = useTranslation();
  const currentMovieId = location.pathname.match(/\/movie\/(\d+)/)?.[1];

  const handleLanguageChange = (lang) => {
    if (lang !== currentLanguage) {
      dispatch(setLanguage(lang));

      if (currentMovieId) {
        dispatch(fetchMovieDetails(currentMovieId));
        dispatch(fetchMovieRecommendations(currentMovieId));
      } else if (location.pathname === "/") {
        dispatch(fetchPaginatedMovies({ query: "popular", page: 1 }));
      }
    }
  };

  return (
    <div className="container-fluid p-0">
      <nav className="d-flex justify-content-between align-items-center px-3 py-1 bg-yellow">
        <Link to="/" className="nav-link title fw-bold">
          {t("title")}
        </Link>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <Dropdown>
            <Dropdown.Toggle className="text-small" id="dropdown-basic">
              {currentLanguage.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                className="text-small"
                onClick={() => handleLanguageChange("en")}
              >
                EN
              </Dropdown.Item>
              <Dropdown.Item
                className="text-small"
                onClick={() => handleLanguageChange("ar")}
              >
                AR
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="watchlist container d-flex gap-2">
            <FontAwesomeIcon icon={faHeart} className="fa-xl" />
            <Link
              to="/watchlist"
              className="align-self-center nav-link text-small fw-bold"
            >
              {t("watchlist")}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
