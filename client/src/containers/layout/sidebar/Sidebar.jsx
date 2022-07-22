import React from 'react'
import './sidebar.css'
import { Category, Tag, Archives } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getArchivesWithPostNumber, getCategoriesWithPostsNumber, getTagsWithPostsNumber } from '../../../redux/sidebar/sidebar.slice'
import { archivesSelector, categoriesSelector, tagsSelector } from '../../../redux/sidebar/sidebar.selector'

const Sidebar = () => {
  const dispatch = useDispatch()
  const categories = useSelector(categoriesSelector)
  const tags = useSelector(tagsSelector)
  const archives = useSelector(archivesSelector)

  useEffect(() => {
    const fetchData = () => {
      dispatch(getCategoriesWithPostsNumber())
      dispatch(getTagsWithPostsNumber())
      dispatch(getArchivesWithPostNumber())
    }
    fetchData()
  }, [])

  return (
    <div className="side-bar section-margin-top-small">
      <Category categories={categories}/>
      <Archives archives={archives}/>
      <Tag tags={tags}/>
    </div>
  )
}

export default Sidebar