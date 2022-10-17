import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";


function Records() {
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
    <div className="bg-gray-200 h-auto border divide-x">
        <div className="">
            <div className="mt-5 lg:ml-36 lg:my-5">
                <div>
                  <h1 className="text-xl font-bold ml-5">Block City Stat Records Per Game</h1>
                </div>
                <div className="lg:grid grid-cols-3 h-auto my-5 px-5">
                    <div className="col-span-1 bg-white rounded-lg py-5 shadow-lg">
                        {/* <h2 className="my-5 text-md font-bold text-gray-800">Points Per Game</h2> */}
                        {/* <ol className="ml-5 list-decimal">
                        {toppoints.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Points}</span> <span>{item.YourDate}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Points Per Game</th>
                              <th className="text-sm text-gray-800 pl-5">PTS</th>
                            </tr>
                          </thead>
                          <tbody>
                          {toppoints.map((item) => (
                            <tr className="even:bg-gray-100 border-t border-b">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">{PlayersName[item.PlayerId]}</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">{item.Points}</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-gray-800">Rebounds Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {toprebounds.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Rebounds}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Rebounds Per Game</th>
                              <th className="text-sm text-gray-800 pl-5">PTS</th>
                            </tr>
                          </thead>
                          <tbody>
                          {toprebounds.map((item) => (
                            <tr className="even:bg-gray-100">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">{PlayersName[item.PlayerId]}</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">{item.Rebounds}</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-gray-800">Assists Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {topassists.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Assists}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Assists Per Game</th>
                              <th className="text-sm text-gray-800 pl-5">AST</th>
                            </tr>
                          </thead>
                          <tbody>
                          {topassists.map((item) => (
                            <tr className="even:bg-gray-100">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">{PlayersName[item.PlayerId]}</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">{item.Assists}</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                </div>
                <div className="lg:grid grid-cols-3 h-auto my-5 px-5">
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-gray-800">Steals Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {topsteals.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Steals}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Steals Per Game</th>
                              <th className="text-sm text-gray-800 pl-5">STL</th>
                            </tr>
                          </thead>
                          <tbody>
                          {topsteals.map((item) => (
                            <tr className="even:bg-gray-100">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">{PlayersName[item.PlayerId]}</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">{item.Steals}</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-gray-800">Blocks Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {topblocks.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Blocks}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Blocks Per Game</th>
                              <th className="text-sm text-gray-800 pl-5">BLK</th>
                            </tr>
                          </thead>
                          <tbody>
                          {topblocks.map((item) => (
                            <tr className="even:bg-gray-100">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">{PlayersName[item.PlayerId]}</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">{item.Blocks}</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-gray-800">Feild Goals Made</h2>
                    <ol className="ml-5 list-decimal">
                        {topfgm.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.FeildGoalsMade}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Feild Goals Made</th>
                              <th className="text-sm text-gray-800 pl-5">FGM</th>
                            </tr>
                          </thead>
                          <tbody>
                          {topfgm.map((item) => (
                            <tr className="even:bg-gray-100">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">{PlayersName[item.PlayerId]}</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">{item.FeildGoalsMade}</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                </div>
                <div className="lg:grid grid-cols-3 h-auto my-5 px-5">
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-gray-800">Three Pointers Made</h2>
                    <ol className="ml-5 list-decimal">
                        {toptpm.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.ThreePointersMade}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Three Pointers Made</th>
                              <th className="text-sm text-gray-800 pl-5">3PM</th>
                            </tr>
                          </thead>
                          <tbody>
                          {toptpm.map((item) => (
                            <tr className="even:bg-gray-100">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">{PlayersName[item.PlayerId]}</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">{item.ThreePointersMade}</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-gray-800">Three Points Percentage</h2>
                    <ol className="ml-5 list-decimal">
                            <b><li>Test <span className="pl-16">24.0</span></li></b>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Three Point Percentage</th>
                              <th className="text-sm text-gray-800 pl-5">PTS</th>
                            </tr>
                          </thead>
                          <tbody>
                          {toppoints.map((item) => (
                            <tr className="even:bg-gray-100">
                              <td className="text-sm pl-5 py-2">Test</td>
                              <td className="text-sm pl-5 py-2">Test</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-gray-800">MVP Points</h2>
                    <ol className="ml-5 list-decimal">
                            <b><li>Test <span className="pl-16">24.0</span></li></b>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">MVP Points</th>
                              <th className="text-sm text-gray-800 pl-5">PTS</th>
                            </tr>
                          </thead>
                          <tbody>
                          {toppoints.map((item) => (
                            <tr className="even:bg-gray-100">
                              <td className="text-sm pl-5 py-2">Test</td>
                              <td className="text-sm pl-5 py-2">Test</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                </div>
                </div>
        </div>
    </div>
  );
}

export default Records;