import React from 'react'
import './item.css'

const Styles = [
    '',
    'item-tag-number',
    'item-tag'
]

const Item = ({item}) => {
    return (
        <div>{item}</div>
    )
}

const Tag = ({item}) => {
    return (
        <div className='tag-card'>
            <p className="tag-name">{item.name}</p>
        </div>
    )
}

const TagNumberItem = ({item}) => {
    return (
        <div className='tag-card-number'>
            <p className='tag-name'>{item.name}</p>
            <span className='posts-number'>{item.postsCount}</span>
        </div>
    )
}

const ItemFactory = ({item, itemStyle}) => {
    switch (itemStyle) {
        case Styles[1]: return <TagNumberItem item={item}/>
        case Styles[2]: return <Tag item={item}/>
        default: return <Item item={item}/>
    }
}

export default ItemFactory