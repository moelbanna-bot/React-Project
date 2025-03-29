import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaginatedMovies } from "../store/slices/moviesSlice";
import { Loading } from "../components/loading";
import { useTranslation } from "../hooks/useTranslation";
import { Spinner } from "react-bootstrap";
import "./Home.css";

const Pagination = lazy(() => import("../components/Pagination"));
const SearchBar = lazy(() => import("../components/SearchBar/SearchBar"));
const MovieCard = lazy(() => import("../components/main_card"));

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { movies, currentPage, totalPages, loading, error } = useSelector(
    (state) => state.movies
  );
  const [defaultQuery] = useState("popular");

  useEffect(() => {
    dispatch(fetchPaginatedMovies({ query: defaultQuery, page: currentPage }));
  }, [dispatch, defaultQuery, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPaginatedMovies({ query: defaultQuery, page: newPage }));
  };

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  if (error) return <div className="text-center my-5 text-danger">{error}</div>;

  return (
    <div className="px-5">
      <div className="search-component mt-4 mb-5">
        <h2 className="mt-2 mb-4">
          {t("welcome")} {t("title")}
        </h2>
        <p className="mt-2 mb-4">{t("millions")}</p>
        <Suspense
          fallback={
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          }
        >
          <SearchBar />
        </Suspense>
      </div>
      <h1 className="mb-4">{t("trending")}</h1>
      <div className="row">
        {movies.map((movie) => (
          <Suspense
            key={movie.id}
            fallback={
              <div className="col-md-3 col-sm-6 mb-4">
                <Spinner animation="border" />
              </div>
            }
          >
            <MovieCard movie={movie} movieKey={movie.id} />
          </Suspense>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Suspense fallback={<Spinner animation="border" />}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
