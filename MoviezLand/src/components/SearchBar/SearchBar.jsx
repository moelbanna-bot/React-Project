import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="container mt-3">
      <InputGroup className="mb-3 gap-4">
        <Form.Control
          placeholder="Search for Movies..."
          aria-label="Search for Movies"
          aria-describedby="basic-addon2"
          id="input-search"
        />
        <Button id="button-search">Search</Button>
      </InputGroup>
    </div>
  );
}
