import axiosClient from "./axios-client";

export const signupUser = async (userData) => {
    try {
        const response = await axiosClient.post("/auth/signup", {
            name: userData.name,
            email: userData.email,
            department: userData.department,
            yearOfStudy: userData.yearOfStudy,
            password: userData.password,
        });

        if (response.data.success) {
            localStorage.setItem("ACCESS_TOKEN", response.data.token);
            return {
                success: true,
                data: response.data,
                message: response.data.message,
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Registration failed",
        };
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axiosClient.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
        });

        if (response.data.success) {
            localStorage.setItem("ACCESS_TOKEN", response.data.token);
            return {
                success: true,
                data: response.data,
                message: response.data.message,
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Login failed",
        };
    }
};
