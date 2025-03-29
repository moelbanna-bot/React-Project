import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../store/slices/moviesSlice';
import { useParams } from 'react-router-dom';


const MovieDetails = ({ movieId }) => {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const { selectedMovie, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        if (id) {
            dispatch(fetchMovieDetails(id)); 
        }
    }, [dispatch, id]);

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
