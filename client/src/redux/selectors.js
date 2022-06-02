// import { createSelector } from "@reduxjs/toolkit";

export const loginBoxChangeStatusSelector = (state) => {
    return state.auth.isLoginContainer
};

export const registerBoxChangeStatusSelector = (state) => {
    return state.auth.isRegisterContainer
}

export const usernameSelector = (state) => {
    return state.auth.username
}