import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaginatedMovies  } from "../store/slices/moviesSlice";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar/SearchBar";
import { Loading } from "../components/loading";
import  MovieCard  from "../components/main_card"
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, currentPage, totalPages, loading, error } = useSelector(
    (state) => state.movies
  );
  const [defaultQuery] = useState("popular");

  useEffect(() => {
    dispatch(fetchPaginatedMovies({ query: defaultQuery, page: currentPage }))
  }, [dispatch, defaultQuery, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPaginatedMovies({ query: defaultQuery, page: newPage }));
  };

  if (loading)
    return (
      <>
      <Loading />
      </>
    );

  if (error) return <div className="text-center my-5 text-danger">{error}</div>;

  return (
    <>
      <div className="search-component mb-5">
        <h2 className="mt-2 mb-4">Welcome to MoviezLand</h2>
        <p className="mt-2 mb-4">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <SearchBar />
      </div>
      <h1 className="mb-4">Now Playing</h1>
      <div className="row">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} movieKey={movie.id}/>
        ))}
      </div>
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
   </>
  );
};

export default Home;
