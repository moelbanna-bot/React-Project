import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDZjZDQxM2MwYWI2OWE2NjNjNDIxMjIzYTBmZDhiOSIsIm5iZiI6MTc0Mjk3OTYxMC4yNTcsInN1YiI6IjY3ZTNjMjFhMTZhM2M1YzIyNGYwYTI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WE49PEPmqmvqvGjHq0fW-MV-HvzPvFzOCkCxRfjj5eE'

    },
});

export default api;
