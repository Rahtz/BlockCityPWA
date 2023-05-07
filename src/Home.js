import { useState, useEffect } from "react";
import { supabase } from "./client";
import myImage from "./images/myImage.jpg";
import CometsLastGame from "./images/CometsLastGame.jpg";
import HighFlyersLastGame from "./images/HighFlyersLastGame.jpg";
import BlockCityLastGame from "./images/BlockCityLastGame.jpg";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [article, setArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
    setLatestArticles(article.slice(0, 3));
  }, []);

  async function fetchArticles() {
    const { data } = await supabase
      .from("articles")
      .select()
      .order("created_at", { ascending: false })
      .limit(3);
    setArticles(data);
    setLatestArticles(data);
  }

  const handleLinkClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function ArticleModal({ article, onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-3 h-5/6 w-11/12 relative">
            <button
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              onClick={onClose}
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M6.7 6.7a1 1 0 0 1 1.4 0L12 10.6l3.9-3.9a1 1 0 1 1 1.4 1.4L13.4 12l3.9 3.9a1 1 0 1 1-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 0 1-1.4-1.4L10.6 12 6.7 8.1a1 1 0 0 1 0-1.4z"></path>
              </svg>
            </button>
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100% - 40px)" }}
            >
              
          <img src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${article.imageName}`} alt="Article Image" />
          <h2 className="text-lg font-bold mb-2">{article.heading}</h2>
              <p>{article.body}</p>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div>
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={myImage}
            alt="My Image"
            className="w-full h-[500px] object-cover"
            style={{ position: "fixed" }}
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-start items-start z-10 mt-[250px] ml-[20px]">
          <h1 className="text-white text-4xl text-left mb-8">
            Block City Basketball Club
          </h1>
          <button className="px-8 py-3 bg-yellow-500 text-black rounded-xl hover:bg-blue-600 border-2 border-black">
            Get in Touch
          </button>
        </div>
      </div>
      
  <div className="flex flex-col container mx-auto my-8 z-20 relative w-full bg-white" key={article.id}>
    <h2 className="text-2xl font-bold mb-4 text-center">Recent Articles</h2>
    {latestArticles.map((article) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
        <a className="block" onClick={handleLinkClick}>
          <img
            src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${article.imageName}`}
            alt="Article Image"
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">
              {article.heading}
            </h3>
            <button onClick={() => setSelectedArticle(article)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Click here to view Article
            </button>
          </div>
        </a>
      </div>          
    </div>
    ))}
  </div>

{selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </div>
  );
};

export default Home;
