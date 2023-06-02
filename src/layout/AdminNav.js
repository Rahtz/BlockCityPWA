import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const AdminNav = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
  
    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

  return (
    <div className="relative z-40">
      {/* Button */}
      <button
        onClick={handleToggleCollapse}
        className={`absolute -top-2 ${isCollapsed ? 'left-0' : 'left-[150px]'} p-2 rounded-md bg-gray-800 text-white`}
      >
        {isCollapsed ? '>' : '<'}
      </button>
      {/* Navigation content */}
      <div
        className={`fixed left-0 top-0 h-screen w-[150px] bg-black transition-transform duration-300 transform ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <ul className="mt-20">
          <li>
            <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700">
            <Link to="/stats">
                    Add Stats
                  </Link>
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700">
            <Link to="/articles" >
                    Articles
                  </Link>
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700">
            <Link to="/pictures">
                    Images
                  </Link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminNav