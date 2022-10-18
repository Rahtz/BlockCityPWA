import React from 'react'

const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {
    let pages = [];

for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
    pages.push(i);
}

  return (
    <div className="flex flex-wrap justify-center mt-1">{
        pages.map((page, index) => {
            return <button className="w-5 h-5 " key={index} onClick={() => setCurrentPage(page)}>{page}</button>
        })
    }</div>
  )
}

export default Pagination;