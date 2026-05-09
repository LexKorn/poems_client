import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// @ts-ignore
const authInterception = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterception);

export {
    $host,
    $authHost
};

// REACT_APP_API_URL='http://localhost:5000/'
// REACT_APP_API_URL='https://authors.kornlex.ru/'