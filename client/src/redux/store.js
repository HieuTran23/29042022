import { configureStore } from '@reduxjs/toolkit'
import { authSlice, sliderSlice, postsSlice } from './slice'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        newPosts: sliderSlice.reducer,
        posts: postsSlice.reducer
    }
})

export default store