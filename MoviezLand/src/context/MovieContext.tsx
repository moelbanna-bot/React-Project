import React, { createContext, useContext, useState } from 'react';
import { getNowPlaying, getMovieDetails, searchMovies ,getNowPlayingPages } from '../services/movie.service';

const MovieContext = createContext({
  movies: [],
  selectedMovie: null,
  error: '',
  fetchNowPlaying: () => {},        // Default no-op function
  fetchMovieDetails: (id) => {},    // Default no-op function
  searchMoviesByName: (query) => {}, // Default no-op function
    fetchNowPlayingPages: (page) => {} // Default no-op function
});

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState('');

  const fetchNowPlaying = async () => {
    try {
      const response = await getNowPlaying();
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch now-playing movies');
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const response = await getMovieDetails(id);
      setSelectedMovie(response.data);
    } catch (err) {
      setError('Failed to fetch movie details');
    }
  };

  const searchMoviesByName = async (query) => {
    try {
      const response = await searchMovies(query);
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch movies by name');
    }
  };
  const fetchNowPlayingPages = async (page) => {
    try {
      const response = await getNowPlayingPages(page);
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch now-playing movies');
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        selectedMovie,
        error,
        fetchNowPlaying,
        fetchMovieDetails,
        searchMoviesByName,
        fetchNowPlayingPages 
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
