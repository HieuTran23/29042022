import axios from "axios";
import { apiUrl } from "./constant";
import { resolve } from "./resolve";
import { getLocalRefreshToken, getLocalUser, removeLocalUser, setLocalUser } from "./token.service";

const login = async (userInput) => {
    return await resolve(axios.post(`${apiUrl}/login`, userInput).then(res => {
        setLocalUser(res.data)
        return res.data
    }));
}

const register = async (userInput) => {
    return await resolve (axios.post(`${apiUrl}/register`, userInput).then(res => {
        setLocalUser(res.data)
        return res.data
    }))
}

const logout = async () => {
    const refreshToken = getLocalRefreshToken()
    return await resolve(axios.delete(`${apiUrl}/logout`, {data: {refreshToken: refreshToken}}).then(res => {
        removeLocalUser()
        return res.data
    }))
}

const currentUser = () => {
    return getLocalUser()
}

export {
    login,
    logout,
    register,
    currentUser
}