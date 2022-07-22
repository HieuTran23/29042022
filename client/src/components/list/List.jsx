import React from 'react'
import './list.css'
import Item from './list-item/Item'

const List = ({list, itemStyle}) => {
  return (
    <>
      {
        list.map((item) => 
          <Item item={item} key={item._id} itemStyle={itemStyle}/>
        )
      }
    </>
  )
}


export default List