import './pagination.css'
import React from 'react'
import { createArray} from '../../utils/helpers'

const Pagination = ({handlePrevButtonOnclick, handleButtonOnclick, handleNextButtonOnclick, page, pages}) => {
  const beforePage = page === pages ? page - 3 : page === 1 ? page - 1 : page - 2
  const afterPage = page === 1 ? page + 2 : page + 1
  const pagination = createArray({length: pages})

  return (
    <div className="section-margin-top-small pagination">
      <button className='btn prev-btn' onClick={() => handlePrevButtonOnclick()}> Previous</button>
      {(page > 2 && pages > 3)  && <button className='btn' onClick = {() => handleButtonOnclick(1)}>1</button>}
      {page > 3  && <button className='btn' disabled>...</button>}
      {
          pagination.slice(beforePage, afterPage).map((number, i) => {
              const dataActive = number === page ? true : null

              return(
                  <button className='btn' key={i} data-active={dataActive} onClick = {() => handleButtonOnclick(number)}>{number}</button>
              )
          })
      }
      {page < pages - 2 && <button className='btn' disabled>...</button>}
      {(page < pages - 1 && pages > 3) && <button className='btn' onClick = {() => handleButtonOnclick(pages)}>{pages}</button>}
      <button className='btn next-btn' onClick={() => handleNextButtonOnclick()}>Next</button>
    </div>
  )
}

export default Pagination