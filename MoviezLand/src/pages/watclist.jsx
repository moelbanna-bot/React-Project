import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../store/slices/moviesSlice';
import { removeFromWishlist } from '../store/slices/wishlist';
import { Container, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import EmptyList from './EmptyList';

const Watchlist = () => {
    const dispatch = useDispatch();
    const { wishlistIds } = useSelector((state) => state.wishlist);
    const { moviesById } = useSelector((state) => state.movies);
    const isLoading = useSelector((state) => state.movies.loading);

    useEffect(() => {
        wishlistIds.forEach((id) => {
            if (!moviesById[id]) {
                dispatch(fetchMovieDetails(id));
            }
        });
    }, [wishlistIds, dispatch, moviesById]);

    const handleRemoveFromWishlist = (id) => {
        dispatch(removeFromWishlist(id));
    };

    const watchlistMovies = wishlistIds
        .map((id) => moviesById[id])
        .filter((movie) => movie);

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Your Watchlist</h2>

            {watchlistMovies.length === 0 ? (
                <EmptyList />
            ) : (
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {watchlistMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onRemove={handleRemoveFromWishlist}
                        />
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Watchlist;
