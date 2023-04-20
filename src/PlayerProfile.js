import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./client";
import { useParams } from "react-router-dom";
import Blockcity from "./images/Blockcity.png";
import sengun from "./images/sengun.png";
// import jacob from "./images/jacob.png";
// import jacob1 from "./images/jacob1.png";

function Stats() {
  const [openTab, setOpenTab] = useState(1);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState([]);
  // const [totalstats, setTotalStats] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    //eslint-disable-next-line
    fetchStatsById();
    //eslint-disable-next-line
    // fetchTotalStats();
  }, []);
  

  async function fetchStatsById() {
    const { data } = await supabase
      .from("stats")
      .select()
      .eq("PlayerId", params.id);
    setStats(data);
  }

  // async function fetchTotalStats() {
  //   const { data } = await supabase.rpc('totalstat');
  //   setTotalStats(data);

  // }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select();
    setTeams(data);
  }

  function getTeamName(playerId) {
    const player = players.find((player) => player.id === playerId);
    if (!player) {
      return "Unknown Player";
    }
    const team = teams.find((team) => team.id === player.team_id);
    return team ? team.TeamName : "Unknown Team";
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  var PlayersPosition = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.position;
    return result;
  }, {});

  var PlayersNumber = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.number;
    return result;
  }, {});

  var PlayersBirthdate = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.birthdate;
    return result;
  }, {});

  var PlayersHighSchool = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.highSchool;
    return result;
  }, {});

  var PlayersWeight = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.weight;
    return result;
  }, {});

  var PlayersHeightFeet = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.heightFeet;
    return result;
  }, {});

  var PlayersHeightInches = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.heightInches;
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
  // let seasonBlocks = 0;
  let seasonGames = 0;

  let averageSeasonPoints = 0;
  let averageSeasonRebounds = 0;
  let averageSeasonAssists = 0;
  let averageSeasonSteals = 0;
  // let averageSeasonBlocks = 0;

  stats.forEach((item) => {
    points += item.Points;
    rebounds += item.Rebounds;
    assists += item.Assists;
    steals += item.Steals;
    blocks += item.Blocks;
    if (item.Season === 2022) {
      seasonPoints += item.Points;
      seasonRebounds += item.Rebounds;
      seasonAssists += item.Assists;
      seasonSteals += item.Steals;
      // seasonBlocks += item.Blocks;
      seasonGames += 1;
    }
    averageSeasonPoints = seasonPoints / seasonGames;
    averageSeasonRebounds = seasonRebounds / seasonGames;
    averageSeasonAssists = seasonAssists / seasonGames;
    averageSeasonSteals = seasonSteals / seasonGames;
    // averageSeasonBlocks = seasonBlocks / seasonGames;
  });

  return (
    <div>
      <div className="w-full bg-gray-800">
        <div className="flex w-full h-auto border">
          <div className="block w-3/6">
            <div className="flex items-end w-[150px] h-40 ml-10">
              {" "}
              <img className="object-bottom" src={sengun} alt="pi" />
            </div>
          </div>
          <div className="w-3/6 flex flex-col justify-center items-start">
            <div className="flex flex-col text-white">
              <p className="font-sans font-normal text-xs">
                Block City | #{PlayersNumber[params.id]} |{" "}
                {PlayersPosition[params.id]}
              </p>
              <p className="font-display font-normal text-xl uppercase">
                {PlayersName[params.id]}
              </p>
              {/* <p className="font-display font-normal text-xl uppercase -mt-1">Ratima</p> */}
            </div>
          </div>
        </div>
        <div className="w-full h-16 bg-gray-800 border">
          <div className="flex justify-center space-x-[15px] py-[1px] min-w-2/5">
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                PPG
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {averageSeasonPoints.toFixed(1)}
              </p>
            </div>
            <div className="border border-white mt-[10px] "></div>
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                RPG
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {averageSeasonRebounds.toFixed(1)}
              </p>
            </div>
            <div className="border border-white mt-[10px] "></div>
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                APG
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {averageSeasonAssists.toFixed(1)}
              </p>
            </div>
            <div className="border border-white mt-[10px] "></div>
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                SPG
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {averageSeasonSteals.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-16 bg-gray-800 border">
          <div className="flex justify-center space-x-[100px] py-[1px] min-w-2/5">
            <div className="text-white text-center flex flex-col justify-center text-sm pt-[15px]">
              <p>
                {PlayersHeightFeet[params.id]}'{PlayersHeightInches[params.id]}"
                | {PlayersWeight[params.id]}kg | 25 years
              </p>
            </div>
            <div className="text-white text-center flex flex-col justify-center pt-[10px]">
              <p className="text-xs">DRAFT</p>
              <p>2013 R1 Pick 12</p>
            </div>
          </div>
        </div>
        <div className="w-full h-16 bg-gray-800 border">
          <div className="flex justify-center space-x-[100px] py-[1px] min-w-2/5">
            <div className="text-white text-center flex flex-col justify-center pt-[10px]">
              <p className="text-xs">BIRTHDATE</p>
              <p>{PlayersBirthdate[params.id]}</p>
            </div>
            <div className="text-white text-center flex flex-col justify-center pt-[10px]">
              <p className="text-xs">Team</p>
              <p>{getTeamName(parseInt(params.id))}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-16 bg-gray-800 border">
          <div className="flex justify-center space-x-[100px] py-[1px] min-w-2/5">
            <div className="text-white text-center flex flex-col justify-center pt-[10px]">
              <p className="text-xs">Last Attended</p>
              <p>{PlayersHighSchool[params.id]}</p>
            </div>
            <div className="text-white text-center flex flex-col justify-center pt-[10px]">
              <p className="text-xs">Club Experience</p>
              <p>4 Seasons</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul className="flex overflow-x-auto justify-center items-center space-x-[50px] w-screen h-[40px] bg-white">
          <li className="w-auto">
            <a
              href="#/"
              onClick={() => setOpenTab(1)}
              className={` ${
                openTab === 1 ? "border-b-4 border-black text-white" : ""
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
                openTab === 2 ? "border-b-4 border-black text-white" : ""
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
                openTab === 3 ? "border-b-4 border-black text-white" : ""
              } inline-block px-2 py-1 text-black bg-white`}
            >
              Averages
            </a>
          </li>
        </ul>
      </div>
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
                    {stats.map((stat) => (
                      <tr key={stat.id} className="bg-white border-b">
                        <td className="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900 border-r">
                          <span>{TeamsName[stat.TeamId]}</span>
                          {/* <img className="w-3" src = {Blockcity} alt="BC" /> */}
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
              </div>
              <div className={openTab === 2 ? "block" : "hidden"}>
                <h1>{points}</h1>
                <h1>{rebounds}</h1>
                <h1>{assists}</h1>
                <h1>{steals}</h1>
                <h1>{blocks}</h1>
              </div>
              <div className={openTab === 3 ? "block" : "hidden"}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
