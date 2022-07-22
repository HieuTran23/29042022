import React from 'react'
import './sidebar.css'
import Moment from 'moment'

const Archives = ({archives}) => {
  return (
    <div className="archives-box section-custom section-custom-body-padding section-margin-top-small">
      <h4 className='box-name'>ARCHIVES</h4>
      <div className="box-body">
        <ul className='archive-list'>
            {
                archives.map((archive) => 
                <li className='archive-item' key={archive._id}>
                    <p>{Moment(archive._id).format('MMMM YYYY')}</p>
                    <span className='posts-number'>{archive.postsCount}</span>
                </li>
                )
            }
        </ul>
      </div>
    </div>
  )
}

export default Archives