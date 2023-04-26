import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Stat = () => {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState([]);
  const [latestYear, setLatestYear] = useState("");
  const [showMen, setShowMen] = useState(true);

  useEffect(() => {
    fetchPlayers();
    getStats();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  async function getStats() {
    const { data } = await supabase.from("stats").select();
    setStats(data);
    // console.log(data);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  useEffect(() => {
    // compute latest year from stats and update state with setLatestYear
    const year = getLatestYear(stats);
      if (year !== null) {
        setLatestYear(year);
      }
  }, [stats]);
  
  function getLatestYear(data) {
    let latestYear = null;
    for (let i = 0; i < data.length; i++) {
      const year = new Date(data[i].YourDate).getFullYear();
      if (latestYear === null || year > latestYear) {
        latestYear = year;
      }
    }
    return latestYear;    
  }   

  function getTop5AverageStatsByPlayerId(data, year, statType, sexId) {
    const filteredData = data.filter(item => item.Season === year && (sexId === undefined || item.sex_id === sexId));
    const totalStatsByPlayerId = {};
    const numGamesByPlayerId = {};
  
    filteredData.forEach(item => {
      const { PlayerId, [statType]: stat } = item;
      if (!totalStatsByPlayerId[PlayerId]) {
        totalStatsByPlayerId[PlayerId] = 0;
        numGamesByPlayerId[PlayerId] = 0;
      }
      totalStatsByPlayerId[PlayerId] += stat;
      numGamesByPlayerId[PlayerId]++;
    });
  
    const averageStatsByPlayerId = {};
    let numPlayersWithThreeOrMoreOccurrences = 0;
    for (const playerId in totalStatsByPlayerId) {
      const totalStats = totalStatsByPlayerId[playerId];
      const numGames = numGamesByPlayerId[playerId];
      const averageStats = totalStats / numGames;
      if (numGames >= 3) {
        averageStatsByPlayerId[playerId] = averageStats;
        numPlayersWithThreeOrMoreOccurrences++;
      } else if (numPlayersWithThreeOrMoreOccurrences === 0) {
        averageStatsByPlayerId[playerId] = averageStats;
      }
    }
  
    const top5PlayerIds = Object.keys(averageStatsByPlayerId)
      .sort((a, b) => averageStatsByPlayerId[b] - averageStatsByPlayerId[a])
      .slice(0, numPlayersWithThreeOrMoreOccurrences > 0 ? 5 : 5);
  
    const top5Averages = top5PlayerIds.map(playerId => ({
      playerId,
      [statType]: averageStatsByPlayerId[playerId]
    }));
  
    return top5Averages;
  }
  
  const year = latestYear;
  const top5PointsAverages = getTop5AverageStatsByPlayerId(stats, year, "Points");  
  const top5ReboundsAverages = getTop5AverageStatsByPlayerId(stats, year, "Rebounds");  
  const top5AssistsAverages = getTop5AverageStatsByPlayerId(stats, year, "Assists");  
  const top5StealsAverages = getTop5AverageStatsByPlayerId(stats, year, "Steals");  
  const top5BlocksAverages = getTop5AverageStatsByPlayerId(stats, year, "Blocks");

  const top5PointsAveragesM = getTop5AverageStatsByPlayerId(stats, year, "Points", 1);  
  const top5ReboundsAveragesM = getTop5AverageStatsByPlayerId(stats, year, "Rebounds", 1);  
  const top5AssistsAveragesM = getTop5AverageStatsByPlayerId(stats, year, "Assists", 1);  
  const top5StealsAveragesM = getTop5AverageStatsByPlayerId(stats, year, "Steals", 1);  
  const top5BlocksAveragesM = getTop5AverageStatsByPlayerId(stats, year, "Blocks", 1);

  const top5PointsAveragesW = getTop5AverageStatsByPlayerId(stats, year, "Points", 2);    
  const top5ReboundsAveragesW = getTop5AverageStatsByPlayerId(stats, year, "Rebounds", 2);  
  const top5AssistsAveragesW = getTop5AverageStatsByPlayerId(stats, year, "Assists", 2);  
  const top5StealsAveragesW = getTop5AverageStatsByPlayerId(stats, year, "Steals", 2);  
  const top5BlocksAveragesW = getTop5AverageStatsByPlayerId(stats, year, "Blocks", 2);

  const handleMenClick = () => {
    setShowMen(true);
  };

  const handleWomenClick = () => {
    setShowMen(false);
  };

  const statsToDisplay = showMen
    ? {
        points: top5PointsAveragesM,
        rebounds: top5ReboundsAveragesM,
        assists: top5AssistsAveragesM,
        steals: top5StealsAveragesM,
        blocks: top5BlocksAveragesM,
      }
    : {
        points: top5PointsAveragesW,
        rebounds: top5ReboundsAveragesW,
        assists: top5AssistsAveragesW,
        steals: top5StealsAveragesW,
        blocks: top5BlocksAveragesW,
      };

  return (
    <div className="h-auto bg-gray-200">
      <div className="flex items-center justify-center space-x-[20px] bg-white h-[40px]">
        <div>
          <p className="font-display -ml-[50px]">STATS</p>
        </div>
        <div className="border border-black h-[25px]"></div>
        <div>
          <Link to={`/stat/`}>
            <p className="text-sm">Leaders</p>
          </Link>
        </div>
        <div>
          <Link to={`/records/`}>
            <p className="text-sm">Records</p>
          </Link>
        </div>
        <div>
          <Link to={`/totalstats/`}>
            <p className="text-sm">Totals</p>
          </Link>
        </div>
        <div>
          <Link to={`/averagestats/`}>
            <p className="text-sm">Averages</p>
          </Link>
        </div>
      </div>

      <div className="bg-gray-200 h-auto border divide-x">
        <div className="">
          {loading ? (
            <div className="grid h-screen place-items-center">
              <ClipLoader
                size={30}
                color={"#F37A24"}
                loading={loading}
                className="mb-24"
              />
            </div>
          ) : (
            <div>
            <div className="flex mb-4">
        <button
          className={`${
            showMen ? "bg-gray-900 text-white" : "bg-gray-200"
          } py-2 px-4 font-semibold rounded-l-lg`}
          onClick={handleMenClick}
        >
          Men's Stats
        </button>
        <button
          className={`${
            !showMen ? "bg-gray-900 text-white" : "bg-gray-200"
          } py-2 px-4 font-semibold rounded-l-lg`}
          onClick={handleWomenClick}
        >
          Women's Stats
        </button>
      </div>
              <div className="mt-6 bg-white">
                <h1 className="pl-6 font-display text-xl">SEASON LEADERS</h1>
                <hr />
              </div>
              <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">
                  POINTS PER GAME
                </p>
                <hr />
                <div className="flex flex-col -space-y-[12px]">
                  {statsToDisplay.points.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <p
                          className={`text-sm pl-10 ${
                            index === 0 ? "font-bold" : ""
                          }`}
                        >
                          {index + 1}.
                        </p>
                        <Link to={`/stats/${item.playerId}`}>
                          <p
                            className={`text-sm pl-2 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Points.toFixed(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">
                  REBOUNDS PER GAME
                </p>
                <hr />
                <div className="flex flex-col -space-y-[12px]">
                  {statsToDisplay.rebounds.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <p
                          className={`text-sm pl-10 ${
                            index === 0 ? "font-bold" : ""
                          }`}
                        >
                          {index + 1}.
                        </p>
                        <Link to={`/stats/${item.playerId}`}>
                          <p
                            className={`text-sm pl-2 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Rebounds.toFixed(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">
                  ASSISTS PER GAME
                </p>
                <hr />
                <div className="flex flex-col -space-y-[12px]">
                  {statsToDisplay.assists.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <p
                          className={`text-sm pl-10 ${
                            index === 0 ? "font-bold" : ""
                          }`}
                        >
                          {index + 1}.
                        </p>
                        <Link to={`/stats/${item.playerId}`}>
                          <p
                            className={`text-sm pl-2 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Assists.toFixed(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">
                  STEALS PER GAME
                </p>
                <hr />
                <div className="flex flex-col -space-y-[12px]">
                  {statsToDisplay.steals.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <p
                          className={`text-sm pl-10 ${
                            index === 0 ? "font-bold" : ""
                          }`}
                        >
                          {index + 1}.
                        </p>
                        <Link to={`/stats/${item.playerId}`}>
                          <p
                            className={`text-sm pl-2 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Steals.toFixed(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">
                  BLOCKS PER GAME
                </p>
                <hr />
                <div className="flex flex-col -space-y-[12px]">
                  {statsToDisplay.blocks.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <p
                          className={`text-sm pl-10 ${
                            index === 0 ? "font-bold" : ""
                          }`}
                        >
                          {index + 1}.
                        </p>
                        <Link to={`/stats/${item.playerId}`}>
                          <p
                            className={`text-sm pl-2 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Blocks.toFixed(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stat;
