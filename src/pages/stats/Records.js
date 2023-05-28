import { useState, useEffect } from "react";
import { supabase } from "../../services/client";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Records() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState([]);
  const [showMen, setShowMen] = useState(true);
  const [showWomen, setShowWomen] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  useEffect(() => {
    fetchPlayers();
    // fetchTeams();
    // fetchTotalStats()
    fetchStats();
    // getTopTPM();
    // getTopFGM();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  async function fetchStats() {
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
    console.log(allData);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  function getTop5PlayersByStat(playersArray, stat, sex_id) {
    // First, filter the players by sex_id
    const filteredPlayers = playersArray.filter(
      (player) => player.sex_id === sex_id
    );

    // Then, sort the filtered players by the specified stat in descending order
    const sortedPlayers = filteredPlayers.sort((a, b) => b[stat] - a[stat]);

    // Finally, get the top 5 players (if there are at least 5 players)
    const top5Players = sortedPlayers.slice(0, 5);

    // Return an array of objects with the playerId and the specified stat
    return top5Players.map((player) => {
      return {
        playerId: player.PlayerId,
        [stat]: player[stat],
        date: player.YourDate
      };
    });
  }

  const top5PointsM = getTop5PlayersByStat(stats, "Points", 1);
  const top5AssistsM = getTop5PlayersByStat(stats, "Assists", 1);
  const top5ReboundsM = getTop5PlayersByStat(stats, "Rebounds", 1);
  const top5StealsM = getTop5PlayersByStat(stats, "Steals", 1);
  const top5BlocksM = getTop5PlayersByStat(stats, "Blocks", 1);
  const top53pmM = getTop5PlayersByStat(stats, "ThreePointersMade", 1);
  const top5FtmM = getTop5PlayersByStat(stats, "FreeThrowsMade", 1);
  const top5TurnoversM = getTop5PlayersByStat(stats, "Turnovers", 1);
  const top5MvpPointsM = getTop5PlayersByStat(stats, "MvpPoints", 1);

  const top5PointsW = getTop5PlayersByStat(stats, "Points", 2);
  const top5AssistsW = getTop5PlayersByStat(stats, "Assists", 2);
  const top5ReboundsW = getTop5PlayersByStat(stats, "Rebounds", 2);
  const top5StealsW = getTop5PlayersByStat(stats, "Steals", 2);
  const top5BlocksW = getTop5PlayersByStat(stats, "Blocks", 2);
  const top53pmW = getTop5PlayersByStat(stats, "ThreePointersMade", 2);
  const top5FtmW = getTop5PlayersByStat(stats, "FreeThrowsMade", 2);
  const top5TurnoversW = getTop5PlayersByStat(stats, "Turnovers", 2);
  const top5MvpPointsW = getTop5PlayersByStat(stats, "MvpPoints", 2);

  const top5PointsS = getTop5PlayersByStat(stats, "Points", 3);
  const top5AssistsS = getTop5PlayersByStat(stats, "Assists", 3);
  const top5ReboundsS = getTop5PlayersByStat(stats, "Rebounds", 3);
  const top5StealsS = getTop5PlayersByStat(stats, "Steals", 3);
  const top5BlocksS = getTop5PlayersByStat(stats, "Blocks", 3);
  const top53pmS = getTop5PlayersByStat(stats, "ThreePointersMade", 3);
  const top5FtmS = getTop5PlayersByStat(stats, "FreeThrowsMade", 3);
  const top5TurnoversS = getTop5PlayersByStat(stats, "Turnovers", 3);
  const top5MvpPointsS = getTop5PlayersByStat(stats, "MvpPoints", 3);

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
        points: top5PointsM,
        rebounds: top5ReboundsM,
        assists: top5AssistsM,
        steals: top5StealsM,
        blocks: top5BlocksM,
        tpm: top53pmM,
        ftm: top5FtmM,
        turnovers: top5TurnoversM,
        mvppoints: top5MvpPointsM
      }
    : (showWomen ? {
        points: top5PointsW,
        rebounds: top5ReboundsW,
        assists: top5AssistsW,
        steals: top5StealsW,
        blocks: top5BlocksW,
        tpm: top53pmW,
        ftm: top5FtmW,
        turnovers: top5TurnoversW,
        mvppoints: top5MvpPointsW
      }
      : showSocial ? {
        points: top5PointsS,
        rebounds: top5ReboundsS,
        assists: top5AssistsS,
        steals: top5StealsS,
        blocks: top5BlocksS,
        tpm: top53pmS,
        ftm: top5FtmS,
        turnovers: top5TurnoversS,
        mvppoints: top5MvpPointsS
      }
      : {
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        tpm: 0,
        ftm: 0,
        turnovers: 0,
        mvppoints: 0
      })
      ;

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
                <h1 className="pl-6 font-display text-xl lg:text-center">CLUB RECORDS</h1>
                <hr />
              </div>
              <div className="lg:flex">
              <div className="bg-white lg:w-[300px]">
                <p className="text-blue-600 font-display pl-8 py-2">POINTS</p>
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
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 lg:pr-2 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Points} - {(item.date).split('-')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white lg:w-[300px]">
                <p className="text-blue-600 font-display pl-8 py-2">REBOUNDS</p>
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
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 lg:pr-2 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Rebounds} - {(item.date).split('-')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white lg:w-[300px]">
                <p className="text-blue-600 font-display pl-8 py-2">ASSISTS</p>
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
                            className={`text-sm pl-2 lg:pr-2 ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 lg:pr-2 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Assists} - {(item.date).split('-')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              </div>
              <div className="lg:flex">
              <div className="bg-white lg:w-[300px]">
                <p className="text-blue-600 font-display pl-8 py-2">STEALS</p>
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
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 lg:pr-2 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Steals} - {(item.date).split('-')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white lg:w-[300px]">
                <p className="text-blue-600 font-display pl-8 py-2">BLOCKS</p>
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
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 lg:pr-2 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Blocks} - {(item.date).split('-')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white lg:w-[300px]">
                <p className="text-blue-600 font-display pl-8 py-2">
                  Turnovers
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
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 lg:pr-2 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.Turnovers} - {(item.date).split('-')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              </div>
              <div className="lg:flex">
              <div className="bg-white lg:w-[300px]">
                <p className="text-blue-600 font-display pl-8 py-2">Three Pointers Made</p>
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
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 lg:pr-2 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.ThreePointersMade} - {(item.date).split('-')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white lg:w-[300px]">
                <p className="text-blue-600 font-display pl-8 py-2">Free Throws Made</p>
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
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 lg:pr-2 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.FreeThrowsMade} - {(item.date).split('-')[0]}
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
                  {statsToDisplay.mvppoints.map((item, index) => (
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
                            {PlayersName[item.playerId]}
                          </p>
                        </Link>
                      </div>
                      <p
                        className={`text-sm pr-10 lg:pr-2 ${
                          index === 0 ? "font-bold" : ""
                        }`}
                      >
                        {item.MvpPoints} - {(item.date).split('-')[0]}
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
}

export default Records;
