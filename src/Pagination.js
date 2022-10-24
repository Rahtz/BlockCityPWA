import React from 'react'

const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {
    let pages = [];

for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
  if(i <= 5 || i === Math.ceil(totalPosts/postsPerPage)){
    pages.push(i);
  }
    
}

  return (
    <div className="flex flex-wrap justify-center mt-1">{
        pages.map((page, index) => {
            return <button className="h-10 px-5 text-black transition-colors duration-150 bg-white border  border-black 7focus:shadow-outline hover:bg-indigo-100" key={index} onClick={() => setCurrentPage(page)}>{page}</button>
        })
    }</div>
  )
}

export default Pagination;