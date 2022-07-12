import React from 'react'
import './postSlider.css'
import ImageCard from './ImageCard'

const PostSlider = ({posts, slideIndex}) => {
  const postsLength = posts.length
  
  return (
    <div className="section-margin-small slides-container">
      <div className="slides section-margin-top">
        {
          [...posts, ...posts, ...posts].map((post, i) =>
            {
              let offset = postsLength + (slideIndex - i)

              return(
                <ImageCard key={i} post={post} offset={offset}></ImageCard>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default PostSlider