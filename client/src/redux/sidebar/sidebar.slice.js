import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findArchivesWithPostsNumber } from "../../services/archives-service";
import { findCategoriesWithPostsNumber } from "../../services/category.service";
import { findTagsWithPostsNumber } from "../../services/tag.service";

export default createSlice({
    name: 'sidebar',
    initialState: {
        categories: [],
        tags: [],
        archives: []
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoriesWithPostsNumber.fulfilled, (state, action) => {
            const { data } = action.payload
            if(data){
                state.categories = [...data.foundCategories]
            }
        })
        builder.addCase(getTagsWithPostsNumber.fulfilled, (state, action) => {
            const { data } = action.payload
            if(data){
                state.tags = [...data.foundTags]
            }
        })
        builder.addCase(getArchivesWithPostNumber.fulfilled, (state, action) => {
            const { data } = action.payload
            if(data){
                state.archives = [...data.foundArchives]
            }
        })
    }
})

export const getCategoriesWithPostsNumber = createAsyncThunk('sidebar/getCategoriesWithPostsNumber', async() => {
    try{
        const res = await findCategoriesWithPostsNumber()
        return res;
    } catch (err) {
        console.log(err)
    }
})

export const getTagsWithPostsNumber = createAsyncThunk('sidebar/getTagsWithPostsNumber',  async () => {
    try {
        const res = await findTagsWithPostsNumber()
        return res;
    } catch (err) {
        console.log(err)
    }
})

export const getArchivesWithPostNumber = createAsyncThunk('sidebar/getArchivesWithPostNumber', async () => {
    try {
        const res = await findArchivesWithPostsNumber()
        return res;
    } catch (err) {
        console.log(err)
    }
})