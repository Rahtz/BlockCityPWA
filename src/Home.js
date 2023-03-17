import React from "react";
import Blockcity from "./images/Blockcity.png";
import Highflyers from "./images/Highflyers.png";
import Pirates from "./images/Pirates.png";
import CountUp from "react-countup";
import { BsFillPersonFill } from 'react-icons/bs';
import WeekGames from './WeekGames';

const Home = () => {
  return (
    <div className="-mt-5 bg-gray-200 h-screen">
      <div className="flex container relative top-10 w-screen h-[200px] overflow-x-auto scrollbar-hide pt-12">
      <div id="Week 1" className="-mt-11">
          <div className="bg-white w-[80px] h-[30px] pl-[12px] pt-[3px] ml-[35px] mb-[20px] rounded shadow-lg">
            <h1 className="">Week 1</h1>
          </div>
          <div className="w-[112px] h-[150px] ml-[30px] -mt-[5px] bg-gray-800 rounded-lg">
            <WeekGames 
              team1 = "High Flyers"
              team1Icon = {Highflyers}
              team1Score = "90"
              team2 = "The Pirates"
              team2Icon = {Pirates}
              team2Score = "70"
            />
          </div>
          <div className="w-[112px] h-[150px] ml-[172px] -mt-[150px] bg-gray-800 rounded-lg">
          <WeekGames 
              team1 = "The Jokers"
              team1Icon = {""}
              team1Score = "80"
              team2 = "Block City"
              team2Icon = {Blockcity}
              team2Score = "74"
            />
          </div>
        </div>
        <div id="Week 2" className="-mt-11">
          <div className="bg-white w-[80px] h-[30px] pl-[12px] pt-[3px] ml-[35px] mb-[20px] rounded shadow-lg">
            <h1 className="">Week 2</h1>
          </div>
          <div className="w-[112px] h-[150px] ml-[30px] -mt-[5px] bg-gray-800 rounded-lg">
            <WeekGames 
              team1 = "Block City"
              team1Icon = {Blockcity}
              team1Score = "108"
              team2 = "High Flyers"
              team2Icon = {Highflyers}
              team2Score = "82"
            />
          </div>
          <div className="w-[112px] h-[150px] ml-[172px] -mt-[150px] bg-gray-800 rounded-lg">
          <WeekGames 
              team1 = "The Pirates"
              team1Icon = {Pirates}
              team1Score = "49"
              team2 = "Slow Break"
              team2Icon = {""}
              team2Score = "101"
            />
          </div>
        </div>
        <div id="Week 3" className="-mt-11">
          <div className="bg-white w-[80px] h-[30px] pl-[12px] pt-[3px] ml-[35px] mb-[20px] rounded shadow-lg">
            <h1 className="">Week 3</h1>
          </div>
          <div className="w-[112px] h-[150px] ml-[30px] -mt-[5px] bg-gray-800 rounded-lg">
            <WeekGames 
              team1 = "Block City"
              team1Icon = {Blockcity}
              team1Score = "80"
              team2 = "Slow Break"
              team2Icon = {""}
              team2Score = "70"
            />
          </div>
          <div className="w-[112px] h-[150px] ml-[172px] -mt-[150px] bg-gray-800 rounded-lg">
          <WeekGames 
              team1 = "The Pirates"
              team1Icon = {Pirates}
              team1Score = "45"
              team2 = "Zayfrogs"
              team2Icon = {""}
              team2Score = "51"
            />
          </div>
          <div className="w-[112px] h-[150px] ml-[314px] -mt-[150px] bg-gray-800 rounded-lg">
          <WeekGames 
              team1 = "High Flyers"
              team1Icon = {Highflyers}
              team1Score = "78"
              team2 = "Manukura"
              team2Icon = {""}
              team2Score = "91"
            />
          </div>
        </div>
      </div>

      <div className="relative top-16 mx-5 h-auto py-2 border bg-white rounded-lg drop-shadow-lg">
      <h1 className="text-[30px] text-center py-2">Points Table</h1>
        <table className="w-4/5 mx-10">
          <thead className="bg-red-500 w-full">
            <tr className="border border-gray-3 h-10">
              <th className="w-10">Team</th>
              <th className="w-6 text-center">W</th>
              <th className="w-6 text-center">L</th>
            </tr>
          </thead>
          <tbody>
          <tr className="border border-gray-3 h-10">
              <td className="w-10 text-center">PNBHS</td>
              <td className="w-6 text-center">5</td>
              <td className="w-6 text-center">2</td>
            </tr>
          <tr className="border border-gray-3 h-10 bg-gray-200">
              <td className="w-10 text-center">The Jokers</td>
              <td className="w-6 text-center">5</td>
              <td className="w-6 text-center">2</td>
            </tr>
            <tr className="border border-gray-3 h-10">
              <td className="w-10 text-center">Block City</td>
              <td className="w-6 text-center">5</td>
              <td className="w-6 text-center">2</td>
            </tr>
            <tr className="border border-gray-3 h-10 bg-gray-200">
              <td className="w-10 text-center">Its Up</td>
              <td className="w-6 text-center">5</td>
              <td className="w-6 text-center">2</td>
            </tr>
            <tr className="border border-gray-3 h-10">
              <td className="w-10 text-center">High Flyers</td>
              <td className="w-6 text-center">2</td>
              <td className="w-6 text-center">5</td>
            </tr>
            <tr className="border border-gray-3 h-10 bg-gray-200">
              <td className="w-10 text-center">Slow Break</td>
              <td className="w-6 text-center">5</td>
              <td className="w-6 text-center">2</td>
            </tr>
            <tr className="border border-gray-3 h-10">
              <td className="w-10 text-center">Manukura</td>
              <td className="w-6 text-center">5</td>
              <td className="w-6 text-center">2</td>
            </tr>
            <tr className="border border-gray-3 h-10 bg-gray-200">
              <td className="w-10 text-center">The Pirates</td>
              <td className="w-6 text-center">0</td>
              <td className="w-6 text-center">5</td>
            </tr>
            <tr className="border border-gray-3 h-10">
              <td className="w-10 text-center">Shannon Four Square</td>
              <td className="w-6 text-center">5</td>
              <td className="w-6 text-center">2</td>
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
