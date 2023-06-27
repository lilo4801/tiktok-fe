import axios from 'axios';
import queryString from 'query-string';

const getToken = async () => {
    const hasToken = localStorage.getItem('token');

    if (!hasToken) {
        return null;
    }

    return hasToken;
};

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        console.log(error.response.data);
        throw new Error(error);
    },
);
export default axiosClient;
