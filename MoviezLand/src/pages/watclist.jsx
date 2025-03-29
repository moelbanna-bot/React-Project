import React, { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Spinner } from "react-bootstrap";
import { Loading } from "../components/loading";
import { useTranslation } from "../hooks/useTranslation";

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
    <Container className="mt-5">
      <h2 className="mb-5">{t("yourWatchlist")}</h2>
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
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {watchlistMovies.map((movie) => (
            <Suspense
              key={movie.id}
              fallback={
                <div className="mb-4">
                  <Spinner animation="border" />
                </div>
              }
            >
              <MovieCard movie={movie} />
            </Suspense>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Watchlist;
