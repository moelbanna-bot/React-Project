import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./SearchBar.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { resetPagination } from "../../store/slices/moviesSlice";
import { useTranslation } from "../../hooks/useTranslation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(resetPagination());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="search-form w-100">
      <InputGroup className="mb-3 gap-4">
        <Form.Control
          placeholder={t("search")}
          aria-label={t("search")}
          aria-describedby="basic-addon2"
          id="input-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow-1"
        />
        <Button
          id="button-search"
          type="submit"
          className="d-flex align-items-center justify-content-center"
        >
          {t("search").split("...")[0]}
        </Button>
      </InputGroup>
    </form>
  );
}
