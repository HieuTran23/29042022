import axios from "axios";
import { apiUrl } from "./constant";
import { resolve} from "./resolve"

export const findTagsWithPostsNumber = async () => {
    return await resolve(axios.get(`${apiUrl}/tag/find_all_post_number`).then(res => {
        return res.data
    }))
}
