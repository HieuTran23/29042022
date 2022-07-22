import axios from "axios";
import { apiUrl } from "./constant";
import { resolve} from "./resolve"

export const findCategoriesWithPostsNumber = async () => {
    return await resolve(axios.get(`${apiUrl}/category/find_all_post_number`).then(res => {
        return res.data
    }))
}
