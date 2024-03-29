 import React from "react";
import { useState, useEffect } from "react";
import { differenceInYears } from "date-fns";
import { supabase } from "../../../services/client";
import { useParams } from "react-router-dom";

function Stats() {
  const [openTab, setOpenTab] = useState(1);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [oppTeams, setOppTeams] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [stats, setStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  // const [totalstats, setTotalStats] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    fetchOppTeams();
    fetchPictures();
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

  async function fetchPictures() {
    const { data } = await supabase.from("pictures").select();
    setPictures(data);
  }
  
  async function fetchOppTeams() {
    const { data } = await supabase.from("oppTeam").select();
    setOppTeams(data);
  }

  function getTeamName(playerId) {
    const player = players.find((player) => player.id === playerId);
    if (!player) {
      return "Unknown Player";
    }
    const team = teams.find((team) => team.id === player.team_id);
    return team ? team.TeamName : "Unknown Team";
  }

  function getPlayerPicture(playerId) {
    const player = players.find((player) => player.id === playerId);
    if (!player) {
      return "Unknown Player";
    }
    const picture = pictures.find(
      (picture) => picture.id === player.picture_id
    );
    return picture ? picture.picture_url : "Unknown Picture";
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  var OppTeamsName = oppTeams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.Name;
    return result;
  }, {});

  var PlayersPosition = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.position;
    return result;
  }, {});

  var PlayersImage = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.avatar_url;
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

  var PlayerPicture = pictures.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.picture_url;
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

  const latestYear = Math.max(...stats.map((item) => item.Season));

  stats.forEach((item) => {
    points += item.Points;
    rebounds += item.Rebounds;
    assists += item.Assists;
    steals += item.Steals;
    blocks += item.Blocks;
    if (item.Season === latestYear) {
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

  let seasonaverageCareerPoints = 0;
  let seasonaverageCareerRebounds = 0;
  let seasonaverageCareerAssists = 0;
  let seasonaverageCareerSteals = 0;
  let seasonaverageCareerBlocks = 0;
  let seasonaverageCareerFGA = 0;
  let seasonaverageCareerFGM = 0;
  let seasonaverageCareer3PA = 0;
  let seasonaverageCareer3PM = 0;
  let seasonaverageCareerFTA = 0;
  let seasonaverageCareerFTM = 0;
  let seasonaverageCareerTurnovers = 0;
  let seasonaverageCareerMVP = 0;
  let seasonaverageCareerGames = 0;

  let averageCareerPoints = 0;
  let averageCareerRebounds = 0;
  let averageCareerAssists = 0;
  let averageCareerSteals = 0;
  let averageCareerBlocks = 0;
  let averageCareerFGA = 0;
  let averageCareerFGM = 0;
  let averageCareer3PA = 0;
  let averageCareer3PM = 0;
  let averageCareerFTA = 0;
  let averageCareerFTM = 0;
  let averageCareerTurnovers = 0;
  let averageCareerMvp = 0;

  stats.forEach((item) => {
    points += item.Points;
    rebounds += item.Rebounds;
    assists += item.Assists;
    steals += item.Steals;
    blocks += item.Blocks;
    if (item.id) {
      seasonaverageCareerPoints += item.Points;
      seasonaverageCareerRebounds += item.Rebounds;
      seasonaverageCareerAssists += item.Assists;
      seasonaverageCareerSteals += item.Steals;
      seasonaverageCareerBlocks += item.Blocks;
      seasonaverageCareerFGA += item.FeildGoalsAttempted;
      seasonaverageCareerFGM += item.FeildGoalsMade;
      seasonaverageCareer3PA += item.ThreePointersAttempted;
      seasonaverageCareer3PM += item.ThreePointersMade;
      seasonaverageCareerFTA += item.FreeThrowsAttempted;
      seasonaverageCareerFTM += item.FreeThrowsMade;
      seasonaverageCareerTurnovers += item.Turnovers;
      seasonaverageCareerMVP += item.MvpPoints;
      seasonaverageCareerGames += 1;
    }
    averageCareerPoints = seasonaverageCareerPoints / seasonaverageCareerGames;
    averageCareerRebounds =
      seasonaverageCareerRebounds / seasonaverageCareerGames;
    averageCareerAssists =
      seasonaverageCareerAssists / seasonaverageCareerGames;
    averageCareerSteals = seasonaverageCareerSteals / seasonaverageCareerGames;
    averageCareerBlocks = seasonaverageCareerBlocks / seasonaverageCareerGames;
    averageCareerFGA = seasonaverageCareerFGA / seasonaverageCareerGames;
    averageCareerFGM = seasonaverageCareerFGM / seasonaverageCareerGames;
    averageCareer3PA = seasonaverageCareer3PA / seasonaverageCareerGames;
    averageCareer3PM = seasonaverageCareer3PM / seasonaverageCareerGames;
    averageCareerFTA = seasonaverageCareerFTA / seasonaverageCareerGames;
    averageCareerFTM = seasonaverageCareerFTM / seasonaverageCareerGames;
    averageCareerTurnovers =
      seasonaverageCareerTurnovers / seasonaverageCareerGames;
    averageCareerMvp = seasonaverageCareerMVP / seasonaverageCareerGames;
  });

  const playerBirthdate = PlayersBirthdate[params.id];
  const playerAge =
    differenceInYears(new Date(playerBirthdate), new Date()) * -1;

  const years = [
    ...new Set(stats.map((item) => parseInt(item.YourDate.substring(0, 4)))),
  ].sort((a, b) => a - b);

  let maxAssists = -Infinity;
  let maxBlocks = -Infinity;
  let maxFGAttempted = -Infinity;
  let maxFGMade = -Infinity;
  let maxFTAttempted = -Infinity;
  let maxFTMade = -Infinity;
  let maxPoints = -Infinity;
  let maxRebounds = -Infinity;
  let maxSteals = -Infinity;
  let maxThreeAttempted = -Infinity;
  let maxThreeMade = -Infinity;

  stats.forEach((stat) => {
    if (stat.Assists > maxAssists) {
      maxAssists = stat.Assists;
    }
    if (stat.Blocks > maxBlocks) {
      maxBlocks = stat.Blocks;
    }
    if (stat.FeildGoalsAttempted > maxFGAttempted) {
      maxFGAttempted = stat.FeildGoalsAttempted;
    }
    if (stat.FeildGoalsMade > maxFGMade) {
      maxFGMade = stat.FeildGoalsMade;
    }
    if (stat.FreeThrowsAttempted > maxFTAttempted) {
      maxFTAttempted = stat.FreeThrowsAttempted;
    }
    if (stat.FreeThrowsMade > maxFTMade) {
      maxFTMade = stat.FreeThrowsMade;
    }
    if (stat.Points > maxPoints) {
      maxPoints = stat.Points;
    }
    if (stat.Rebounds > maxRebounds) {
      maxRebounds = stat.Rebounds;
    }
    if (stat.Steals > maxSteals) {
      maxSteals = stat.Steals;
    }
    if (stat.ThreePointersAttempted > maxThreeAttempted) {
      maxThreeAttempted = stat.ThreePointersAttempted;
    }
    if (stat.ThreePointersMade > maxThreeMade) {
      maxThreeMade = stat.ThreePointersMade;
    }
  });

  const calculateAverages = () => {
    // Group data by year
    const groupedData = stats.reduce((acc, item) => {
      const year = new Date(item.YourDate).getFullYear();

      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(item);
      return acc;
    }, {});

    // Calculate averages for each year
    const averages = {};

    for (const year in groupedData) {
      const yearData = groupedData[year];

      averages[year] = {
        assists: calculateAverage(yearData, "Assists"),
        blocks: calculateAverage(yearData, "Blocks"),
        fieldGoalsAttempted: calculateAverage(yearData, "FeildGoalsAttempted"),
        fieldGoalsMade: calculateAverage(yearData, "FeildGoalsMade"),
        freeThrowsAttempted: calculateAverage(yearData, "FreeThrowsAttempted"),
        freeThrowsMade: calculateAverage(yearData, "FreeThrowsMade"),
        mvpPoints: calculateAverage(yearData, "MvpPoints"),
        points: calculateAverage(yearData, "Points"),
        rebounds: calculateAverage(yearData, "Rebounds"),
        steals: calculateAverage(yearData, "Steals"),
        threePointersAttempted: calculateAverage(
          yearData,
          "ThreePointersAttempted"
        ),
        threePointersMade: calculateAverage(yearData, "ThreePointersMade"),
        turnovers: calculateAverage(yearData, "Turnovers"),
      };
    }

    return averages;
  };

  const calculateAverage = (yearData, property) => {
    const sum = yearData.reduce((total, item) => {
      const value = item[property] || 0;
      return total + value;
    }, 0);

    return sum / yearData.length;
  };

  const averages = calculateAverages();

  const calculateTotals = () => {
    // Group data by year
    const groupedData = stats.reduce((acc, item) => {
      const year = new Date(item.YourDate).getFullYear();

      if (!acc[year]) {
        acc[year] = {
          assists: 0,
          blocks: 0,
          fieldGoalsAttempted: 0,
          fieldGoalsMade: 0,
          freeThrowsAttempted: 0,
          freeThrowsMade: 0,
          mvpPoints: 0,
          points: 0,
          rebounds: 0,
          steals: 0,
          threePointersAttempted: 0,
          threePointersMade: 0,
          turnovers: 0,
        };
      }

      acc[year].assists += item.Assists || 0;
      acc[year].blocks += item.Blocks || 0;
      acc[year].fieldGoalsAttempted += item.FeildGoalsAttempted || 0;
      acc[year].fieldGoalsMade += item.FeildGoalsMade || 0;
      acc[year].freeThrowsAttempted += item.FreeThrowsAttempted || 0;
      acc[year].freeThrowsMade += item.FreeThrowsMade || 0;
      acc[year].mvpPoints += item.MvpPoints || 0;
      acc[year].points += item.Points || 0;
      acc[year].rebounds += item.Rebounds || 0;
      acc[year].steals += item.Steals || 0;
      acc[year].threePointersAttempted += item.ThreePointersAttempted || 0;
      acc[year].threePointersMade += item.ThreePointersMade || 0;
      acc[year].turnovers += item.Turnovers || 0;

      return acc;
    }, {});

    return groupedData;
  };

  const totals = calculateTotals();

  let totalAssists = 0;
  let totalBlocks = -0;
  let totalFGAttempted = -0;
  let totalFGMade = -0;
  let totalFTAttempted = -0;
  let totalFTMade = -0;
  let totalPoints = -0;
  let totalRebounds = -0;
  let totalSteals = -0;
  let totalThreeAttempted = -0;
  let totalThreeMade = -0;
  let totalturnovers = -0;
  let totalmvpPoints = -0;

  stats.forEach((stat) => {
    totalAssists += stat.Assists;
    totalBlocks += stat.Blocks;
    totalFGAttempted += stat.FeildGoalsAttempted;
    totalFGMade += stat.FeildGoalsMade;
    totalFTAttempted += stat.FreeThrowsAttempted;
    totalFTMade += stat.FreeThrowsMade;
    totalPoints += stat.Points;
    totalRebounds += stat.Rebounds;
    totalSteals += stat.Steals;
    totalThreeAttempted += stat.ThreePointersAttempted;
    totalThreeMade += stat.ThreePointersMade;
    totalturnovers += stat.Turnovers;
    totalmvpPoints += stat.MvpPoints;
  });
  // console.log(stats);
  // console.log(totalPoints);

  return (
    <div>
      <div className="w-full bg-gray-800 -mt-2">
        <div className="flex w-full h-auto border">
          <div className="block w-3/6">
            <div className="flex items-end w-[150px] h-40 ml-10">
              <img
                className="object-bottom object-contain w-full h-full" // Use object-contain to scale down the image without squashing
                src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${getPlayerPicture(
                  parseInt(params.id)
                )}`}
                alt="pi"
              />
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
        <div className="w-full h-18 bg-gray-800 border">
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
            <div className="border border-white mt-[10px] "></div>
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                BPG
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {averageSeasonBlocks.toFixed(1)}
              </p>
            </div>
          </div>
          <div className="flex justify-center text-white">
            <h4 className="text-sm">{latestYear} Season Averages</h4>
          </div>
        </div>
        <div className="w-full h-18 bg-gray-800 border">
          <div className="flex justify-center space-x-[15px] py-[1px] min-w-2/5">
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                PTS
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {maxPoints}
              </p>
            </div>
            <div className="border border-white mt-[10px] "></div>
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                RBD
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {maxRebounds}
              </p>
            </div>
            <div className="border border-white mt-[10px] "></div>
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                AST
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {maxAssists}
              </p>
            </div>
            <div className="border border-white mt-[10px] "></div>
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                STL
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {maxSteals}
              </p>
            </div>
            <div className="border border-white mt-[10px] "></div>
            <div className="pt-[10px] flex flex-col justify-center text-center">
              <p className="font-sans font-normal text-xs leading-tight text-white">
                BLK
              </p>
              <p className="uppercase font-display font-normal text-lg leading-none text-white">
                {maxBlocks}
              </p>
            </div>
          </div>
          <div className="flex justify-center text-white">
            <h4 className="text-sm">Player Single Game Records</h4>
          </div>
        </div>
        <div className="w-full h-16 bg-gray-800 border">
          <div className="flex justify-center space-x-[100px] py-[1px] min-w-2/5">
            <div className="text-white text-center flex flex-col justify-center pt-[10px]">
              <p>
                {PlayersHeightFeet[params.id]}'{PlayersHeightInches[params.id]}"
                | {PlayersWeight[params.id]}kg | {playerAge} years
              </p>
            </div>
            <div className="text-white text-center flex flex-col justify-center pt-[10px]">
              <p className="text-xs">BIRTHDATE</p>
              <p>{PlayersBirthdate[params.id]}</p>
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
              <p className="text-xs">Team</p>
              <p>{getTeamName(parseInt(params.id))}</p>
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
              Averages
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
              Totals
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
                <select
                  value={selectedYear || years[years.length - 1]} // Set default value to highest year
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-500 rounded-xl p-1 mb-3"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <table className="relative text-center border-t overflow-x-auto overflow-y-hidden whitespace-nowrap">
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
                        Opposition
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
                        FG%
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
                        3P%
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
                      <th
                        scope="col"
                        className="text-xs font-bold text-gray-900 px-1 py-2"
                      >
                        FT%
                      </th>
                      <th
                        scope="col"
                        className="text-xs font-bold text-gray-900 px-1 py-2"
                      >
                        TO
                      </th>
                      <th
                        scope="col"
                        className="text-xs font-bold text-gray-900 px-1 py-2"
                      >
                        MVP
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats
                      .sort(
                        (a, b) => new Date(b.YourDate) - new Date(a.YourDate)
                      )
                      .filter((item) => {
                        const currentYear = new Date().getFullYear();
                        const latestYear = new Date(
                          stats[0].YourDate
                        ).getFullYear();
                        if (selectedYear) {
                          const selectedYearStart = new Date(
                            `${selectedYear}-01-01`
                          );
                          const selectedYearEnd = new Date(
                            `${selectedYear}-12-31`
                          );
                          const itemDate = new Date(item.YourDate);
                          return (
                            itemDate >= selectedYearStart &&
                            itemDate <= selectedYearEnd
                          );
                        } else {
                          const itemYear = new Date(
                            item.YourDate
                          ).getFullYear();
                          return (
                            itemYear === latestYear || itemYear === currentYear
                          );
                        }
                      })
                      .map((stat) => (
                        <tr key={stat.id} className="bg-white border-b">
                          <td className="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900 border-r">
                            <span>{TeamsName[stat.TeamId]}</span>
                            {/* <img className="w-3" src = {Blockcity} alt="BC" /> */}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {OppTeamsName[stat.OppTeamId]}
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
                            {(
                              (stat.FeildGoalsMade / stat.FeildGoalsAttempted) *
                              100
                            ).toFixed(1) + "%"}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.ThreePointersAttempted}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.ThreePointersMade}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {(
                              (stat.ThreePointersMade /
                                stat.ThreePointersAttempted) *
                              100
                            ).toFixed(1) + "%"}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FreeThrowsAttempted}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.FreeThrowsMade}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {(
                              (stat.FreeThrowsMade / stat.FreeThrowsAttempted) *
                              100
                            ).toFixed(1) + "%"}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.Turnovers}
                          </td>
                          <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                            {stat.MvpPoints}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className={openTab === 2 ? "block" : "hidden"}>
                <table className="relative text-center border-t overflow-x-auto overflow-y-hidden whitespace-nowrap">
                  <thead className="border-b bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="text-xs font-bold text-gray-900 px-1 py-2 border-r"
                      >
                        Year
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
                      <th
                        scope="col"
                        className="text-xs font-bold text-gray-900 px-1 py-2"
                      >
                        TO
                      </th>
                      <th
                        scope="col"
                        className="text-xs font-bold text-gray-900 px-1 py-2"
                      >
                        MVP
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(averages).map(([year, average]) => (
                      <tr key={year} className="bg-white border-b">
                        <td className="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900 border-r">
                          {year}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.points.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.rebounds.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.assists.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.steals.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.blocks.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.fieldGoalsAttempted.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.fieldGoalsMade.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.threePointersAttempted.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.threePointersMade.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.freeThrowsAttempted.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.freeThrowsMade.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.turnovers.toFixed(1)}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {average.mvpPoints.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900 border-r">
                        Total
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerPoints.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerRebounds.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerAssists.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerSteals.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerBlocks.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerFGA.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerFGM.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareer3PA.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareer3PM.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerFTA.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerFTM.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerTurnovers.toFixed(1)}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {averageCareerMvp.toFixed(1)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={openTab === 3 ? "block" : "hidden"}>
                <table className="relative text-center border-t overflow-x-auto overflow-y-hidden whitespace-nowrap">
                  <thead className="border-b bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="text-xs font-bold text-gray-900 px-1 py-2 border-r"
                      >
                        Year
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
                      <th
                        scope="col"
                        className="text-xs font-bold text-gray-900 px-1 py-2"
                      >
                        TO
                      </th>
                      <th
                        scope="col"
                        className="text-xs font-bold text-gray-900 px-1 py-2"
                      >
                        MVP
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(totals).map(([year, total]) => (
                      <tr key={year} className="bg-white border-b">
                        <td className="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900 border-r">
                          {year}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.points}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.rebounds}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.assists}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.steals}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.blocks}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.fieldGoalsAttempted}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.fieldGoalsMade}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.threePointersAttempted}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.threePointersMade}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.freeThrowsAttempted}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.freeThrowsMade}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.turnovers}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                          {total.mvpPoints}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-white border-b">
                      <td className="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900 border-r">
                        Total
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalPoints}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalRebounds}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalAssists}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalSteals}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalBlocks}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalFGAttempted}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalFGMade}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalThreeAttempted}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalThreeMade}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalFTAttempted}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalFTMade}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalturnovers}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {totalmvpPoints}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
