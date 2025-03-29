import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails, fetchMovieRecommendations } from '../store/slices/moviesSlice';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import FavHart from '../components/favHart';
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
          icon = <FontAwesomeIcon icon="star-half-alt" className="text-warning" />;
        } else {
          icon = <FontAwesomeIcon icon={['far', 'star']} />;
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
    const { selectedMovie, recommendations, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchMovieDetails(movieId));
        dispatch(fetchMovieRecommendations(movieId));
    }, [dispatch, movieId]);
    
    const topRecommendations = recommendations?.slice(0, 6) || [];

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );
    
    if (error) return (
        <Container className="mt-4">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );
    
    const formattedDate = selectedMovie?.release_date ? new Date(selectedMovie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }) : 'Release date not available';

    return (
        <Container className="py-4">
            {/* Main Movie Details */}
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
                                <Card.Body className="d-flex align-items-center justify-content-center" style={{ minHeight: '450px' }}>
                                    <Card.Text>No poster available</Card.Text>
                                </Card.Body>
                            )}
                        </Card>
                    </Col>
                    
                    <Col md={8} lg={9}>
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <Card.Title as="h1" className="mb-2">{selectedMovie.title}</Card.Title>
                                <div className="ms-3" style={{ cursor: 'pointer' }} onClick={(e) => e.chiledren = <FavHart isfav={true} />}>
                                    <FavHart isfav={false} />
                                </div>
                            </div>
                            <Card.Subtitle className="mb-3 text-muted">{formattedDate}</Card.Subtitle>
                            
                            <StarRating rating={selectedMovie.vote_average} />
                            
                            <Card.Text className="mb-4">{selectedMovie.overview}</Card.Text>
                            
                            {/* Genres */}
                            {selectedMovie.genres?.length > 0 && (
                                <div className="mb-4 rounded-pill bg-light p-2 d-flex flex-wrap">
                                    {selectedMovie.genres.map(genre => (
                                        <Badge key={genre.id} bg="secondary" className="me-2">
                                            {genre.name}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            
                            {/* Additional Info */}
                            <div className="mb-4">
                                <span className="mb-1 me-3 display "><strong>Duration:</strong> {Math.floor(selectedMovie.runtime / 60)}h {selectedMovie.runtime % 60}m</span>
                                <span className="mb-1"><strong>Languages:</strong> English</span>
                            </div>
                            
                            <div>
                                <p className="fw-bold mb-1">MARVEL STUDIOS</p>
                                <Card.Link href="#" className="text-decoration-none">Website 😊</Card.Link>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            )}

            {/* Recommendations Section */}
            {recommendations?.length > 0 && (
                <section className="mt-5">
                    <h2 className="mb-4">Recommendations</h2>
                    <Row xs={2} md={3} lg={6} className="g-4">
                        {topRecommendations.map((movie) => (
                            <Col key={movie.id}>
                                <Link to={`/movie/${movie.id}`} className="text-decoration-none text-dark">
                                    <Card className="h-100 border-0 shadow-sm hover-shadow transition">
                                        {movie.poster_path ? (
                                            <Card.Img 
                                                variant="top"
                                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                                                alt={movie.title}
                                                className="img-fluid"
                                            />
                                        ) : (
                                            <Card.Body className="d-flex align-items-center justify-content-center" style={{ minHeight: '225px' }}>
                                                <Card.Text>No poster</Card.Text>
                                            </Card.Body>
                                        )}
                                        <Card.Body>
                                            <Card.Title as="h3" className="h6 mb-1 text-truncate">{movie.title}</Card.Title>
                                            <Card.Text className="small text-muted">
                                                {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                }) : ''}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </section>
            )}
        </Container>
    );
};

export default MovieDetails;