import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardDetails from "./components/CardDetails";
import LanguageDisplay from "./components/LanguageDisplay";
import LangChoice from "./components/LangChoice";
import { useTranslation } from "./context/LangContext";
import "./App.css";
import WatchList from "./pages/WatchList";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import FavHart from "./components/favHart.jsx"; 
import PersantageCycle from "./components/persantageCycle.jsx"; 
import MovieDetails from "./store/movies/MovieDetails";
import MovieList from "./store/movies/MovieList.jsx";
import EmptyList from "./pages/EmptyList.jsx"

const App = () => {
  const { lang, text, status, updateLanguage } = useTranslation("en");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WatchList />} />
          <Route path="/language" element={<LangChoice />} />
          <Route path="/display" element={<LanguageDisplay />} />
          <Route path="/details" element={<CardDetails />} />
          <Route path="/movie-details/:id" element={<MovieDetails />} />
          <Route path="/empty-list" element={<EmptyList/>} />
        </Routes>
      </Router>
    </div>
  );
};


export default App;


