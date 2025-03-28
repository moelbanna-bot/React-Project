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
import PersantageCycle from "./persantageCycle";
import FavHart from "./favHart";

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
          ? `Search Results for "${searchQuery}"`
          : `No results found for "${searchQuery}"`}
      </h2>
      <Row className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 movie-card position-relative">
              <div
                className="position-absolute"
                style={{ top: 10, right: 10, zIndex: 1 }}
              >
                <FavHart isfav={false} />
              </div>
              <div
                className="position-absolute"
                style={{ bottom: 135, left: 10, zIndex: 1 }}
              >
                <PersantageCycle percentage={movie.vote_average * 10} />
              </div>
              <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                {movie.poster_path ? (
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div
                    className="no-image-placeholder d-flex align-items-center justify-content-center bg-light"
                    style={{ height: "300px" }}
                  >
                    <span>No Image Available</span>
                  </div>
                )}
                <Card.Body>
                  <Card.Title className="text-dark">{movie.title}</Card.Title>
                  {movie.release_date && (
                    <Card.Text className="text-muted">
                      {new Date(movie.release_date).toLocaleDateString()}
                    </Card.Text>
                  )}
                </Card.Body>
              </Link>
            </Card>
          </Col>
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
