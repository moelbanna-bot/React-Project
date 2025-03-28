import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice'; 
import watchlistReducer from './watchlist';  

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        watchlist: watchlistReducer,  
    },
});

export default store;
