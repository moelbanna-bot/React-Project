import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import MovieDetails from "./store/movies/MovieDetails";
import MovieList from "./store/movies/MovieList.jsx";
import Home from "./pages/Home";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  </Router>
);

export default App;
