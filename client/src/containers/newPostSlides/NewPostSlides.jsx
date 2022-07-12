import './newPostSlides.css'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newPostSlidesSelector } from '../../redux/new-posts/newPosts.selector'
import { sliderSlice} from '../../redux/slice'
import { PostSlide, PostSlider } from '../../components'
import { getPosts} from '../../redux/new-posts/newPosts.slice'

const NewPostSlides = () => {
  const dispatch = useDispatch()
  const newPostSlides = useSelector(newPostSlidesSelector)
  const {posts, slideIndex} = newPostSlides

  useEffect(() => {
    const fetchPosts = () => dispatch(getPosts())
    fetchPosts()
  }, [])

  const handlePrevOnclick = () => {
    return dispatch(sliderSlice.actions.prevSlide())
  }

  const handleNextOnclick = () => {
    return dispatch(sliderSlice.actions.nextSlide())
  }

  return (
    <div className='slider-container section-margin-top section-custom'>
      <PostSlide post={posts[slideIndex]} handlePrevOnclick={handlePrevOnclick} handleNextOnclick={handleNextOnclick}/>
      <PostSlider posts={posts} slideIndex={slideIndex}/>
    </div>
  );
}

export default NewPostSlides