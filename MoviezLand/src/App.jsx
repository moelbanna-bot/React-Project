import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar as fasStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { resetLanguageChanged } from "./store/slices/language";
import { fetchPaginatedMovies } from "./store/slices/moviesSlice";
import { Loading } from "./components/loading";

const Home = lazy(() => import("./pages/Home"));
const MovieList = lazy(() => import("./components/MovieList"));
const MovieDetails = lazy(() => import("./pages/MovieDetails.jsx"));
const WatchList = lazy(() => import("./pages/watclist.jsx"));

library.add(fasStar, farStar, faStarHalfAlt);

const RouteDataReloader = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { value: language, changed } = useSelector((state) => state.language);
  const { currentPage } = useSelector((state) => state.movies);

  useEffect(() => {
    if (changed) {
      if (location.pathname === "/") {
        dispatch(fetchPaginatedMovies({ query: "popular", page: currentPage }));
      }
      dispatch(resetLanguageChanged());
    }
  }, [changed, dispatch, location.pathname, currentPage]);

  return children;
};

const App = () => {
  const currentLanguage = useSelector((state) => state.language.value);

  useEffect(() => {
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <Router>
      <RouteDataReloader>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<MovieList />} />
            <Route path="/movie/:movieId" element={<MovieDetails />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Routes>
        </Suspense>
      </RouteDataReloader>
    </Router>
  );
};

export default App;
