import React from 'react'
import './sidebar.css'
import List from '../../list/List'

const Tag = ({tags}) => {
  return (
    <div className="tag-box section-custom section-custom-body-padding section-margin-top-small">
      <h4 className='box-name'>TAGS</h4>
      <div className="box-body">
        <List list={tags} itemStyle='item-tag-number'/>
      </div>
    </div>
  )
}

export default Tag