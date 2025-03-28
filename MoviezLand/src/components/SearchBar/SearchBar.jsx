import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./SearchBar.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className="mb-3 gap-4">
        <Form.Control
          placeholder="Search for Movies..."
          aria-label="Search for Movies"
          aria-describedby="basic-addon2"
          id="input-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button id="button-search" type="submit">
          Search
        </Button>
      </InputGroup>
    </form>
  );
}
