import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to read cookies

const BASE_URL = 'http://localhost:8080';
const SOCKET_BASE_URL = 'http://localhost:8000';

// Create the axios instance for normal API requests
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create the axios instance for socketAuthApi requests
export const socketAuthApi = axios.create({
  baseURL: SOCKET_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for socketAuthApi to add the Bearer token from the cookie
socketAuthApi.interceptors.request.use(
  (config) => {
    // Get the token from the cookie
    const token = Cookies.get('accessToken');  // Replace 'authToken' with the actual cookie name

    if (token) {
      // If the token is available, add it to the Authorization header as Bearer token
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // If there's an error, return a rejected promise
    return Promise.reject(error);
  }
);
