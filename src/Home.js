import React from "react";
// import Blockcity from "./images/Blockcity.png";
import Highflyers from "./images/Highflyers.png";
import Pirates from "./images/Pirates.png";
// import Jokers from "./images/Jokers.png";
// import CountUp from "react-countup";
import WeekGames from "./WeekGames";

const Home = () => {
  return (
    <div className="-mt-5 bg-gray-200 h-screen">
      <div className="flex container relative top-5 w-screen h-[80px] overflow-x-auto scrollbar-hide border border-gray-500">
        <div className="w-[120px] border border-gray-500"></div>

        <WeekGames
          team1="HF"
          team1Icon={Highflyers}
          team1Score="90"
          team2="P"
          team2Icon={Pirates}
          team2Score="70"
        />
      </div>

      <div className="mt-10">
        <table className="w-full relative text-sm bg-white border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-5 border">TEAM</th>
              <th className="border">W</th>
              <th className="border">L</th>
              <th className="border">WIN%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border">Block City</td>
              <td className="border">10</td>
              <td className="border">5</td>
              <td className="border">{(10 / 15).toFixed(3)}</td>
            </tr>
            <tr>
              <td className="border">The Jokers</td>
              <td className="border">8</td>
              <td className="border">7</td>
              <td className="border">{(8 / 15).toFixed(3)}</td>
            </tr>
            <tr>
              <td className="border">PNBHS</td>
              <td className="border">7</td>
              <td className="border">8</td>
              <td className="border">{(7 / 15).toFixed(3)}</td>
            </tr>
            <tr>
              <td className="border">High Flyers</td>
              <td className="border">3</td>
              <td className="border">12</td>
              <td className="border">{(3 / 15).toFixed(3)}</td>
            </tr>
            <tr>
              <td className="border">Manukura</td>
              <td className="border">2</td>
              <td className="border">13</td>
              <td className="border">{(2 / 15).toFixed(3)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <div className="relative top-16 mx-5 h-auto py-2 border bg-white rounded-lg drop-shadow-lg">
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
      </div> */}

      {/* <div className="relative top-20 mx-5 h-screen py-5 text-center border bg-gray-700 rounded-lg drop-shadow-lg">
        <div className="py-12">
          <span className="text-white text-[45px]">
            <CountUp end={5} duration={2.5} redraw={true}/>
          </span>
          <h1 className="text-gray-400">Seasons</h1>
        </div>
        <div className="py-12">
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
      </div> */}

      {/* <div className="relative top-24 mx-5 h-screen py-5 border bg-white rounded-lg drop-shadow-lg">
      
      </div> */}
    </div>
  );
};

export default Home;
