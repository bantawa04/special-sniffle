import axios, {AxiosInstance, AxiosResponse} from 'axios';

const punkApiBaseUrl:string = 'https://api.punkapi.com/v2';

const API:AxiosInstance = axios.create({
    baseURL: punkApiBaseUrl,
});

API.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response:AxiosResponse) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
