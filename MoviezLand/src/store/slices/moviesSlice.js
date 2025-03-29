import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch paginated movies
export const fetchPaginatedMovies = createAsyncThunk(
    'movies/fetchPaginatedMovies',
    async ({ query, page }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/search/movie?query=${query}&page=${page}`);
            return {
                movies: response.data.results,
                totalPages: response.data.total_pages,
                currentPage: response.data.page,
            };
        } catch (err) {
            return rejectWithValue('Failed to fetch paginated movies');
        }
    }
);

// Fetch movie details
export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/movie/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue('Failed to fetch movie details');
        }
    }
);

export const fetchMovieRecommendations = createAsyncThunk(
    'movies/fetchMovieRecommendations',
    async(id,{rejectWithValue})=>{
        try{
            const response = await api.get(`/movie/${id}/recommendations`);
            return response.data.results;
        }catch(err){
            return rejectWithValue('Failed to fetch movie recommendations');
        }

    }
);

// Slice Definition
const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        watchlistIds: [], // Initialize watchlistIds as an empty array
        movies: [],
        moviesById: {}, // Store all movies by their ID
        movieIds: [], // Store the list of IDs to display        totalPages: 0,
        currentPage: 1,
        selectedMovie: null,
        recommendations: [],
        query: '',
        error: null,
        loading: false,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        resetPagination: (state) => {
            state.currentPage = 1;
          },        
        
    },
    // In your extraReducers:
extraReducers: (builder) => {
    builder
        .addCase(fetchPaginatedMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPaginatedMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload.movies;
            state.movieIds = action.payload.movies.map(movie => movie.id); // Store IDs
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
        })
        .addCase(fetchPaginatedMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchMovieDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedMovie = action.payload;
            state.moviesById[action.payload.id] = action.payload; // Store in moviesById
        })
        .addCase(fetchMovieDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchMovieRecommendations.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMovieRecommendations.fulfilled, (state, action) => {
            state.loading = false;
            state.recommendations = action.payload;
        })
        .addCase(fetchMovieRecommendations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setQuery,resetPagination ,addToWatchlist,removeFromWatchlist} = moviesSlice.actions;
export default moviesSlice.reducer;
