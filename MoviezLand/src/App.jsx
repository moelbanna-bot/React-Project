import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList.jsx";
import Home from "./pages/Home";
import SearchBar from "./components/SearchBar/SearchBar";
import FavHart from "./components/favHart.jsx"; 
import PersantageCycle from "./components/persantageCycle.jsx"; 
import MovieDetails from "./pages/MovieDetails.jsx";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import WatchList from "./components/watclist.jsx";

library.add(fasStar, farStar, faStarHalfAlt)

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<MovieList />} />
      <Route path="/movie/:movieId" element={<MovieDetails />} />
      <Route path="/watchlist" element={<WatchList />} />
      
      </Routes>
  </Router>

);

export default App;
