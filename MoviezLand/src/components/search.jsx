import { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";
import MovieCard from "./MovieCard";

const SearchedMovieList = () => {
  const { movies, searchMoviesByName, error } = useMovies();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger initial movie fetch
    searchMoviesByName('');
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setLoading(true);
    searchMoviesByName(query);
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search for a movie..."
      />
      <h1>Now Playing</h1>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchedMovieList;
