import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const AdminNav = () => {
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === '/games') {
      setCurrentPage('games');
    } else if (currentPath === '/stats') {
      setCurrentPage('stats');
    } else if (currentPath === '/articles') {
      setCurrentPage('articles');
    } else if (currentPath === '/pictures') {
      setCurrentPage('pictures');
    }
    // Add conditions for other pages
  }, []);

  return (
    <div className="z-10">
      {/* Navigation content */}
      <div
        className={
          "fixed left-0 top-0 h-screen w-[200px] transition-transform duration-300 transform translate-x-0 border-r "
        }
      >
        <ul className="mt-20">
          <li>
            <a href="#" className={currentPage === 'games' ? "block py-2 px-4 bg-gray-100" : "block py-2 px-4"}>
              <Link to="/games">Games</Link>
            </a>
          </li>
          <li>
            <a href="#" className={currentPage === 'stats' ? "block py-2 px-4 bg-gray-100" : "block py-2 px-4"}>
              <Link to="/stats">Add Stats</Link>
            </a>
          </li>
          <li>
            <a href="#" className={currentPage === 'articles' ? "block py-2 px-4 bg-gray-100" : "block py-2 px-4"}>
              <Link to="/articles">Articles</Link>
            </a>
          </li>
          <li>
            <a href="#" className={currentPage === 'pictures' ? "block py-2 px-4 bg-gray-100" : "block py-2 px-4"}>
              <Link to="/pictures">Images</Link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;
