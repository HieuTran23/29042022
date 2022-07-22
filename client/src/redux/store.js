import { configureStore } from '@reduxjs/toolkit'
import { authSlice, sliderSlice, postsSlice, sidebarSlice } from './slice'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        newPosts: sliderSlice.reducer,
        posts: postsSlice.reducer,
        sidebar: sidebarSlice.reducer
    }
})

export default store