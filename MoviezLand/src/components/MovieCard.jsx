import React from 'react';

const MovieCard = ({ movie }) => (
  <div>
    <h2>{movie.title}</h2>
    <p>{movie.overview}</p>
    <p>Release Date: {movie.release_date}</p>
  </div>
);

export default MovieCard;
