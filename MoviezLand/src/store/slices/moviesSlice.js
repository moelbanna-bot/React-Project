import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch paginated movies
export const fetchPaginatedMovies = createAsyncThunk(
  "movies/fetchPaginatedMovies",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      // Check if the query is 'popular' to fetch popular movies
      if (query === "popular") {
        const response = await api.get(`/movie/popular?page=${page}`);
        return {
          movies: response.data.results,
          totalPages: response.data.total_pages,
          currentPage: response.data.page,
        };
      } else {
        const response = await api.get(
          `/search/movie?query=${query}&page=${page}`
        );
        return {
          movies: response.data.results,
          totalPages: response.data.total_pages,
          currentPage: response.data.page,
        };
      }
    } catch (err) {
      return rejectWithValue("Failed to fetch movies");
    }
  }
);

// Fetch movie details
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/movie/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch movie details");
    }
  }
);

// Slice Definition
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    totalPages: 0,
    currentPage: 1,
    selectedMovie: null,
    query: "",
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
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
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuery, resetPagination } = moviesSlice.actions;
export default moviesSlice.reducer;
