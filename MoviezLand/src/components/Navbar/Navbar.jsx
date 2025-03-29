import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/slices/language"; // Import the action

export default function Navbar() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.value); // Get current language

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang)); // Dispatch the selected language
  };

  return (
    <div className="container-fluid p-0">
      <nav className="d-flex justify-content-between align-items-center px-3 py-1 bg-yellow">
        <Link to="/" className="nav-link title fw-bold">
          MoviezLand
        </Link>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <Dropdown>
            <Dropdown.Toggle className="text-small" id="dropdown-basic">
              {currentLanguage.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                className="text-small"
                onClick={() => handleLanguageChange("en")} // Handle language change
              >
                EN
              </Dropdown.Item>
              <Dropdown.Item
                className="text-small"
                onClick={() => handleLanguageChange("ar")} // Handle language change
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
              Watchlist
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
