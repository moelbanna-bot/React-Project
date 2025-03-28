import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaginatedMovies } from "../store/movies/moviesSlice";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import PersantageCycle from "../components/persantageCycle";
import FavHart from "../components/favHart";
import SearchBar from "../components/SearchBar/SearchBar";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, currentPage, totalPages, loading, error } = useSelector(
    (state) => state.movies
  );
  const [defaultQuery] = useState("popular");

  useEffect(() => {
    dispatch(fetchPaginatedMovies({ query: defaultQuery, page: currentPage }));
  }, [dispatch, defaultQuery, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPaginatedMovies({ query: defaultQuery, page: newPage }));
  };

  if (loading)
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
    );

  if (error) return <div className="text-center my-5 text-danger">{error}</div>;

  return (
    <Container className="my-4">
      <div className="search-component mb-5">
        <h2 className="mt-2 mb-4">Welcome to MoviezLand</h2>
        <p className="mt-2 mb-4">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <SearchBar />
      </div>
      <h1 className="mb-4">Now Playing</h1>
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
                  <Card.Text className="text-muted">
                    {movie.release_date &&
                      new Date(movie.release_date).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

export default Home;
