import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlist";
import { Loading } from "./loading";
import MovieCard from "./movieCard";
import { fetchPaginatedMovies , fetchAllMoviesByPage } from "../store/slices/moviesSlice"; 


const Pgination = () => {

  const dispatch = useDispatch();
  const { movies, totalPages, currentPage, loading, error } = useSelector((state) => state.movies);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  
  const query = "";
  useEffect(() => {
    dispatch(fetchAllMoviesByPage(currentPage)).then((response) => {
      console.log("Fetched movies response:", response);
      console.log("Type of page:", typeof page);
      console.log(currentPage);
    });
  }, [dispatch, currentPage, query]);

  const toggleWishlist = (movie) => {
    if (wishlist.some((item) => item.id === movie.id)) {
      dispatch(removeFromWishlist(movie));
    } else {
      dispatch(addToWishlist(movie));
    }
  };
  return (
    <div className="text-center">
      <h2 className="fw-bold" style={{ color: "#2c3e50" }}>Movies List</h2>
      <hr />
      {loading && <Loading />}
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            toggleWishlist={toggleWishlist}
            isInWishlist={wishlist.some((m) => m.id === movie.id)}
          />
        ))}
      </div>
      <hr />
      <div className="text-center d-flex justify-content-around align-items-center">
        <button
          className="btn btn-sm fw-bold"
          onClick={() => dispatch(fetchPaginatedMovies({ query, page: Math.max(currentPage - 1, 1) }))}
          disabled={currentPage === 1}
          style={{ color: "white", background: "#2c3e50" }}
        >
          <ChevronLeft size={50} /> Previous
        </button>
        
        <span className="fw-bold" style={{ letterSpacing: "3px" }}>Page Number: {currentPage}</span>
        
        <button
          className="btn btn-sm fw-bold"
          onClick={() => dispatch(fetchPaginatedMovies({ query, page: currentPage + 1 }))}
          style={{ color: "white", background: "#2c3e50" }}
        >
          Next <ChevronRight size={50} />
        </button>
      </div>
    </div>
  );
};

export default Pgination;
