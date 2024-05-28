import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchPlayers,
  getStats,
  getPlayerNameMap,
} from "../../services/dbFunctions";

const Stat = () => {
  const [stats, setStats] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedSexId, setSelectedSexId] = useState(1);

  const [topPoints, setTopPoints] = useState([]);
  const [topRebounds, setTopRebounds] = useState([]);
  const [topAssists, setTopAssists] = useState([]);
  const [topSteals, setTopSteals] = useState([]);
  const [topBlocks, setTopBlocks] = useState([]);
  const [topTurnovers, setTopTurnovers] = useState([]);
  const [topThreePointersMade, setTopThreePointersMade] = useState([]);
  const [topFreeThrowsMade, setTopFreeThrowsMade] = useState([]);
  const [topMvpPoints, setTopMvpPoints] = useState([]);

  const getPlayerName = getPlayerNameMap(players);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getStats();
        const currentYear = new Date().getFullYear();
        const currentYearStats = statsData.filter(
          (stat) => stat.Season === currentYear
        );
        setStats(currentYearStats);

        const playersData = await fetchPlayers();
        setPlayers(playersData);

        calculateTopPlayers(currentYearStats, selectedSexId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    calculateTopPlayers(stats, selectedSexId);
  }, [stats, selectedSexId]);

  const calculateTopPlayers = (statsData, sexId) => {
    const filteredStats = statsData.filter((stat) => stat.sex_id === sexId);

    const categories = [
      "Points",
      "Rebounds",
      "Assists",
      "Steals",
      "Blocks",
      "Turnovers",
      "ThreePointersMade",
      "FreeThrowsMade",
      "MvpPoints",
    ];
    const topPlayers = {};

    categories.forEach((category) => {
      const playerStats = filteredStats.reduce((acc, stat) => {
        if (!acc[stat.PlayerId]) {
          acc[stat.PlayerId] = [];
        }
        acc[stat.PlayerId].push(stat);
        return acc;
      }, {});

      const qualifiedPlayers = Object.keys(playerStats).filter(
        (playerId) => playerStats[playerId].length >= 3
      );

      const averageStatsPerPlayer = qualifiedPlayers.map((playerId) => {
        const games = playerStats[playerId];
        const totalCategoryPoints = games.reduce(
          (sum, game) => sum + (game[category] || 0),
          0
        );
        const averageCategoryPoints = totalCategoryPoints / games.length;
        return {
          playerId,
          averageCategoryPoints,
        };
      });

      topPlayers[category] = averageStatsPerPlayer
        .sort((a, b) => b.averageCategoryPoints - a.averageCategoryPoints)
        .slice(0, 5);
    });

    setTopPoints(topPlayers.Points);
    setTopRebounds(topPlayers.Rebounds);
    setTopAssists(topPlayers.Assists);
    setTopSteals(topPlayers.Steals);
    setTopBlocks(topPlayers.Blocks);
    setTopTurnovers(topPlayers.Turnovers);
    setTopThreePointersMade(topPlayers.ThreePointersMade);
    setTopFreeThrowsMade(topPlayers.FreeThrowsMade);
    setTopMvpPoints(topPlayers.MvpPoints);
  };
  return (
    <div className="h-auto bg-gray-200 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center space-x-[20px] bg-white h-[40px] w-full mb-2 px-1 py-1">
        <div>
          <p className="font-display lg:-ml-[50px] lg:text-lg">
            Club Stat Leaders {new Date().getFullYear()}
          </p>
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

      <div className="p-4 lg:w-8/12 h-8/12 w-full rounded-xl bg-white">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedSexId(1)}
            className={`px-4 py-2 w-4/12 border-b-2 border-transparent hover:border-red-600 focus:outline-none ${
              selectedSexId === 1 ? "border-red-600" : ""
            }`}
          >
            Male
          </button>
          <button
            onClick={() => setSelectedSexId(2)}
            className={`px-4 py-2 w-4/12 border-b-2 border-transparent hover:border-red-600 focus:outline-none ${
              selectedSexId === 2 ? "border-red-600" : ""
            }`}
          >
            Female
          </button>
          <button
            onClick={() => setSelectedSexId(3)}
            className={`px-4 py-2 w-4/12 border-b-2 border-transparent hover:border-red-600 focus:outline-none ${
              selectedSexId === 3 ? "border-red-600" : ""
            }`}
          >
            Social
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-category p-1">
            <div className="flex justify-between items-center py-1 border-y border-gray-300">
              <h2 className="text-sm font-semibold pl-1">Points</h2>
              <h2 className="text-sm font-semibold pr-1">PTS</h2>
            </div>
            <ul className="list-none p-0">
              {topPoints.map((player, index) => (
                <Link to={`/stats/${player.playerId}`}>
                  <li
                    key={player.playerId}
                    className={`flex items-center justify-between py-3 border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <span className="w-6 text-center text-xs">
                      {index + 1}.
                    </span>
                    <span className="flex-grow text-xs">
                      {getPlayerName(player.playerId)}
                    </span>
                    <span className="text-right pr-1 text-xs">
                      {player.averageCategoryPoints.toFixed(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="stat-category p-1">
            <div className="flex justify-between items-center py-1 border-y border-gray-300">
              <h2 className="text-sm font-semibold pl-1">Rebounds</h2>
              <h2 className="text-sm font-semibold pr-1">REB</h2>
            </div>
            <ul className="list-none p-0">
              {topRebounds.map((player, index) => (
                <Link to={`/stats/${player.playerId}`}>
                  <li
                    key={player.playerId}
                    className={`flex items-center justify-between py-3 border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <span className="w-6 text-center text-xs">
                      {index + 1}.
                    </span>
                    <span className="flex-grow text-xs">
                      {getPlayerName(player.playerId)}
                    </span>
                    <span className="text-right pr-1 text-xs">
                      {player.averageCategoryPoints.toFixed(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="stat-category p-1">
            <div className="flex justify-between items-center py-1 border-y border-gray-300">
              <h2 className="text-sm font-semibold pl-1">Assists</h2>
              <h2 className="text-sm font-semibold pr-1">AST</h2>
            </div>
            <ul className="list-none p-0">
              {topAssists.map((player, index) => (
                <Link to={`/stats/${player.playerId}`}>
                  <li
                    key={player.playerId}
                    className={`flex items-center justify-between py-3 border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <span className="w-6 text-center text-xs">
                      {index + 1}.
                    </span>
                    <span className="flex-grow text-xs">
                      {getPlayerName(player.playerId)}
                    </span>
                    <span className="text-right pr-1 text-xs">
                      {player.averageCategoryPoints.toFixed(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="stat-category p-1">
            <div className="flex justify-between items-center py-1 border-y border-gray-300">
              <h2 className="text-sm font-semibold pl-1">Steals</h2>
              <h2 className="text-sm font-semibold pr-1">STL</h2>
            </div>
            <ul className="list-none p-0">
              {topSteals.map((player, index) => (
                <Link to={`/stats/${player.playerId}`}>
                  <li
                    key={player.playerId}
                    className={`flex items-center justify-between py-3 border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <span className="w-6 text-center text-xs">
                      {index + 1}.
                    </span>
                    <span className="flex-grow text-xs">
                      {getPlayerName(player.playerId)}
                    </span>
                    <span className="text-right pr-1 text-xs">
                      {player.averageCategoryPoints.toFixed(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="stat-category p-1">
            <div className="flex justify-between items-center py-1 border-y border-gray-300">
              <h2 className="text-sm font-semibold pl-1">Blocks</h2>
              <h2 className="text-sm font-semibold pr-1">BLK</h2>
            </div>
            <ul className="list-none p-0">
              {topBlocks.map((player, index) => (
                <Link to={`/stats/${player.playerId}`}>
                  <li
                    key={player.playerId}
                    className={`flex items-center justify-between py-3 border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <span className="w-6 text-center text-xs">
                      {index + 1}.
                    </span>
                    <span className="flex-grow text-xs">
                      {getPlayerName(player.playerId)}
                    </span>
                    <span className="text-right pr-1 text-xs">
                      {player.averageCategoryPoints.toFixed(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="stat-category p-1">
            <div className="flex justify-between items-center py-1 border-y border-gray-300">
              <h2 className="text-sm font-semibold pl-1">Turnovers</h2>
              <h2 className="text-sm font-semibold pr-1">TO</h2>
            </div>
            <ul className="list-none p-0">
              {topTurnovers.map((player, index) => (
                <Link to={`/stats/${player.playerId}`}>
                  <li
                    key={player.playerId}
                    className={`flex items-center justify-between py-3 border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <span className="w-6 text-center text-xs">
                      {index + 1}.
                    </span>
                    <span className="flex-grow text-xs">
                      {getPlayerName(player.playerId)}
                    </span>
                    <span className="text-right pr-1 text-xs">
                      {player.averageCategoryPoints.toFixed(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="stat-category p-1">
            <div className="flex justify-between items-center py-1 border-y border-gray-300">
              <h2 className="text-sm font-semibold pl-1">Three Pointers</h2>
              <h2 className="text-sm font-semibold pr-1">3PM</h2>
            </div>
            <ul className="list-none p-0">
              {topThreePointersMade.map((player, index) => (
                <Link to={`/stats/${player.playerId}`}>
                  <li
                    key={player.playerId}
                    className={`flex items-center justify-between py-3 border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <span className="w-6 text-center text-xs">
                      {index + 1}.
                    </span>
                    <span className="flex-grow text-xs">
                      {getPlayerName(player.playerId)}
                    </span>
                    <span className="text-right pr-1 text-xs">
                      {player.averageCategoryPoints.toFixed(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="stat-category p-1">
            <div className="flex justify-between items-center py-1 border-y border-gray-300">
              <h2 className="text-sm font-semibold pl-1">Free Throws</h2>
              <h2 className="text-sm font-semibold pr-1">FTM</h2>
            </div>
            <ul className="list-none p-0">
              {topFreeThrowsMade.map((player, index) => (
                <Link to={`/stats/${player.playerId}`}>
                  <li
                    key={player.playerId}
                    className={`flex items-center justify-between py-3 border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <span className="w-6 text-center text-xs">
                      {index + 1}.
                    </span>
                    <span className="flex-grow text-xs">
                      {getPlayerName(player.playerId)}
                    </span>
                    <span className="text-right pr-1 text-xs">
                      {player.averageCategoryPoints.toFixed(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="stat-category p-1">
            <div className="flex justify-between items-center py-1 border-y border-gray-300">
              <h2 className="text-sm font-semibold pl-1">MVP Points</h2>
              <h2 className="text-sm font-semibold pr-1">MVP</h2>
            </div>
            <ul className="list-none p-0">
              {topMvpPoints.map((player, index) => (
                <Link to={`/stats/${player.playerId}`}>
                  <li
                    key={player.playerId}
                    className={`flex items-center justify-between py-3 border-b border-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <span className="w-6 text-center text-xs">
                      {index + 1}.
                    </span>
                    <span className="flex-grow text-xs">
                      {getPlayerName(player.playerId)}
                    </span>
                    <span className="text-right pr-1 text-xs">
                      {player.averageCategoryPoints.toFixed(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
