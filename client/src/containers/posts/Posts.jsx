import React, { useEffect } from 'react'
import './posts.css'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../../components/post/postCard/PostCard'
import { homePosts } from '../../redux/posts/posts.selector'
import postsSlice, { getPosts } from '../../redux/posts/posts.slice'
import { createArray } from '../../utils/helpers'
import { motion, AnimatePresence } from "framer-motion"

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

    const pagination = createArray({length: pages})

    const beforePage = page === pages ? page - 3 : page === 1 ? page - 1 : page - 2
    const afterPage = page === 1 ? page + 2 : page + 1

    return (
        <div className='section-margin-top-small body-container'>
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
                <div className="section-margin-top-small pagination">
                    <button className='btn prev-btn' onClick={() => handlePrevButtonOnclick()}> Previous</button>
                    {page > 2  && <button className='btn' onClick = {() => handleButtonOnclick(1)}>1</button>}
                    {page > 3  && <button className='btn' disabled>...</button>}
                    {
                        pagination.slice(beforePage, afterPage).map((number, i) => {
                            const dataActive = number === page ? true : null

                            return(
                                <button className='btn' key={i} data-active={dataActive} onClick = {() => handleButtonOnclick(number)}>{number}</button>
                            )
                        })
                    }
                    {page < pages - 2 && <button className='btn' disabled>...</button>}
                    {page < pages - 1  && <button className='btn' onClick = {() => handleButtonOnclick(pages)}>{pages}</button>}
                    <button className='btn next-btn' onClick={() => handleNextButtonOnclick()}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Posts