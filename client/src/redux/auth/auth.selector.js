// import { createSelector } from "@reduxjs/toolkit";

export const authContainerSelector = (state) => {
    return state.auth.authContainer
}

export const usernameSelector = (state) => {
    return state.auth.username
}
