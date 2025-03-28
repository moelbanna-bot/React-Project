import React from "react";
import { MovieProvider } from "./context/MovieContext";
import Home from "./components/home";
import SearchedMovieList from "./components/search";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import FavHart from "./components/favHart.jsx";
import PersantageCycle from "./components/persantageCycle.jsx";
import FavHart from "./components/favHart.jsx"; 
import PersantageCycle from "./components/persantageCycle.jsx"; 
import MovieDetails from "./store/movies/MovieDetails";
import MovieList from "./store/movies/MovieList.jsx";


const App = () => (
  <MovieProvider>
    <Navbar />
    <SearchBar />
    <FavHart isfav={false} />
    <PersantageCycle percentage={40} />
    <SearchedMovieList />
  </MovieProvider>
  // const [count, setCount] = useState(0);
  // <MovieProvider>
  //     <Navbar />
  //     <SearchBar />
  //     <FavHart isfav={false}/>
  //     <PersantageCycle percentage={40}/>
  //     <SearchedMovieList />
  // </MovieProvider>
  <>
    <Navbar />
    <SearchBar />
    <MovieList />
    {/* <MovieDetails movieId={11}/> */}
  </>

);

export default App;


