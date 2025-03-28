
import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import FavHart from "./components/favHart.jsx"; 
import PersantageCycle from "./components/persantageCycle.jsx"; 
import MovieDetails from "./pages/MovieDetails.jsx";
import MovieList from "./store/movies/MovieList.jsx";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

library.add(fasStar, farStar, faStarHalfAlt)

const App = () => (
  // const [count, setCount] = useState(0);
  // <MovieProvider>
  //     <Navbar />
  //     <SearchBar />
  //     <FavHart isfav={false}/>
  //     <PersantageCycle percentage={40}/>
  //     <SearchedMovieList />
  // </MovieProvider>
  // <>
  //   {/* <Navbar />
  //   <SearchBar />
  //   <MovieList /> */}
  //   {/* <MovieDetails movieId={11}/> */}
  // </>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
    </Router>
);

export default App;


