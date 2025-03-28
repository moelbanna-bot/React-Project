import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../store/slices/moviesSlice";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import PersantageCycle from "./persantageCycle";
import FavHart from "./favHart";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMovie, loading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="text-center my-5 text-danger">{error}</div>;
  if (!selectedMovie)
    return <div className="text-center my-5">Movie not found</div>;

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    genres,
    runtime,
    tagline,
    production_companies,
  } = selectedMovie;

  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : null;

  return (
    <>
      {backdropUrl && (
        <div
          className="movie-backdrop"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backdropUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
            padding: "40px 0",
          }}
        >
          <MovieDetailsContent movie={selectedMovie} />
        </div>
      )}

      {!backdropUrl && <MovieDetailsContent movie={selectedMovie} />}
    </>
  );
};

const MovieDetailsContent = ({ movie }) => {
  const {
    title,
    overview,
    poster_path,
    release_date,
    vote_average,
    genres,
    runtime,
    tagline,
  } = movie;

  return (
    <Container className="py-5">
      <Row>
        <Col md={4} className="position-relative">
          {poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              fluid
              className="rounded shadow"
            />
          ) : (
            <div
              className="no-image-placeholder bg-secondary d-flex align-items-center justify-content-center rounded"
              style={{ height: "450px" }}
            >
              <span className="text-white">No Image Available</span>
            </div>
          )}
          <div className="position-absolute" style={{ top: 10, right: 10 }}>
            <FavHart isfav={false} />
          </div>
          <div className="position-absolute" style={{ bottom: 10, left: 10 }}>
            <PersantageCycle percentage={vote_average * 10} />
          </div>
        </Col>
        <Col md={8}>
          <h1 className="mb-2">{title}</h1>
          {tagline && <p className="text-muted fs-5 mb-4">"{tagline}"</p>}

          <div className="mb-4">
            {release_date && (
              <span className="me-3">
                {new Date(release_date).getFullYear()}
              </span>
            )}
            {runtime && (
              <span className="me-3">
                {Math.floor(runtime / 60)}h {runtime % 60}m
              </span>
            )}
          </div>

          <div className="mb-4">
            {genres &&
              genres.map((genre) => (
                <Badge key={genre.id} bg="secondary" className="me-2 mb-2">
                  {genre.name}
                </Badge>
              ))}
          </div>

          <h4>Overview</h4>
          <p className="lead mb-4">{overview || "No overview available."}</p>

          {release_date && (
            <p>
              <strong>Release Date:</strong>{" "}
              {new Date(release_date).toLocaleDateString()}
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
