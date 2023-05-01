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

  useEffect(() => {
    // fetchArticles();
    setLatestArticles(article.slice(0, 3));
  }, [article]);

  // async function fetchArticles() {
  //   const { data } = await supabase.from("articles").select();
  //   setArticles(data);
  //   setLatestArticles(data.slice(0, 3));
  // }

  const handleLinkClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
      {latestArticles.map((article) => (
        <div className="container mx-auto my-8 z-20 relative bg-white">
        <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
            <a className="block" onClick={handleLinkClick}>
              <img
                src={CometsLastGame}
                alt="Article Image"
                className="w-full"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">
                  {article.heading}
                </h3>
                <button>
                  Click here to view Article
                </button>
              </div>
            </a>
          </div>          
        </div>
      </div>
      ))}
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-3 h-5/6 w-11/12 relative">
            <button
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              onClick={handleCloseModal}
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M6.7 6.7a1 1 0 0 1 1.4 0L12 10.6l3.9-3.9a1 1 0 1 1 1.4 1.4L13.4 12l3.9 3.9a1 1 0 1 1-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 0 1-1.4-1.4L10.6 12 6.7 8.1a1 1 0 0 1 0-1.4z"></path>
              </svg>
            </button>
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100% - 40px)" }}
            >
              <img
                src={CometsLastGame}
                alt="Article Image"
                className="w-full"
              />
              <h3 className="text-lg font-bold mb-2">
                Comets 2022 Season Recap
              </h3>
              The first of our two inaugural women's team The Comets had a great
              season this year. They started things off with a 3 game win streak
              and continued things well the whole season only losing two games
              during the regular season and qualified for the semis in second
              place. Unfortunately towards the end of the season multiple
              injuries and sickness really started to take a toll on the team
              and we struggled to feild a full team in some games. Despite this
              the ladies put in a valiant effort in the semi and managed to make
              the final which wasn't to be this season and we weren't able to
              feild a healthy team for the game. The team was led this year by
              @natalieb_ who topped the scoring most weeks averaging 22.5 PPG
              and 15.5 RPG She set the record for points scored with 29 two
              times and the rebound record with 27. On the defensive end Nat
              also holds the Block record with 7 and the joint record for steals
              with 6. Other standout performances were @itsharts with a nice
              start to the season scoring 27 in thr first game. @angelachubb001
              also had a nice 26 point game as well and @bardotuhaka who shot
              100% from 3pt, don't ask about how many shots taken... Huge thanks
              to another locally owned and operated family business Greaves
              Electrical Services Ltd who have support BCBC for multiple years
              and were more than willing to help out The Comets with their
              uniforms and other costs. If you need any Electrical work give
              them a call and they will sort you out.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
