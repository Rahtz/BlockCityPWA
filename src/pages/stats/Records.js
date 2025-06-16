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
    fetchStats();
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
    const filteredPlayers = playersArray.filter(
      (player) => player.sex_id === sex_id
    );
    const sortedPlayers = filteredPlayers.sort((a, b) => b[stat] - a[stat]);
    const top5Players = sortedPlayers.slice(0, 5);
    return top5Players.map((player) => ({
      playerId: player.PlayerId,
      [stat]: player[stat],
      date: player.YourDate
    }));
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
    : showWomen
    ? {
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
    : {
        points: top5PointsS,
        rebounds: top5ReboundsS,
        assists: top5AssistsS,
        steals: top5StealsS,
        blocks: top5BlocksS,
        tpm: top53pmS,
        ftm: top5FtmS,
        turnovers: top5TurnoversS,
        mvppoints: top5MvpPointsS
      };

  const StatCategory = ({ title, data, statKey }) => (
    <div className="stat-category p-1">
      <div className="flex justify-between items-center py-1 border-y border-gray-300">
        <h2 className="text-sm font-semibold pl-1">{title}</h2>
        <h2 className="text-sm font-semibold pr-1">{title === "3-Pointers Made" ? "3PM" : title === "Free Throws Made" ? "FTM" : title === "MVP Points" ? "MVP" : title.slice(0, 3).toUpperCase()}</h2>
      </div>
      <ul className="list-none p-0">
        {data.map((item, index) => (
          <Link to={`/stats/${item.playerId}`} key={index}>
            <li className={`flex items-center justify-between py-3 border-b border-gray-100 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}>
              <span className="w-6 text-center text-xs">{index + 1}.</span>
              <span className="flex-grow text-xs">{PlayersName[item.playerId]}</span>
              <div className="text-right pr-1">
                <span className="text-xs font-semibold">{item[statKey]}</span>
                <span className="text-xs text-gray-500 ml-2">{(item.date).split('-')[0]}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="h-auto bg-gray-200 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center space-x-[20px] bg-white h-[40px] w-full mb-2 px-1 py-1">
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={30} color={"#F37A24"} loading={loading} />
        </div>
      ) : (
        <div className="p-4 lg:w-8/12 h-8/12 w-full rounded-xl bg-white">
          <h1 className="font-display lg:text-2xl mb-6">Club Records</h1>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleMenClick}
              className={`px-4 py-2 w-4/12 border-b-2 border-transparent hover:border-red-600 focus:outline-none ${
                showMen ? "border-red-600" : ""
              }`}
            >
              Mens
            </button>
            <button
              onClick={handleWomenClick}
              className={`px-4 py-2 w-4/12 border-b-2 border-transparent hover:border-red-600 focus:outline-none ${
                showWomen ? "border-red-600" : ""
              }`}
            >
              Womens
            </button>
            <button
              onClick={handleSocialClick}
              className={`px-4 py-2 w-4/12 border-b-2 border-transparent hover:border-red-600 focus:outline-none ${
                showSocial ? "border-red-600" : ""
              }`}
            >
              Social
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCategory title="Points" data={statsToDisplay.points} statKey="Points" />
            <StatCategory title="Rebounds" data={statsToDisplay.rebounds} statKey="Rebounds" />
            <StatCategory title="Assists" data={statsToDisplay.assists} statKey="Assists" />
            <StatCategory title="Steals" data={statsToDisplay.steals} statKey="Steals" />
            <StatCategory title="Blocks" data={statsToDisplay.blocks} statKey="Blocks" />
            <StatCategory title="3-Pointers Made" data={statsToDisplay.tpm} statKey="ThreePointersMade" />
            <StatCategory title="Free Throws Made" data={statsToDisplay.ftm} statKey="FreeThrowsMade" />
            <StatCategory title="Turnovers" data={statsToDisplay.turnovers} statKey="Turnovers" />
            <StatCategory title="MVP Points" data={statsToDisplay.mvppoints} statKey="MvpPoints" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Records;
