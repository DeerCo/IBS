import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '/api'
});

http.interceptors.request.use((config) => {
    let token = sessionStorage.getItem('token');
    config.headers.setAuthorization(`Bearer ${token}`);

    return config;
});

export default http;
