import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import PersantageCycle from "./persantageCycle";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, toggleWishlist, isInWishlist }) => {
  return (
    <div className="col-xl-2 col-md-4 col-sm-6 p-2 mb-4" style={{ maxHeight: "500px" }}>
      <div className="card h-100 border-0">
        <div className="position-relative">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            className="card-img-top rounded-4 img-fluid shadow"
            style={{ height: "400px", objectFit: "cover" }}
            alt={movie.title}
          />
          </Link>
          <div className="position-absolute" style={{ bottom: "-15px", left: "10px" }}>
            <PersantageCycle percentage={Math.floor(movie.popularity)} />
          </div>
        </div>
        <div className="row mt-3 p-2">
          <div className="text-start col-10">
            <h5 className="card-title fw-bold">{movie.title}</h5>
            <p className="card-text">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            onClick={() => toggleWishlist(movie)}
            style={{ cursor: "pointer", fontSize: "1.5rem", color: isInWishlist ? "#f4d03f" : "gray" }}
            className="col-2"
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
