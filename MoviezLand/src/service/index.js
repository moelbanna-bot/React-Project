import axios from "axios";
export const instance = axios.create({
    baseURL: 'https://dummyjson.com',
});

instance.interceptors.request.use(
    function (config){
        console.log('Request was sent');
        return config;
    },
    function (error){

        return Promise.reject(error);
    }
)
instance.interceptors.response.use(
    function (response){
        console.log('Response received');
        return response;
    },
    function (error){
        return Promise.reject(error);
    }
)