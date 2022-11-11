import React from 'react'
import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="flex justify-center items-center -mt-5 w-full h-screen bg-gray-500">
        <div className=" h-auto w-auto py-[30px] -mt-20 bg-white rounded-lg shadow-lg text-center">
            <p className="px-[10px] font-sans pt-3">Our Web App is still under development</p>
            <p className="px-[10px] mt-10">Press the button below to enter the site</p>
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><Link to="/home">Click Here</Link></button>
        </div>            
    </div>
  )
}

export default Message
