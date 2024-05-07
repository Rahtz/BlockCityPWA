import { useState, useEffect } from "react";
import { supabase } from "../../services/client";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
  fetchPlayers,
  getStats,
  getPlayerNameMap,
  getLatestYear,
} from "../../services/dbFunctions";

const Stat = () => {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState([]);
  const [latestYear, setLatestYear] = useState("");
  const [showMen, setShowMen] = useState(true);
  const [showWomen, setShowWomen] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const getPlayerName = getPlayerNameMap(players);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getStats();
        setStats(statsData);

        const playersData = await fetchPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const year = getLatestYear(stats);
    if (year !== null) {
      setLatestYear(year);
    }
  }, [stats]);

  function getTop5AverageStatsByPlayerId(data, year, statType, sexId) {
    const filteredData = data.filter(
      (item) =>
        item.Season === year && (sexId === undefined || item.sex_id === sexId)
    );
    const totalStatsByPlayerId = {};
    const numGamesByPlayerId = {};

    filteredData.forEach((item) => {
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

    const top5Averages = top5PlayerIds.map((playerId) => ({
      playerId,
      [statType]: averageStatsByPlayerId[playerId],
    }));

    return top5Averages;
  }

  const year = latestYear;

  const top5PointsAveragesM = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Points",
    1
  );
  const top5ReboundsAveragesM = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Rebounds",
    1
  );
  const top5AssistsAveragesM = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Assists",
    1
  );
  const top5StealsAveragesM = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Steals",
    1
  );
  const top5BlocksAveragesM = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Blocks",
    1
  );
  const top5TurnoversAveragesM = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Turnovers",
    1
  );
  const top53PMAveragesM = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "ThreePointersMade",
    1
  );
  const top5FTMAveragesM = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "FreeThrowsMade",
    1
  );
  const top5MVPAveragesM = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "MvpPoints",
    1
  );

  const top5PointsAveragesW = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Points",
    2
  );
  const top5ReboundsAveragesW = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Rebounds",
    2
  );
  const top5AssistsAveragesW = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Assists",
    2
  );
  const top5StealsAveragesW = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Steals",
    2
  );
  const top5BlocksAveragesW = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Blocks",
    2
  );
  const top5TurnoversAveragesW = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Turnovers",
    2
  );
  const top53PMAveragesW = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "ThreePointersMade",
    2
  );
  const top5FTMAveragesW = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "FreeThrowsMade",
    2
  );
  const top5MVPAveragesW = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "MvpPoints",
    2
  );

  const top5PointsAveragesS = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Points",
    3
  );
  const top5ReboundsAveragesS = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Rebounds",
    3
  );
  const top5AssistsAveragesS = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Assists",
    3
  );
  const top5StealsAveragesS = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Steals",
    3
  );
  const top5BlocksAveragesS = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Blocks",
    3
  );
  const top5TurnoversAveragesS = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "Turnovers",
    3
  );
  const top53PMAveragesS = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "ThreePointersMade",
    3
  );
  const top5FTMAveragesS = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "FreeThrowsMade",
    3
  );
  const top5MVPAveragesS = getTop5AverageStatsByPlayerId(
    stats,
    year,
    "MvpPoints",
    3
  );

  const handleMenClick = () => {
    setShowMen(true);
    setShowSocial(false);
    setShowWomen(false);
  };

  const handleWomenClick = () => {
    setShowMen(false);
    setShowSocial(false);
    setShowWomen(true);
  };

  const handleSocialClick = () => {
    setShowMen(false);
    setShowSocial(true);
    setShowWomen(false);
  };

  const statsToDisplay = showMen
    ? {
        points: top5PointsAveragesM,
        rebounds: top5ReboundsAveragesM,
        assists: top5AssistsAveragesM,
        steals: top5StealsAveragesM,
        blocks: top5BlocksAveragesM,
        turnovers: top5TurnoversAveragesM,
        tpm: top53PMAveragesM,
        ftm: top5FTMAveragesM,
        mvp: top5MVPAveragesM,
      }
    : showWomen
    ? {
        points: top5PointsAveragesW,
        rebounds: top5ReboundsAveragesW,
        assists: top5AssistsAveragesW,
        steals: top5StealsAveragesW,
        blocks: top5BlocksAveragesW,
        turnovers: top5TurnoversAveragesW,
        tpm: top53PMAveragesW,
        ftm: top5FTMAveragesW,
        mvp: top5MVPAveragesW,
      }
    : showSocial
    ? {
        points: top5PointsAveragesS,
        rebounds: top5ReboundsAveragesS,
        assists: top5AssistsAveragesS,
        steals: top5StealsAveragesS,
        blocks: top5BlocksAveragesS,
        turnovers: top5TurnoversAveragesS,
        tpm: top53PMAveragesS,
        ftm: top5FTMAveragesS,
        mvp: top5MVPAveragesS,
      }
    : {
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
        tpm: 0,
        ftm: 0,
        mvp: 0,
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
              <div className="lg:flex items-center flex-col">
                <div className="flex my-4">
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
                      showWomen ? "bg-gray-900 text-white" : "bg-gray-200"
                    } py-2 px-4 font-semibold`}
                    onClick={handleWomenClick}
                  >
                    Women's Stats
                  </button>
                  <button
                    className={`${
                      showSocial ? "bg-gray-900 text-white" : "bg-gray-200"
                    } py-2 px-4 font-semibold rounded-r-lg`}
                    onClick={handleSocialClick}
                  >
                    Social Stats
                  </button>
                </div>

                <div className="mt-6 bg-white lg:w-[900px]">
                  <h1 className="pl-6 font-display text-xl lg:text-center">
                    {latestYear} Season Averages
                  </h1>
                  <hr />
                </div>

                <div className="lg:flex">
                  <div className="bg-white lg:w-[300px]">
                    <p className="text-blue-600 font-display pl-8 py-2">
                      POINTS
                    </p>
                    <hr />
                    <div className="flex flex-col -space-y-[12px]">
                      {statsToDisplay.points.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
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
                                {getPlayerName(item.playerId)}
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
                  <div className="bg-white lg:w-[300px]">
                    <p className="text-blue-600 font-display pl-8 py-2">
                      REBOUNDS
                    </p>
                    <hr />
                    <div className="flex flex-col -space-y-[12px]">
                      {statsToDisplay.rebounds.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
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
                                {getPlayerName(item.playerId)}
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
                  <div className="bg-white lg:w-[300px]">
                    <p className="text-blue-600 font-display pl-8 py-2">
                      ASSISTS
                    </p>
                    <hr />
                    <div className="flex flex-col -space-y-[12px]">
                      {statsToDisplay.assists.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
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
                                {getPlayerName(item.playerId)}
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
                </div>
                <div className="lg:flex">
                  <div className="bg-white lg:w-[300px]">
                    <p className="text-blue-600 font-display pl-8 py-2">
                      STEALS
                    </p>
                    <hr />
                    <div className="flex flex-col -space-y-[12px]">
                      {statsToDisplay.steals.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
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
                                {getPlayerName(item.playerId)}
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
                  <div className="bg-white lg:w-[300px]">
                    <p className="text-blue-600 font-display pl-8 py-2">
                      BLOCKS
                    </p>
                    <hr />
                    <div className="flex flex-col -space-y-[12px]">
                      {statsToDisplay.blocks.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
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
                                {getPlayerName(item.playerId)}
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
                  <div className="bg-white lg:w-[300px]">
                    <p className="text-blue-600 font-display pl-8 py-2">
                      TURNOVERS
                    </p>
                    <hr />
                    <div className="flex flex-col -space-y-[12px]">
                      {statsToDisplay.turnovers.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
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
                                {getPlayerName(item.playerId)}
                              </p>
                            </Link>
                          </div>
                          <p
                            className={`text-sm pr-10 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {item.Turnovers.toFixed(1)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:flex">
                  <div className="bg-white lg:w-[300px]">
                    <p className="text-blue-600 font-display pl-8 py-2">
                      THREE POINTERS MADE
                    </p>
                    <hr />
                    <div className="flex flex-col -space-y-[12px]">
                      {statsToDisplay.tpm.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
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
                                {getPlayerName(item.playerId)}
                              </p>
                            </Link>
                          </div>
                          <p
                            className={`text-sm pr-10 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {item.ThreePointersMade.toFixed(1)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white lg:w-[300px]">
                    <p className="text-blue-600 font-display pl-8 py-2">
                      FREE THROWS MADE
                    </p>
                    <hr />
                    <div className="flex flex-col -space-y-[12px]">
                      {statsToDisplay.ftm.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
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
                                {getPlayerName(item.playerId)}
                              </p>
                            </Link>
                          </div>
                          <p
                            className={`text-sm pr-10 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {item.FreeThrowsMade.toFixed(1)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white lg:w-[300px]">
                    <p className="text-blue-600 font-display pl-8 py-2">
                      MVP POINTS
                    </p>
                    <hr />
                    <div className="flex flex-col -space-y-[12px]">
                      {statsToDisplay.mvp.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
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
                                {getPlayerName(item.playerId)}
                              </p>
                            </Link>
                          </div>
                          <p
                            className={`text-sm pr-10 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {item.MvpPoints.toFixed(1)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
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
