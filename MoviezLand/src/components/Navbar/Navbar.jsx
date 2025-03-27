import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="d-flex justify-content-between align-items-center px-3 py-1 bg-yellow">
      <a className="nav-link title">MoviezLand</a>
      <div className="d-flex align-items-center justify-content-center gap-3">
        <Dropdown>
          <Dropdown.Toggle className="text-small" id="dropdown-basic">
            EN
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="text-small" href="#/action-1">
              AR
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="watchlist container d-flex gap-2">
          <FontAwesomeIcon icon={faHeart} className="fa-xl" />
          <a className="align-self-center nav-link text-small">Watchlist</a>
        </div>
      </div>
    </nav>
  );
}
