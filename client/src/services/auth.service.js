import axios from "axios";
import { apiUrl } from "./constant";
import { resolve } from "./resolve";

const login = async (userInput) => {
    return await resolve(axios.post(`${apiUrl}/login`, userInput).then(res => {
        const { refreshToken, username} = res.data
        localStorage.setItem("user", JSON.stringify({refreshToken, username}));
        return res.data
    }));
}

const logout = () => {
    return localStorage.removeItem("user")
}

export {
    login,
    logout
}