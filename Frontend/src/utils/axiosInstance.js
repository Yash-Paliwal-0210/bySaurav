// src/api/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/', // Replace with your Django API URL
    timeout: 10000, // Increase timeout to 10 seconds (10000ms)
    headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;
