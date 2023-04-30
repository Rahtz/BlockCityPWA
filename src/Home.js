import React from "react";
import myImage from "./images/myImage.jpg";
import CometsLastGame from './images/CometsLastGame.jpg';
import HighFlyersLastGame from './images/HighFlyersLastGame.jpg';
import BlockCityLastGame from './images/BlockCityLastGame.jpg';

const Home = () => {
  return (
    <div>
  <div className="relative h-[500px] overflow-hidden">
    <div className="absolute inset-0">
      <img src={myImage} alt="My Image" className="w-full h-[500px] object-cover" style={{position: 'fixed'}} />
    </div>
    <div className="absolute inset-0 flex flex-col justify-start items-start z-10 mt-[250px] ml-[20px]">
      <h1 className="text-white text-4xl text-left mb-8">Block City Basketball Club</h1>
      <button className="px-8 py-3 bg-yellow-500 text-black rounded-xl hover:bg-blue-600 border-2 border-black">Get in Touch</button>
    </div>
  </div>
  <div className="container mx-auto my-8 z-20 relative bg-white">
    <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
        <a href="#" className="block">
          <img src={CometsLastGame} alt="Article Image" className="w-full" />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Comets 2022 Season Recap</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur lacus eu orci malesuada, quis commodo velit laoreet. </p>
          </div>
        </a>
      </div>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
        <a href="#" className="block">
          <img src={HighFlyersLastGame} alt="Article Image" className="w-full" />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">High Flyers 2022 Season Recap</h3>
            <p className="text-gray-700">Praesent tempus commodo odio, quis bibendum dolor bibendum at. Quisque commodo finibus feugiat. </p>
          </div>
        </a>
      </div>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden">
        <a href="#" className="block">
          <img src={BlockCityLastGame} alt="Article Image" className="w-full" />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Block City 2022 Season Recap</h3>
            <p className="text-gray-700">Aliquam erat volutpat. Donec facilisis orci sapien, ac suscipit mi iaculis in. </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
  );
};

export default Home;
