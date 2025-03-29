import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPaginatedMovies, setQuery } from '../store/slices/moviesSlice';

const MovieList = () => {
    const dispatch = useDispatch();
    const { movies, currentPage, totalPages, query, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        if (query) {
            dispatch(fetchPaginatedMovies({ query, page: currentPage }));
        }
    }, [dispatch, query, currentPage]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            dispatch(setQuery(e.target.value));
        }
    };

    const handlePageChange = (newPage) => {
        dispatch(fetchPaginatedMovies({ query, page: newPage }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Movie Search</h1>
            <input
                type="text"
                placeholder="Search for movies..."
                onKeyDown={handleSearch}
            />
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                        {movie.poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                        ) : (
                            <p>No image available</p>
                        )}
                    </li>
                ))}
            </ul>
            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MovieList;
