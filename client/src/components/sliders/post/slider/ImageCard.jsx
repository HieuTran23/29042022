import React from 'react'
import { motion } from 'framer-motion'

const ImageCard = ({post, offset}) => {
  const active = offset === 0 ? true: null 

  return (
    <div 
        className='image-slider' 
        data-active={active}
        style={{
            '--offset': offset,
            'backgroundImage': `url(${post.support.image.path})`,
            '--dir': offset === 0 ? 0 : (offset > 0 ? 1 : -1)
        }}
    >
    </div>
  )
}

export default ImageCard