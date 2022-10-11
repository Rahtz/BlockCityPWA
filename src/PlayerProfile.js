import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./client";
import { useParams } from "react-router-dom";

function Stats() {
  const [openTab, setOpenTab] = useState(1);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState([]);
  const [totalstats, setTotalStats] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    //eslint-disable-next-line
    fetchStatsById();
    //eslint-disable-next-line
    fetchTotalStats();
  }, []);

  async function fetchStatsById() {
    const { data } = await supabase
      .from("stats")
      .select()
      .eq("PlayerId", params.id);
    setStats(data);
  }

  async function fetchTotalStats() {
    const { data } = await supabase.rpc('totalstat');
    setTotalStats(data);
    
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }



  async function fetchTeams() {
    const { data } = await supabase.from("teams").select();
    setTeams(data);
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  var TeamsName = teams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.TeamName;
    return result;
  }, {});

  let points = 0;
  let rebounds = 0;
  let assists = 0;
  let steals = 0;
  let blocks = 0;

  let seasonPoints = 0;
  let seasonRebounds = 0;
  let seasonAssists = 0;
  let seasonSteals = 0;
  let seasonBlocks = 0;
  let seasonGames = 0;

  let averageSeasonPoints = 0;
  let averageSeasonRebounds = 0;
  let averageSeasonAssists = 0;
  let averageSeasonSteals = 0;
  let averageSeasonBlocks = 0;

  
  

  stats.forEach((item) => {
    points += item.Points;
    rebounds += item.Rebounds;
    assists += item.Assists;
    steals += item.Steals;
    blocks += item.Blocks;
    if(item.Season === 2021){
      seasonPoints += item.Points;
      seasonRebounds += item.Rebounds;
      seasonAssists += item.Assists;
      seasonSteals += item.Steals;
      seasonBlocks += item.Blocks;
      seasonGames += 1;
    }
    averageSeasonPoints = seasonPoints / seasonGames;
    averageSeasonRebounds = seasonRebounds / seasonGames;
    averageSeasonAssists = seasonAssists / seasonGames;
    averageSeasonSteals = seasonSteals / seasonGames;
    averageSeasonBlocks = seasonBlocks / seasonGames;
  });

  return (
    <div className="grid divide-x mt-1">
      <div className="grid grid-cols-5 divide-x w-full h-auto border">
        <div className="col-span-2 h-48 border"></div>
        <div className="col-span-3 border">
          <h1 className="text-xl pb-5"><b>{PlayersName[params.id]}</b></h1>
          <h2 className="text-md pb-2"><b>Club Totals</b></h2>
          <p className="text-xs pb-1">Points: {points}</p>
          <p className="text-xs pb-1">Rebounds: {rebounds}</p>
          <p className="text-xs pb-1">Assists: {assists}</p>
          <p className="text-xs pb-1">Steals: {steals}</p>
          <p className="text-xs pb-1">Blocks: {blocks}</p>
          {/* <p>Warriors #30 PG</p>
          <p>HT/WT  6'2'', 185lbs</p>
          <p>Birthdate 24/07/1997(25)</p>
          <p>College PNBHS</p> */}
        </div>
      </div>
      <div className="w-full h-28 border">
        <div className="mx-5 my-3.5 h-20 border rounded-xl">
          <div className="w-full h-4 bg-blue-800 rounded-t-lg text-center">
            <p className="text-white text-xs ">2021 SEASON AVERAGES</p>
            <div className="grid grid-cols-4 ml-6 my-1.5 h-15">
              <div className="w-12 h-12">
                <p className="text-xs pb-1">PTS</p>
                <h3 className="text-s"><b>{averageSeasonPoints}</b></h3>
              </div>
              <div className="w-12 h-12">
                <p className="text-xs pb-1">REB</p>
                <h3 className="text-s"><b>{averageSeasonRebounds}</b></h3>
              </div>
              <div className="w-12 h-12">
                <p className="text-xs pb-1">AST</p>
                <h3 className="text-s"><b>{averageSeasonAssists}</b></h3>
              </div>
              <div className="w-12 h-12">
                <p className="text-xs pb-1">STL</p>
                <h3 className="text-s"><b>{averageSeasonSteals}</b></h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="flex overflow-x-auto w-screen h-auto bg-white">
                <li className="w-auto">
                  <a
                    href="#/"
                    onClick={() => setOpenTab(1)}
                    className={` ${
                      openTab === 1 ? "border-b-2 border-red-600 text-white" : ""
                    } inline-block px-2 py-1 text-black bg-white`}
                  >
                    Overview
                  </a>
                </li>
                <li className="w-auto">
                  <a
                    href="#/"
                    onClick={() => setOpenTab(2)}
                    className={` ${
                      openTab === 2 ? "border-b-2 border-red-600 text-white" : ""
                    } inline-block px-2 py-1 text-black bg-white`}
                  >
                    Totals
                  </a>
                </li>
                <li className="w-auto">
                  <a
                    href="#/"
                    onClick={() => setOpenTab(3)}
                    className={` ${
                      openTab === 3 ? "border-b-2 border-red-600 text-white" : ""
                    } inline-block px-2 py-1 text-black bg-white`}
                  >
                    Averages
                  </a>
                </li>                
              </ul>

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="container overflow-hidden w-full bg-gray-300">
              
              <div className="relative p-3 mt-2 bg-white border rounded-t-lg whitespace-nowrap">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  {" "}
                  <table className=" relative text-center border-t overflow-x-auto overflow-y-hidden whitespace-nowrap">
                    <thead className="border-b bg-white">
                      <tr>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2 border-r"
                        >
                          Team
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          RBS
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          PTS
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          AST
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          STL
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          BLK
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          FGA
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          FGM
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          3PA
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          3PM
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          FTA
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          FTM
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.map((stat) => (
                        <tr key={stat.id} className="bg-white border-b">
                          <td className="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900 border-r">
                          {TeamsName[stat.TeamId]}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.YourDate}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Points}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Rebounds}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Assists}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Steals}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Blocks}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FeildGoalsAttempted}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FeildGoalsMade}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.ThreePointersAttempted}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.ThreePointersMade}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FreeThrowsAttempted}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FreeThrowsMade}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* <table className="min-w-full text-center border-t">
                    <thead className="border-b bg-white">
                      <tr>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          Team
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          PTS
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          RBS
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          AST
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          STL
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          BLK
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          FGA
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          FGM
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          3PA
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          3PM
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          FTA
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-bold text-gray-900 px-1 py-2"
                        >
                          FTM
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {totalstats.map((stat) => (
                        <tr key={stat.id} className="bg-white border-b">
                          <td className="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                          {TeamsName[stat.TeamId]}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Points}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Rebounds}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Assists}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Steals}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Blocks}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FeildGoalsAttempted}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FeildGoalsMade}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.ThreePointersAttempted}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.ThreePointersMade}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FreeThrowsAttempted}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FreeThrowsMade}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                </div>
                <div className={openTab === 2 ? "block" : "hidden"}>
                  <h1>{points}</h1>
                  <h1>{rebounds}</h1>
                  <h1>{assists}</h1>
                  <h1>{steals}</h1>
                  <h1>{blocks}</h1>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"}>
                  React JS with Tailwind CSS Tab 3 Content show
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
