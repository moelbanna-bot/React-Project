import React, { useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieCard from './MovieCard';

const Home = () => {
  const { movies, fetchNowPlaying, error } = useMovies();

  useEffect(() => {
    fetchNowPlaying();
  }, [fetchNowPlaying]);

  if (error) return <p>{error}</p>;
  if (movies.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <h1>Now Playing</h1>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
