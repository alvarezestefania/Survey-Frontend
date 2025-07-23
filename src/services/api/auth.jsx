import axios from "axios";


export const signup = async ({ name, email, password }) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_SURVEY_API}/auth/signup`,
            {
                name: name,
                email: email,
                password: password,
                password_confirmation: password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = response.data;

        if (data.result.status !== "success" && data.result?.status !== "success") {
            return {
                success: false,
                error: data.result?.message || "Error en el registro."
            };
        }

        return { success: true, data: data.result, message: data.result.message };

    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

export const signin = async ({ email, password }) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_SURVEY_API}/auth/signin`,
            {
                email: email,
                password: password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = response.data;

        if (data.result.status !== "success" && data.result?.status !== "success") {
            return {
                success: false,
                error: data.result?.message || "Error al iniciar sesión."
            };
        }
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

export const signout = async ({ token }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_SURVEY_API}/auth/signout`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};
