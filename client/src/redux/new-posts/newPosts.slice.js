import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findNewestPosts } from "../../services/post.service";

export default createSlice({
    name: 'newPosts',
    initialState: {
        postSlides: {
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
                    category: {
                        _id: "Eagle blog",
                        name: "Eagle blog",
                    },
                    subCategory: {
                        _id: "Eagle blog",
                        subName: "Eagle blog",
                    },
                    tags: [{
                        _id: "Eagle blog",
                        name: "Eagle blog",
                    }]
                }
            ],
            slideIndex: 0
        }
    },
    reducers: {
        nextSlide: (state) => {
            const {posts, slideIndex} = state.postSlides
            state.postSlides.slideIndex = (slideIndex + 1) % posts.length
        },
        prevSlide: (state) => {
            const {posts, slideIndex} = state.postSlides
            state.postSlides.slideIndex = slideIndex === 0 ? posts.length - 1 : slideIndex - 1
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            const {data} = action.payload
            if(data) {
                state.postSlides.posts = data.foundPosts
            }
        })
    }
})

export const getPosts = createAsyncThunk('newPosts/postSlides', async() => {
    const res = await findNewestPosts()
    return res
})
