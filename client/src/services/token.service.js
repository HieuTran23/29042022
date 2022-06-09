const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user?.refreshToken;
}

const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user?.accessToken;
}

const updateLocalAccessToken = (accessToken) => {
    const user = JSON.parse(localStorage.getItem("user"))
    user.accessToken = accessToken
    localStorage.setItem("user", JSON.stringify(user));
}

const getLocalUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

const setLocalUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const removeLocalUser = () => {
    localStorage.removeItem("user");
};

export {
    getLocalAccessToken,
    getLocalRefreshToken,
    updateLocalAccessToken,
    getLocalUser,
    setLocalUser,
    removeLocalUser
}
