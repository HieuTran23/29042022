import axios from "axios";
import { apiUrl } from "./constant";
import { resolve} from "./resolve"

export const findArchivesWithPostsNumber = async () => {
    return await resolve(axios.get(`${apiUrl}/archives/find_all_post_number`).then(res => {
        return res.data
    }))
}
