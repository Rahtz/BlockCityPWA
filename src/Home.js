import React from "react";
import Blockcity from "./images/Blockcity.png";
import Highflyers from "./images/Highflyers.png";
import CountUp from "react-countup";
import { BsFillPersonFill } from 'react-icons/bs';

const Home = () => {
  return (
    <div className="-mt-5 bg-gray-200 h-screen">
      <div className="flex container relative top-10 w-screen h-[200px] overflow-x-auto scrollbar-hide pt-12">
        <div className="-mt-11">
          <div className="bg-white w-[80px] h-[30px] pl-[12px] pt-[3px] ml-[35px] mb-[20px] rounded shadow-lg">
            <h1 className="">Week 2</h1>
          </div>
          <div className="grid grid-cols-2 w-[112px] h-[150px] ml-[30px] -mt-[5px] bg-gray-800 rounded-lg">
            <img
              className="ml-[5px] mt-[30px] col-span-1 w-[39px] h-[39px]"
              src={Blockcity}
              alt="BC"
            />
            <img
              className="-ml-[2px] mt-[30px] col-span-1 w-[65px] h-[39px]"
              src={Highflyers}
              alt="HF"
            />
            <table className="w-[112px]">
              <tr>
                <th className="text-white text-[12px]">Block City</th>
                <th className="text-white text-[12px] pr-[5px]">98</th>
              </tr>
              <tr>
                <th className="text-white text-[12px]">High Flyers</th>
                <th className="text-white text-[12px] pr-[5px]">69</th>
              </tr>
            </table>
          </div>
          <div className="w-[112px] h-[150px] ml-[172px] -mt-[150px] bg-blue-500 rounded-lg"></div>
          <div className="w-[112px] h-[150px] ml-[314px] -mt-[150px] bg-blue-500 rounded-lg"></div>
        </div>
        <div className="-mt-11">
          <div className="bg-white w-[80px] h-[30px] pl-[12px] pt-[3px] ml-[35px] mb-[20px] rounded shadow-lg">
            <h1 className="">Week 1</h1>
          </div>
          <div className="grid grid-cols-2 w-[112px] h-[150px] ml-[30px] -mt-[5px] bg-gray-800 rounded-lg">
            <img
              className="ml-[5px] mt-[30px] col-span-1 w-[39px] h-[39px]"
              src={Blockcity}
              alt="BC"
            />
            <img
              className="-ml-[2px] mt-[30px] col-span-1 w-[65px] h-[39px]"
              src={Highflyers}
              alt="HF"
            />
            <table className="w-[112px]">
              <tr>
                <th className="text-white text-[12px]">Block City</th>
                <th className="text-white text-[12px] pr-[5px]">98</th>
              </tr>
              <tr>
                <th className="text-white text-[12px]">High Flyers</th>
                <th className="text-white text-[12px] pr-[5px]">69</th>
              </tr>
            </table>
          </div>
          <div className="w-[112px] h-[150px] ml-[172px] -mt-[150px] bg-blue-500 rounded-lg"></div>
          <div className="w-[112px] h-[150px] ml-[314px] -mt-[150px] bg-blue-500 rounded-lg"></div>
        </div>
      </div>

      <div className="relative top-16 mx-5 h-auto py-2 border bg-white rounded-lg drop-shadow-lg">
        <table className="w-full">
          <thead className="bg-red-500 w-full">
            <tr className="border border-gray-3 h-10">
              <th className="w-10">Team</th>
              <th className="w-6 text-center">W</th>
              <th className="w-6 text-center">L</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-gray-3 h-10">
              <td className="w-10 text-center">Block City</td>
              <td className="w-6 text-center">5</td>
              <td className="w-6 text-center">2</td>
            </tr>
            <tr className="bg-gray-200 h-10">
              <td className="w-10 text-center">High Flyers</td>
              <td className="w-6 text-center">2</td>
              <td className="w-6 text-center">5</td>
            </tr>
            <tr className="border border-gray-3 h-10">
              <td className="w-10 text-center">The Pirates</td>
              <td className="w-6 text-center">0</td>
              <td className="w-6 text-center">5</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="relative top-20 mx-5 h-screen py-5 text-center border bg-gray-700 rounded-lg drop-shadow-lg">
        <div className="py-12">
          <span className="text-white text-[45px]">
            <CountUp end={5} duration={2.5} />
          </span>
          <h1 className="text-gray-400">Seasons</h1>
        </div>
        <div className="py-12">
        {/* <span className="text-white"><BsFillPersonFill /></span> */}
          <span className="text-white text-[45px]">
            <CountUp end={3} duration={2.5} />
          </span>
          <h1 className="text-gray-400">All Time National Representatives</h1>
        </div>
        <div className="py-12">
          <span className="text-white text-[45px]">
            <CountUp end={6} duration={2.5} />
          </span>
          <h1 className="text-gray-400">Current Teams</h1>
        </div>
        <div className="py-12">
          <span className="text-white text-[45px]">
            <CountUp end={4} duration={2.5} />
          </span>
          <h1 className="text-gray-400">Sponsors</h1>
        </div>
      </div>

      <div className="relative top-24 mx-5 h-screen py-5 border bg-white rounded-lg drop-shadow-lg">
      
      </div>
    </div>
  );
};

export default Home;
