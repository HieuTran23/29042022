import axios from "axios"
import { apiUrl, FIND_HOME_POST_NUMBER, FIND_NEWEST_POST_NUMBER, NEWEST } from "./constant"
import { resolve } from "./resolve"

export const findNewestPosts = async () => {
    return await resolve(axios.get(`${apiUrl}/post?number=${FIND_NEWEST_POST_NUMBER}&filter=${NEWEST}`).then(res => {
        return res.data
    }))
}

export const findPosts = async ({page, number}) => {
    return await resolve(axios.get(`${apiUrl}/post?page=${page}&number=${FIND_HOME_POST_NUMBER}`).then(res => {
        return res.data
    }))
}
