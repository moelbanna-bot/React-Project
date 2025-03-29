import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import wishlistSlice from "./slices/wishlist";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    wishlist: wishlistSlice,
  },
});
