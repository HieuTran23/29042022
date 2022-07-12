import React from 'react'
import { Link } from 'react-router-dom'
import './postSlide.css'
import { sampleImage } from '../../../../assets'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

const PostSlide = ({post, type, handlePrevOnclick, handleNextOnclick}) => {
    const typeName = type || "NONE-TYPE"
    return (
        <div className='post-slide-container'>
            <div className="left-post-slide">
                <div 
                    className="slide-image"
                    style={{
                        'backgroundImage': post.support.image.path ? `url(${post.support.image.path})`: `url(${sampleImage})`,
                    }}
                >
                    <FiChevronLeft className='prev-button button' onClick={handlePrevOnclick}/>
                    <FiChevronRight  className='next-button button' onClick={handleNextOnclick}/>
                </div>
            </div>
            <div className="slide-card section-custom-body-padding">
                <h3 className="slide-head">
                    {typeName}
                </h3>
                <div className="slide-body">
                    <div className="slide-category">
                        <h4>
                            Web design and development 
                        </h4> 
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
        </div>
    )
}

export default PostSlide