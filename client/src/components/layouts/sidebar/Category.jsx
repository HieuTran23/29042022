import React from 'react'
import './sidebar.css'

const SubCategory = ({subCategories}) => {
  return(
    <ul className="sub-category-list">
      {subCategories && subCategories.map((subCategory, index) => 
        <li className='sub-category-item' key={index}>
          <p>{subCategory.subCategory.subName}</p>
          <span>{subCategory.postsCount}</span>
        </li>
      )}
   </ul>
  )
}

const Category = ({categories}) => {
  return (
    <div className="category-box section-custom section-custom-body-padding">
      <h4 className='box-name'>CATEGORIES</h4>
      {
        categories.map((category) => 
          <ul key={category._id} className="category-list">
            <li>
            <div className='category-item'>
              <p >{category.name}</p> 
              <span>{category.postsCount}</span>
            </div>
            {category.subCategories[0].subCategory && (<SubCategory subCategories={category.subCategories}/>)}
            </li>
          </ul>
        )
      }
    </div>
  )
}

export default Category