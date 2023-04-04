import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


function Records() {
  const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([]);
  // const [teams, setTeams] = useState([]);
  // const [stats, setStats] = useState([]);
  // const [totalstats, setTotalStats] = useState([]);
  const [toppoints, setTopPoints] = useState([]);
  const [toprebounds, setTopRebounds] = useState([]);
  const [topassists, setTopAssists] = useState([]);
  const [topsteals, setTopSteals] = useState([]);
  const [topblocks, setTopBlocks] = useState([]);
  const [toptpm, setTopTpm] = useState([]);
  const [topfgm, setTopFgm] = useState([]); 

  

  useEffect(() => {
    fetchPlayers();
    // fetchTeams();
    // fetchTotalStats()
    // fetchStats();
    getTopPoints();
    getTopRebounds();
    getTopAssists();
    getTopSteals();
    getTopBlocks();
    getTopTPM();
    getTopFGM();
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, []);

  // async function fetchStats() {
  //   const { data } = await supabase
  //     .from("stats")
  //     .select()
  //   setStats(data);
  // }

  // async function fetchTotalStats() {
  //   const { data } = await supabase.rpc('totalstat');
  //   setTotalStats(data);    
  // }

  async function getTopPoints(){
    const { data } = await supabase.rpc('gettoppoints');
    setTopPoints(data);
    console.log(data);
  }

  async function getTopRebounds(){
    const { data } = await supabase.rpc('gettoprebounds');
    setTopRebounds(data);
  }

  async function getTopAssists(){
    const { data } = await supabase.rpc('gettopassists');
    setTopAssists(data);
  }

  async function getTopSteals(){
    const { data } = await supabase.rpc('gettopsteals');
    setTopSteals(data);
  }

  async function getTopBlocks(){
    const { data } = await supabase.rpc('gettopblocks');
    setTopBlocks(data);
  }

  async function getTopTPM(){
    const { data } = await supabase.rpc('gettoptpm');
    setTopTpm(data);
  }

  async function getTopFGM() {
    const { data } = await supabase.rpc("gettopfgm").select();
    setTopFgm(data);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  // async function fetchTeams() {
  //   const { data } = await supabase.from("teams").select();
  //   setTeams(data);
  // }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  // var TeamsName = teams.reduce(function (result, currentObject) {
  //   result[currentObject.id] = currentObject.TeamName;
  //   return result;
  // }, {});

 
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
                <h1 className="pl-6 font-display text-xl">CLUB RECORDS</h1>
                <hr/>
            </div>
            <div className="bg-white">
                <p className="text-blue-600 font-display pl-8 py-2">POINTS</p>
                <hr/>
                <div className="flex flex-col -space-y-[12px]">
                    {toppoints.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
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
                    {toprebounds.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
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
                    {topassists.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
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
                    {topsteals.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
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
                    {topblocks.map((item, index) => (
                        <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <p className={`text-sm pl-10 ${index === 0 ? 'font-bold' : ''}`}>{index + 1}.</p>
                            <Link to={`/stats/${item.PlayerId}`}>
                            <p className={`text-sm pl-2 ${index === 0 ? 'font-bold' : ''}`}>{PlayersName[item.PlayerId]}</p>
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