import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8000/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Debug logging
    console.log("Axios request config:", {
        method: config.method,
        url: config.url,
        headers: config.headers,
    });
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("Axios error:", {
            method: error.config?.method,
            url: error.config?.url,
            status: error.response?.status,
        });

        const { response } = error;
        if (response?.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
            window.location.href = "/login";
        }
        throw error;
    }
);

export default axiosClient;
