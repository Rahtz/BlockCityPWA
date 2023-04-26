import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


function Records() {
  const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState([]);
  const [showMen, setShowMen] = useState(true);

  

  useEffect(() => {
    fetchPlayers();
    // fetchTeams();
    // fetchTotalStats()
    fetchStats();
    // getTopTPM();
    // getTopFGM();
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, []);

  async function fetchStats() {
    const { data } = await supabase
      .from("stats")
      .select()
    setStats(data);
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
    const filteredPlayers = playersArray.filter(player => player.sex_id === sex_id);
  
    // Then, sort the filtered players by the specified stat in descending order
    const sortedPlayers = filteredPlayers.sort((a, b) => b[stat] - a[stat]);
  
    // Finally, get the top 5 players (if there are at least 5 players)
    const top5Players = sortedPlayers.slice(0, 5);
  
    // Return an array of objects with the playerId and the specified stat
    return top5Players.map(player => {
      return {
        playerId: player.PlayerId,
        [stat]: player[stat]
      }
    });
  }

    const top5PointsM = getTop5PlayersByStat(stats, "Points", 1);
    const top5AssistsM = getTop5PlayersByStat(stats, "Assists", 1);
    const top5ReboundsM = getTop5PlayersByStat(stats, "Rebounds", 1);
    const top5StealsM = getTop5PlayersByStat(stats, "Steals", 1);
    const top5BlocksM = getTop5PlayersByStat(stats, "Blocks", 1);

    const top5PointsW = getTop5PlayersByStat(stats, "Points", 2);
    const top5AssistsW = getTop5PlayersByStat(stats, "Assists", 2);
    const top5ReboundsW = getTop5PlayersByStat(stats, "Rebounds", 2);
    const top5StealsW = getTop5PlayersByStat(stats, "Steals", 2);
    const top5BlocksW = getTop5PlayersByStat(stats, "Blocks", 2);


    const handleMenClick = () => {
        setShowMen(true);
      };
    
      const handleWomenClick = () => {
        setShowMen(false);
      };
    
      const statsToDisplay = showMen
        ? {
            points: top5PointsM,
            rebounds: top5ReboundsM,
            assists: top5AssistsM,
            steals: top5StealsM,
            blocks: top5BlocksM,
          }
        : {
            points: top5PointsW,
            rebounds: top5ReboundsW,
            assists: top5AssistsW,
            steals: top5StealsW,
            blocks: top5BlocksW,
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
        {
      loading ?(
        <div className="grid h-screen place-items-center">
      <ClipLoader size={30} color={"#F37A24"} loading={loading} className="mb-24"/>
        </div>
      )
      :
      (<div>
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
                <h1 className="pl-6 font-display text-xl">CLUB RECORDS</h1>
                <hr/>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">POINTS</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {statsToDisplay.points.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.playerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.playerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Points)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">REBOUNDS</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {statsToDisplay.rebounds.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.playerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.playerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Rebounds)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">ASSISTS</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {statsToDisplay.assists.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.playerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.playerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Assists)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">STEALS</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {statsToDisplay.steals.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.playerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.playerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Steals)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">BLOCKS</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {statsToDisplay.blocks.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.playerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.playerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Blocks)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>)}
        </div>
    </div>
        
    </div>
  );
}

export default Records;