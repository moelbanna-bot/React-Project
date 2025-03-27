import React from 'react';
import { MovieProvider } from './context/MovieContext';
import Home from './components/home';
import SearchedMovieList from './components/search';

const App = () => (
  <MovieProvider>
    <SearchedMovieList />
  </MovieProvider>
);

export default App;
