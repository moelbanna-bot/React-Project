import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPaginatedMovies,
  setQuery,
  resetPagination,
} from "../store/slices/moviesSlice";
import { useSearchParams, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Pagination from "./Pagination";
import MovieCard from "./main_card";
import SearchBar from "./SearchBar/SearchBar";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, currentPage, totalPages, loading, error } = useSelector(
    (state) => state.movies
  );
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const prevSearchQueryRef = useRef("");

  useEffect(() => {
    if (searchQuery) {
      // If the search query has changed, reset pagination
      if (prevSearchQueryRef.current !== searchQuery) {
        dispatch(resetPagination());
        prevSearchQueryRef.current = searchQuery;
      }

      dispatch(setQuery(searchQuery));
      dispatch(fetchPaginatedMovies({ query: searchQuery, page: currentPage }));
    }
  }, [dispatch, searchQuery, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPaginatedMovies({ query: searchQuery, page: newPage }));
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="text-center my-5 text-danger">{error}</div>;

  return (
    <Container className="my-4">
      <h2 className="mb-4">
        {movies.length > 0
          ? <SearchBar />
          : <div className="text-center fw-bold ">{`No results found for "${searchQuery}"`}</div>  }
      </h2>
      <Row className="g-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} movieKey={movie.id}/>
        ))}
      </Row>
      {movies.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </Container>
  );
};

export default MovieList;
