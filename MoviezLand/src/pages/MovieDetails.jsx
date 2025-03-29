import React, { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovieDetails,
  fetchMovieRecommendations,
} from "../store/slices/moviesSlice";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { Loading } from "../components/loading";
import { useTranslation } from "../hooks/useTranslation";

const MovieCard = lazy(() => import("../components/main_card"));
const WishlistButton = lazy(() => import("../components/favHart"));

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const normalizedRating = (rating / 10) * maxStars;

  return (
    <div className="d-flex align-items-center mb-3">
      {[...Array(maxStars)].map((_, i) => {
        let icon;
        if (i < Math.floor(normalizedRating)) {
          icon = <FontAwesomeIcon icon="star" className="text-warning" />;
        } else if (i < normalizedRating) {
          icon = (
            <FontAwesomeIcon icon="star-half-alt" className="text-warning" />
          );
        } else {
          icon = <FontAwesomeIcon icon={["far", "star"]} />;
        }

        return (
          <span key={i} className="me-1">
            {icon}
          </span>
        );
      })}
      <span className="ms-2 text-muted">({rating.toFixed(1)})</span>
    </div>
  );
};

const MovieDetails = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.value);
  const languageChanged = useSelector((state) => state.language.changed);
  const { selectedMovie, recommendations, loading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieRecommendations(movieId));
  }, [dispatch, movieId, language]);
  console.log("top recommendations : ", recommendations);
  const topRecommendations = recommendations?.slice(0, 6) || [];

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  const formattedDate = selectedMovie?.release_date
    ? new Date(selectedMovie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Release date not available";

  return (
    <Container className="py-4">
      {selectedMovie && (
        <Row className="mb-5">
          <Col md={4} lg={3} className="mb-4 mb-md-0">
            <Card className="h-100">
              {selectedMovie.poster_path ? (
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="img-fluid"
                />
              ) : (
                <Card.Body
                  className="d-flex align-items-center justify-content-center"
                  style={{ minHeight: "450px" }}
                >
                  <Card.Text>{t("noImage")}</Card.Text>
                </Card.Body>
              )}
            </Card>
          </Col>

          <Col md={8} lg={9}>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <Card.Title as="h1" className="mb-2">
                  {selectedMovie.title}
                </Card.Title>
                <div
                  className="ms-3"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => (e.chiledren = <FavHart isfav={true} />)}
                >
                  <Suspense fallback={<Spinner animation="border" />}>
                    <WishlistButton
                      key={selectedMovie.id}
                      movie={selectedMovie}
                    />
                  </Suspense>
                </div>
              </div>
              <Card.Subtitle className="mb-3 text-muted">
                {t("releaseDate")}: {formattedDate}
              </Card.Subtitle>

              <StarRating rating={selectedMovie.vote_average} />

              <h5>{t("overview")}</h5>
              <Card.Text className="mb-4">{selectedMovie.overview}</Card.Text>

              {selectedMovie.genres?.length > 0 && (
                <div className="mb-4 rounded-pill bg-light p-2 d-flex flex-wrap">
                  {selectedMovie.genres.map((genre) => (
                    <Badge key={genre.id} bg="secondary" className="me-2">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="mb-4">
                <span className="mb-1 me-3 display ">
                  <strong>{t("duration")}:</strong>{" "}
                  {Math.floor(selectedMovie.runtime / 60)}h{" "}
                  {selectedMovie.runtime % 60}m
                </span>
                <span className="mb-1">
                  <strong>{t("languages")}:</strong> English
                </span>
              </div>

              <div>
                <p className="fw-bold mb-1">MARVEL STUDIOS</p>
                <Card.Link href="#" className="text-decoration-none">
                  Website 😊
                </Card.Link>
              </div>
            </Card.Body>
          </Col>
        </Row>
      )}

      {recommendations?.length > 0 && (
        <section className="mt-5">
          <h2 className="mb-4">{t("recommendations")}</h2>
          <Row xs={2} md={3} lg={6} className="g-4">
            {topRecommendations.map((movie) => (
              <Suspense
                key={movie.id}
                fallback={<Spinner animation="border" />}
              >
                <MovieCard movie={movie} />
              </Suspense>
            ))}
          </Row>
        </section>
      )}
    </Container>
  );
};

export default MovieDetails;
