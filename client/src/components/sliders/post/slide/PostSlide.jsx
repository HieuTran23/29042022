import React from 'react'
import { Link } from 'react-router-dom'
import './postSlide.css'
import { sampleImage } from '../../../../assets'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { motion} from 'framer-motion'
import List from '../../../list/List'

const PostImage = ({post, handlePrevOnclick, handleNextOnclick}) => {
    return(
        <div className="left-post-slide">
            <motion.div 
                className="slide-image"
                style={{
                    'backgroundImage': post.support.image.path ? `url(${post.support.image.path})`: `url(${sampleImage})`,
                }}
                key= {post._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <FiChevronLeft className='prev-button button' onClick={handlePrevOnclick}/>
                <FiChevronRight  className='next-button button' onClick={handleNextOnclick}/>
            </motion.div>
        </div>
    )
}

const PostInfo = ({post, type}) => {
    const typeName = type || "NONE-TYPE"

    return (
        <div className="slide-card section-custom-body-padding">
            <h3 className="slide-head">
                {typeName}
            </h3>
            <div className="slide-body">
                <div className="slide-category">
                    <h4>
                        {post.category.name}/ {post.subCategory.subName}
                    </h4> 
                </div>
                <div className="slide-tag">
                    <List list={post.tags} itemStyle='item-tag'/>
                </div>
                <div className="slide-title">
                    <h3>{post.title}</h3>
                </div>
                <div className="slide-summary">
                    {post.summary}
                </div>
            </div>
            <div className="slide-bottom">
                <Link to='post/:id' className='slide-link-to'>Read more</Link>
            </div>
        </div>
    )
}

const PostSlide = ({post, type, handlePrevOnclick, handleNextOnclick}) => {
    return (
        <div className='post-slide-container'>
            <PostImage post={post} handlePrevOnclick={handlePrevOnclick} handleNextOnclick={handleNextOnclick}/>
            <PostInfo post={post} type={type}/>
        </div>
    )
}

export default PostSlide