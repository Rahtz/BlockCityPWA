import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Stat = () => {

    const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [averagestats, setAverageStats] = useState([]);

  

  useEffect(() => {
    fetchPlayers();
    fetchAverageStats();
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, []);

  async function fetchAverageStats() {
    const { data } = await supabase.rpc('ttaveragestats');
    console.log(data);
    setAverageStats(data);
    
  }

  

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  const getTopPlayers = (stat, key) => {
    const topPlayers = [];
    for (const player of averagestats) {
        if (topPlayers.length < 5) {
          topPlayers.push(player);
        } else {
          const lowestStatPlayer = topPlayers.reduce((min, p) => p[stat] < min[stat] ? p : min, topPlayers[0]);
          if (player[stat] > lowestStatPlayer[stat]) {
            topPlayers[topPlayers.indexOf(lowestStatPlayer)] = player;
          }
        }
      }
      
      topPlayers.sort((a, b) => b[stat] - a[stat]);
      
      return topPlayers.map(player => ({ ...player, playerName: players.find(p => p.id === player.id)?.PlayerName ?? '' }));
  }

    const topPlayerAvgPoints = getTopPlayers('Points');
    const topPlayerAvgRebounds = getTopPlayers('Rebounds');
    const topPlayerAvgAssists = getTopPlayers('Assists');
    const topPlayerAvgSteals = getTopPlayers('Steals');
    const topPlayerAvgBlocks = getTopPlayers('Blocks');


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
            <div className="mt-6 bg-white">
                <h1 className="pl-6 font-display text-xl">SEASON LEADERS</h1>
                <hr/>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">POINTS PER GAME</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {topPlayerAvgPoints.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Points).toFixed(1)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">REBOUNDS PER GAME</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {topPlayerAvgRebounds.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Rebounds).toFixed(1)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">ASSISTS PER GAME</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {topPlayerAvgAssists.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Assists).toFixed(1)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">STEALS PER GAME</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {topPlayerAvgSteals.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Steals).toFixed(1)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">BLOCKS PER GAME</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {topPlayerAvgBlocks.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
                            </Link>
                        </div>
                        <p className={`text-sm pr-10 ${index === 0 ? 'font-bold' : ''}`}>{(item.Blocks).toFixed(1)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>)}
        </div>
    </div>
        
    </div>
  )
}

export default Stat