import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, currentUser, register } from "../../services/auth.service";

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
            if(data) {
                state.username = data.username
            }
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            if(action.payload.data) {
                state.isRegisterContainer = false
                state.isLoginContainer = true
            } 
            else{
                state.isLoginContainer = false
                state.isRegisterContainer = true
            }
        })
        builder.addCase(signOut.fulfilled, (state) => {
            state.username = ''
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.username = action.payload? action.payload.username : ''
        })
    }
})

const signIn = createAsyncThunk('auth/signIn', async(userInput) => {
    const res = await login(userInput)
    return res
})

const signUp = createAsyncThunk('auth/signUp', async(userInput) => {
    const res = await register(userInput)
    return res
})

const getCurrentUser = createAsyncThunk('auth/user', async() => {
    return await currentUser()
})

const signOut = createAsyncThunk('auth/signOut', async() => {
    const res = await logout()
    return res
})

export {
    signIn,
    signOut,
    getCurrentUser,
    signUp
}