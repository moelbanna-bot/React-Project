import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDZjZDQxM2MwYWI2OWE2NjNjNDIxMjIzYTBmZDhiOSIsIm5iZiI6MTc0Mjk3OTYxMC4yNTcsInN1YiI6IjY3ZTNjMjFhMTZhM2M1YzIyNGYwYTI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WE49PEPmqmvqvGjHq0fW-MV-HvzPvFzOCkCxRfjj5eE",
  },
});

api.interceptors.request.use(
  function (config) {
    console.log("Request was sent");

    // Check if the URL includes a language parameter
    if (config.url.includes("language=")) {
      // Format the language parameter according to TMDB API requirements
      // For Arabic, use 'ar-SA' instead of just 'ar'
      config.url = config.url.replace("language=ar", "language=ar-SA");

      console.log("URL with formatted language:", config.url);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    console.log("Response received");
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
