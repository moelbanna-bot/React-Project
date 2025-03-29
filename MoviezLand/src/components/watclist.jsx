import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../store/slices/moviesSlice';
import { removeFromWishlist } from '../store/slices/wishlist';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

const Watchlist = () => {
    const dispatch = useDispatch();
    const { wishlistIds } = useSelector((state) => state.wishlist);
    const { moviesById } = useSelector((state) => state.movies);
    const isLoading = useSelector((state) => state.movies.loading);

    // Fetch details for all movies in watchlist
    useEffect(() => {
        wishlistIds.forEach(id => {
            if (!moviesById[id]) {
                dispatch(fetchMovieDetails(id));
            }
        });
    }, [wishlistIds, dispatch, moviesById]);

    const handleRemoveFromWishlist = (id) => {
        dispatch(removeFromWishlist(id));
    };

    // Get movies in watchlist with full details
    const watchlistMovies = wishlistIds
        .map(id => moviesById[id])
        .filter(movie => movie); // Filter out undefined movies that might not be loaded yet

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Your Watchlist</h2>
            
            {watchlistMovies.length === 0 ? (
                <div className="text-center">
                    <p>Your watchlist is empty</p>
                    <Link to="/" className="btn btn-primary">
                        Browse Movies
                    </Link>
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {watchlistMovies.map((movie) => (
                        <Col key={movie.id}>
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        <small className="text-muted">
                                            {movie.release_date && movie.release_date.substring(0,4)}
                                        </small>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between">
                                    <Link 
                                        to={`/movie/${movie.id}`} 
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        View Details
                                    </Link>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={() => handleRemoveFromWishlist(movie.id)}
                                    >
                                        Remove
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Watchlist;