import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import WishlistButton from "./favHart";

const MovieCard = ({ movie }) => {
  const starRating = Math.round(movie.vote_average / 2);

  return (
    <div className="col">
      <Card
        className="mb-3 p-3 border-0 h-100"
        style={{
          borderRadius: "20px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          width: "100%",
        }}
      >
        <Row className="g-0 h-100">
          <Col xs={4} sm={5} md={5} className="d-flex align-items-center">
            <Card.Img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
              className="img-fluid rounded"
              style={{
                objectFit: "cover",
                maxHeight: "200px",
                width: "100%",
              }}
            />
          </Col>

          <Col
            xs={8}
            sm={7}
            md={7}
            className="ps-2 ps-sm-3 d-flex flex-column justify-content-between"
          >
            <div>
              <div className="d-flex justify-content-between align-items-start">
                <Card.Title
                  className="mb-2"
                  style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                >
                  {movie.title || "Untitled"}
                </Card.Title>
                <WishlistButton key={movie.id} movie={movie} />
              </div>

              <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }) || "Year unknown"}
              </Card.Text>
            </div>

            <StarRating rating={starRating} voteCount={movie.vote_count} />

            <Card.Text
              style={{
                fontSize: "0.9rem",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "#333",
              }}
            >
              {movie.overview || "No description available."}
            </Card.Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const StarRating = ({ rating, voteCount, maxStars = 5 }) => {
  return (
    <div className="d-flex align-items-center mb-2">
      {[...Array(maxStars)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i < rating ? "text-warning" : "text-secondary"}
          style={{ fontSize: "1rem" }}
        />
      ))}
      <span className="ms-2 text-muted" style={{ fontSize: "0.9rem" }}>
        ({voteCount || "0"})
      </span>
    </div>
  );
};

export default MovieCard;
