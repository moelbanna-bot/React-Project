import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',//process.env.REACT_APP_API_BASE_URL,
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDZjZDQxM2MwYWI2OWE2NjNjNDIxMjIzYTBmZDhiOSIsIm5iZiI6MTc0Mjk3OTYxMC4yNTcsInN1YiI6IjY3ZTNjMjFhMTZhM2M1YzIyNGYwYTI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WE49PEPmqmvqvGjHq0fW-MV-HvzPvFzOCkCxRfjj5eE'  
        //  Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
  });  

export const getMovieDetails = (id,lang='en') => api.get(`/movie/${id}?language=${lang}`);
export const searchMovies = (query,lang='en') => api.get(`/search/movie?query=${query}&language=${lang}`);
export const getNowPlaying = (lang='en') => api.get(`/movie/now_playing?language=${lang}`);
export const getNowPlayingPages = (lang='en') => api.get(`/movie/popular?page=${pageNume}&language=${lang}`);

// Add more functions as needed
export default api;
