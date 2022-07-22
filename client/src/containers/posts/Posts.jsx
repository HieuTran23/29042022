import React, { useEffect } from 'react'
import './posts.css'
import { useDispatch, useSelector } from 'react-redux'
import { PostCard} from '../../components'
import { homePosts } from '../../redux/posts/posts.selector'
import postsSlice, { getPosts } from '../../redux/posts/posts.slice'
import { Pagination } from '../../components'

const Posts = () => {
    const dispatch = useDispatch()
    const { posts, page, pages} = useSelector(homePosts)

    useEffect(() => {
        const fetchPosts = () => {
            dispatch(getPosts(page))
        }
        fetchPosts()
    }, [page])

    const handleNextButtonOnclick = () => dispatch(postsSlice.actions.nextPage())

    const handlePrevButtonOnclick = () => dispatch(postsSlice.actions.prevPage())

    const handleButtonOnclick = (number) => dispatch(postsSlice.actions.choosePage(number))

    

    return (
        <div className='posts-container'>
            {
                posts.map((post, i) =>
                    {
                    return(
                        <PostCard key={i} post={post}></PostCard>
                    )
                    }
                )
            }
            <Pagination handleButtonOnclick={handleButtonOnclick} handleNextButtonOnclick={handleNextButtonOnclick} handlePrevButtonOnclick={handlePrevButtonOnclick} page={page} pages={pages}/>
        </div>
    )
}

export default Posts