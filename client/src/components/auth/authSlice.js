import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../../services/auth.service";

export default createSlice({
    name: 'auth',
    initialState: {
        isLoginContainer: false,
        isRegisterContainer: false,
        username: ''
    },
    reducers: {
        loginBoxChangeStatus: (state) => {
            state.isLoginContainer = !state.isLoginContainer
        },
        registerBoxChangeStatus: (state) => {
            state.isRegisterContainer = !state.isRegisterContainer
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            const {data} = action.payload
            if(data) state.username = data.username
            state.isLoginContainer = false
        })
        builder.addCase(signOut.fulfilled, (state, action) => {
            state.username = ''
        })
    }
})

const signIn = createAsyncThunk('auth/signIn', async(userInput) => {
    const res = await login(userInput)
    return res
})

const signOut = createAsyncThunk('auth/logout', async() => {
    logout()
})

export {
    signIn,
    signOut
}