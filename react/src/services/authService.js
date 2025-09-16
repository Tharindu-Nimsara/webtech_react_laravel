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
        } else {
            // Handle case when success is false
            return {
                success: false,
                error: response.data.message || "Registration failed",
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
        } else {
            // Handle case when success is false
            return {
                success: false,
                error: response.data.message || "Login failed",
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Login failed",
        };
    }
};

export const updateProfile = async (profileData) => {
    try {
        console.log("Sending profile update request...");

        // Use POST with _method=PUT for FormData compatibility
        const response = await axiosClient.post("/profile", profileData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Profile update response:", response);

        // Check if response indicates success
        if (response.data && response.data.success) {
            return {
                success: true,
                data: response.data,
                message:
                    response.data.message || "Profile updated successfully",
            };
        } else {
            // Handle case when success is false or missing
            return {
                success: false,
                error:
                    response.data?.message ||
                    response.data?.error ||
                    "Profile update failed",
            };
        }
    } catch (error) {
        console.error("Full error details:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);

        // Return error object instead of undefined
        return {
            success: false,
            error:
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Profile update failed",
        };
    }
};
