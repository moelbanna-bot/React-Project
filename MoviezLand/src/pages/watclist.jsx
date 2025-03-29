import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Spinner } from "react-bootstrap";
import { Loading } from "../components/loading";
import { useTranslation } from "../hooks/useTranslation";
import "./watchlist.css";

const MovieCard = lazy(() => import("../components/MovieCard"));
const EmptyList = lazy(() => import("./EmptyList"));

const Watchlist = () => {
  const isLoading = useSelector((state) => state.movies.loading);
  const { t } = useTranslation();
  const watchlistMovies = useSelector((state) => state.wishlist.wishlistIds);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <Container className="watchlist-container mt-4 px-2 px-sm-4">
      <h2 className="mb-4">{t("yourWatchlist")}</h2>
      {watchlistMovies.length === 0 ? (
        <Suspense
          fallback={
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          }
        >
          <EmptyList />
        </Suspense>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
          {watchlistMovies.map((movie) => (
            <Suspense
              key={movie.id}
              fallback={
                <div className="col mb-4">
                  <Spinner animation="border" />
                </div>
              }
            >
              <MovieCard movie={movie} />
            </Suspense>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Watchlist;
