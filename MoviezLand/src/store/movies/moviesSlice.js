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

// Slice Definition
const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        totalPages: 0,
        currentPage: 1,
        selectedMovie: null,
        query: '',
        error: null,
        loading: false,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPaginatedMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.movies;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchPaginatedMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.selectedMovie = action.payload;
            });
    },
});

export const { setQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
