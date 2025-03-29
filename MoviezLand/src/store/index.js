import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlist";
import languageReducer from "./slices/language";
import moviesReducer from './slices/moviesSlice';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    language: languageReducer,
    movies: moviesReducer,
  },
});

export default store;

