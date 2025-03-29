import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import EmptyList from './EmptyList';
import { Loading } from '../components/loading';

const Watchlist = () => {
    const isLoading = useSelector((state) => state.movies.loading);

    const watchlistMovies = useSelector((state)=> state.wishlist.wishlistIds)

    if (isLoading) {
    return (
            <>
            <Loading />
            </>
        );
    }
    return (
        <Container className="mt-5">
            <h2 className="mb-4">Your Watchlist</h2>
            {watchlistMovies.length === 0 ? (
                <EmptyList />
            ) : (
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {watchlistMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Watchlist;
