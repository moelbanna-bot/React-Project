import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from './moviesSlice';

const MovieDetails = ({ movieId }) => {
    const dispatch = useDispatch();
    const { selectedMovie, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchMovieDetails(movieId));
    }, [dispatch, movieId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {selectedMovie && (
                <>
                    <h2>{selectedMovie.title}</h2>
                    <p>{selectedMovie.overview}</p>
                    {selectedMovie.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                    )}
                </>
            )}
        </div>
    );
};

export default MovieDetails;
