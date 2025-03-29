import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: import.meta.env.VITE_ENV_KEY,
  },
});

api.interceptors.request.use(
  function (config) {
    console.log("Request was sent");

    if (config.url.includes("language=")) {
      config.url = config.url.replace("language=ar", "language=ar-SA");
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
