
import React from 'react';
import { MovieProvider } from './context/MovieContext';
import Home from './components/home';
import SearchedMovieList from './components/search';
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import FavHart from "./components/favHart.jsx"; 
import PersantageCycle from "./components/persantageCycle.jsx"; 

const App = () => (
    const [count, setCount] = useState(0);
  <MovieProvider>
      <Navbar />
      <SearchBar />
      <FavHart isfav={false}/>
      <PersantageCycle percentage={40}/>
      <SearchedMovieList />
  </MovieProvider>
);

export default App;
