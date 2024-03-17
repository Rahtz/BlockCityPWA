import { useEffect, useState } from "react";
import { supabase } from "../../../services/client";

const ClubLeaders = ({ statisticType }) => {
  const [pictures, setPictures] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchPictures();
    fetchPlayers();
    getStats();
    fetchTeams();
  }, []);

  async function getStats() {
    let allData = [];
    let lastItem = null;

    do {
      const { data, error } = await supabase
        .from("stats")
        .select()
        .limit(1000)
        .gt("id", lastItem?.id || 0)
        .order("id");

      if (error) {
        console.error(error);
        break;
      }

      allData.push(...data);
      lastItem = data[data.length - 1];
    } while (lastItem);

    setStats(allData);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  var PlayersPosition = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.position;
    return result;
  }, {});

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select();
    setTeams(data);
  }

  var TeamsName = teams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.TeamName;
    return result;
  }, {});

  var PlayersTeam = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.team_id;
    return result;
  }, {});

  async function fetchPictures() {
    const { data } = await supabase.from("pictures").select();
    setPictures(data);
  }

  var picture_url = pictures.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.picture_url;
    return result;
  }, {});

  var GameTeam = teams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.logo;
    return result;
  }, {});

  // Step 1: Filter stats data for the selected statistic
  const currentYear = new Date().getFullYear();
  const filteredStats = stats.filter((stat) => {
    const statYear = new Date(stat.YourDate).getFullYear();
    return statYear === currentYear;
  });

  // Step 2: Calculate average stats for the selected statistic
  const playerData = {};

  filteredStats.forEach((stat) => {
    const playerId = stat.PlayerId;
    if (!playerData[playerId]) {
      playerData[playerId] = {
        totalStat: 0,
        occurrences: 0,
      };
    }

    // Use a switch statement to handle different statistic types
    switch (statisticType) {
      case "points":
        playerData[playerId].totalStat += stat.Points;
        break;
      case "assists":
        playerData[playerId].totalStat += stat.Assists;
        break;
      case "rebounds":
        playerData[playerId].totalStat += stat.Rebounds;
        break;
      case "steals":
        playerData[playerId].totalStat += stat.Steals;
        break;
      case "blocks":
        playerData[playerId].totalStat += stat.Blocks;
        break;
      default:
        break;
    }

    playerData[playerId].occurrences++;
  });

  // Step 3: Calculate average stats and filter players with at least 3 occurrences
  const playerAverages = Object.keys(playerData)
    .filter((playerId) => playerData[playerId].occurrences >= 3)
    .map((playerId) => ({
      playerId: parseInt(playerId),
      averageStat:
        playerData[playerId].totalStat / playerData[playerId].occurrences,
    }));

  // Step 4: Sort players by average statistic
  playerAverages.sort((a, b) => b.averageStat - a.averageStat);

  // Step 5: Get the top 5 players with the highest average statistic
  const top5Players = playerAverages.slice(0, 5);

  return (
    <div className="lg:w-[300px] w-auto h-[500px] rounded-xl bg-white">
      <div className="flex h-[220px] w-[300px]">
        {top5Players.length > 0 && (
          <div className="w-1/2 h-full bg-gray-500 rounded-tl-xl pl-5 pt-5">
            <img
              className="w-[50px] h-[50px] mb-3"
              src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${
                picture_url[GameTeam[PlayersTeam[top5Players[0].playerId]]]
              }`}
              alt="AI"
            />
            <h1 className="text-white text-xl font-bold mb-1">
              {PlayersName[top5Players[0].playerId]}
            </h1>

            <h2 className="text-white mb-3">
              {PlayersPosition[top5Players[0].playerId]}
            </h2>

            <h1 className="text-white">
              <span className="font-bold text-xl">
                {top5Players[0].averageStat.toFixed(1)}{" "}
                {statisticType === "points"
                  ? "PPG"
                  : statisticType === "assists"
                  ? "APG"
                  : statisticType === "rebounds"
                  ? "RPG"
                  : statisticType === "steals"
                  ? "SPG"
                  : statisticType === "blocks"
                  ? "BPG"
                  : ""}
              </span>
            </h1>
          </div>
        )}
        <div className="w-1/2 h-full bg-gray-500 rounded-tr-xl"></div>
      </div>
      {top5Players.length > 0 && (
        <div className="rounded-b-xl">
          <div className=" px-7">
            <div className="flex justify-between border-b border-gray-300 ">
              <div className="flex items-center space-x-3">
                <img
                  className="w-[25px] h-[25px]"
                  src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${
                    picture_url[GameTeam[PlayersTeam[top5Players[1].playerId]]]
                  }`}
                  alt="AI"
                />
                <h2 className="py-3">{PlayersName[top5Players[1].playerId]}</h2>
              </div>
              <h1 className="font-bold mt-3">
                {top5Players[1].averageStat.toFixed(1)}
              </h1>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <div className="flex items-center space-x-3">
                <img
                  className="w-[25px] h-[25px]"
                  src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${
                    picture_url[GameTeam[PlayersTeam[top5Players[2].playerId]]]
                  }`}
                  alt="AI"
                />
                <h2 className="py-3">{PlayersName[top5Players[2].playerId]}</h2>
              </div>
              <h1 className="font-bold mt-3">
                {top5Players[2].averageStat.toFixed(1)}
              </h1>
            </div>
            <div className="flex justify-between border-b border-gray-300 ">
              <div className="flex items-center space-x-3">
                <img
                  className="w-[25px] h-[25px]"
                  src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${
                    picture_url[GameTeam[PlayersTeam[top5Players[3].playerId]]]
                  }`}
                  alt="AI"
                />
                <h2 className="py-3">{PlayersName[top5Players[3].playerId]}</h2>
              </div>
              <h1 className="font-bold mt-3">
                {top5Players[3].averageStat.toFixed(1)}
              </h1>
            </div>
            <div className="flex justify-between border-b border-gray-300 ">
              <div className="flex items-center space-x-3">
                <img
                  className="w-[25px] h-[25px]"
                  src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${
                    picture_url[GameTeam[PlayersTeam[top5Players[4].playerId]]]
                  }`}
                  alt="AI"
                />
                <h2 className="py-3">{PlayersName[top5Players[4].playerId]}</h2>
              </div>
              <h1 className="font-bold mt-3">
                {top5Players[4].averageStat.toFixed(1)}
              </h1>
            </div>
          </div>
        </div>
      )}
      <h1 className="pt-5 pr-10 text-right font-bold">View Full Table</h1>
    </div>
  );
};

export default ClubLeaders;
