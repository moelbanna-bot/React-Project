import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies/moviesSlice';
import watchlistReducer from './movies/watchlist'; 

export const store = configureStore({
    reducer: {
        wishlist: watchlistReducer,
        movies: moviesReducer,
    },
});
