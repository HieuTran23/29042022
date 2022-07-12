import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findPosts } from "../../services/post.service";

export default createSlice({
    name: 'posts',
    initialState: {
        homePosts: {
            posts: [
                {
                    support:{
                        image: {
                            path: ''
                        }
                    },
                    content: "Eagle blog",
                    createdAt: "",
                    isActive: true,
                    metaTitle: "Eagle blog",
                    summary: "Eagle blog",
                    title: "Eagle blog",
                    updatedAt: "",
                    userId: "Eagle blog",
                    _id: "Eagle blog",
                }
            ],
            page: 1,
            pages: 1
        }
    },
    reducers: {
        nextPage: (state) => {
            const { page, pages } = state.homePosts
            state.homePosts.page = page < pages ? page + 1 : page
        },
        prevPage: (state) => {
            const { page } = state.homePosts
            state.homePosts.page = page > 1 ? page - 1 : page
        },
        choosePage: (state, action) => {
            state.homePosts.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            const { data } = action.payload
            if(data){
                state.homePosts.posts = data.foundPosts
                state.homePosts.pages = data.pages
            }
        })
    }
})

export const getPosts = createAsyncThunk('posts/homePosts', async(page) => {
    try{
        const res = await findPosts({page: page})
        return res;
    } catch (err) {
        console.log(err)
    }
})