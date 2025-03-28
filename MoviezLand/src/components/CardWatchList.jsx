import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import EmptyList from "../pages/EmptyList";
import { fetchPaginatedMovies } from "../store/movies/moviesSlice"; // Importing API-related actions
import { removeFromWishlist } from "../store/movies/watchlist";

const CardWatchList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPaginatedMovies({ query: "popular", page: 1 })); // Example: Fetching popular movies
  }, [dispatch]);
  const wishlist = useSelector((state) => state.wishlist?.wishlist || []);

  if (wishlist.length === 0) {
    return <EmptyList showHeading={false} />;
  }

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {wishlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onRemove={() => dispatch(removeFromWishlist({ id: movie.id }))}
          />
        ))}
      </div>
    </div>
  );
};

const MovieCard = ({ movie, onRemove }) => {
  return (
    <div className="col">
      <div
        className="card shadow-sm p-3 d-flex flex-row align-items-start"
        style={{ maxWidth: "500px", whiteSpace: "normal" }}
      >
        <img
          src={movie.image || "placeholder.jpg"} // Ensure fallback for missing images
          alt={movie.title}
          className="rounded"
          style={{ width: "120px", height: "160px", objectFit: "cover" }}
        />
        <div className="ms-3 w-100 position-relative">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="fw-bold mb-1">{movie.title || "Untitled"}</h5>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-warning"
              style={{ fontSize: "1.2rem", cursor: "pointer" }}
              onClick={onRemove}
            />
          </div>
          <p className="text-muted small mb-1">{movie.date || "No Date Available"}</p>
          <div className="d-flex align-items-center small mb-1">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={i < movie.rating ? "text-warning" : "text-secondary"}
              />
            ))}
            <span className="ms-2 text-muted">{movie.votes || "No Votes"}</span>
          </div>
          <p
            className="text-wrap"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "0.9rem",
            }}
          >
            {movie.description || "No Description Provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardWatchList;
