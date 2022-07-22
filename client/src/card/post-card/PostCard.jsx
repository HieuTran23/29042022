import React from 'react'
import './postCard.css'
import {RiPencilFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { sampleImage } from '../../assets'
import Moment from 'moment'
import { motion } from "framer-motion"

const PostCard = ({post}) => {
    Moment.locale('en')

    return (
        <motion.div className='post-card section-custom section-margin-top-small'
            key={post._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="card-image" 
                style={{
                    'backgroundImage': post.support.image.path ? `url(${post.support.image.path})`: `url(${sampleImage})`,
                }}
            ></div>
            <div className="card-information section-custom-body-padding">
                <h4 className="card-header">
                    Web design and development
                </h4>
                <h2 className="card-title">
                    {post.title}
                </h2>
                <div className="card-detail">
                    <div className="card-author">
                        <p>By <span>Tran Hieu</span></p>
                    </div>
                    <div className="card-created-time">
                        <RiPencilFill/>
                        <p>{Moment(post.createdAt).format('d MMM, YYYY')}</p>
                    </div>
                </div>
                <div className="card-body">
                    <p>{post.summary}</p>
                </div>
                <div className="card-footer">
                    <Link to='post/:id' className='slide-link-to'>Read more</Link>
                </div>
            </div>
        </motion.div>
    )
}

export default PostCard