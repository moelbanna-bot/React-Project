import React from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center my-5">
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
}