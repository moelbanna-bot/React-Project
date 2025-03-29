import React from "react";
import PersantageCycle from "./persantageCycle";
import { Link } from "react-router-dom";
import WishlistButton from "./favHart";

const MovieCard = ({ movie }) => {
  return (
    <div
      className="col-xl-2 col-md-4 col-sm-6 p-2 mb-4"
      style={{ maxHeight: "500px" }}
    >
      <div className="card h-100 border-0">
        <div className="position-relative">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  : movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://placehold.co/500x750?text=No+Image"
              }
              className="card-img-top rounded-4 img-fluid shadow"
              style={{ height: "400px", objectFit: "cover", maxWidth: "100%" }}
              alt={movie.title}
            />
          </Link>
          <div
            className="position-absolute"
            style={{ bottom: "-15px", left: "10px" }}
          >
            <PersantageCycle percentage={Math.floor(movie.vote_average * 10)} />
          </div>
        </div>
        <div className="row g-0 mt-3 p-2">
          <div className="text-start col-10">
            <h5 className="card-title fw-bold" style={{ fontSize: "1rem" }}>
              {movie.title}
            </h5>
            <p className="card-text">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="col-2">
            <WishlistButton key={movie.id} movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
