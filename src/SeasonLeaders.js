import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";


function Stats() {
    const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState([]);
  const [totalstats, setTotalStats] = useState([]);
  const [seasonpoints, setSeasonPoints] = useState([]);
  const [seasonrebounds, setSeasonRebounds] = useState([]);
  const [seasonassists, setSeasonAssists] = useState([]);
  const [seasonsteals, setSeasonSteals] = useState([]);
  const [seasonblocks, setSeasonBlocks] = useState([]);
  const [seasontpm, setSeasonTpm] = useState([]);

  

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    fetchTotalStats()
    fetchStats();
    getSeasonPoints();
    getSeasonRebounds();
    getSeasonAssists();
    getSeasonSteals();
    getSeasonBlocks();
    getSeasonTPM();
  }, []);

  async function fetchStats() {
    const { data } = await supabase
      .from("stats")
      .select()
    console.log(data);
    setStats(data);
  }

  async function fetchTotalStats() {
    const { data } = await supabase.rpc('totalstat');
    console.log(data);
    setTotalStats(data);    
  }

  async function getSeasonPoints(){
    const { data } = await supabase.rpc('getseasonpoints');
    console.log(data);
    setSeasonPoints(data);
  }

  async function getSeasonRebounds(){
    const { data } = await supabase.rpc('getseasonrebounds');
    console.log(data);
    setSeasonRebounds(data);
  }

  async function getSeasonAssists(){
    const { data } = await supabase.rpc('getseasonassists');
    console.log(data);
    setSeasonAssists(data);
  }

  async function getSeasonSteals(){
    const { data } = await supabase.rpc('getseasonsteals');
    console.log(data);
    setSeasonSteals(data);
  }

  async function getSeasonBlocks(){
    const { data } = await supabase.rpc('getseasonblocks');
    console.log(data);
    setSeasonBlocks(data);
  }

  async function getSeasonTPM(){
    const { data } = await supabase.rpc('getseasontpm');
    console.log(data);
    setSeasonTpm(data);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select();
    setTeams(data);
  }


  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  var TeamsName = teams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.TeamName;
    return result;
  }, {});

  
  return (
    <div className="bg-gray-200 h-auto border divide-x">
        <div className="">
            <div className="mt-5 lg:ml-36 lg:my-5">
                <h1 className="text-xl font-bold ml-5">Season Leaders</h1>
                <div className="lg:grid grid-cols-3 h-auto my-5 px-5">
                    <div className="col-span-1 bg-white rounded-lg py-5 shadow-lg">
                        {/* <h2 className="my-5 text-md font-bold text-blue-700">Points Per Game</h2>
                        <ol className="ml-5 list-decimal">
                        {seasonpoints.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Points}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Points</th>
                              <th className="text-sm text-gray-800 pl-5">PTS</th>
                            </tr>
                          </thead>
                          <tbody>
                          {seasonpoints.map((item) => (
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
                    {/* <h2 className="my-5 text-md font-bold text-blue-700">Rebounds Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {seasonrebounds.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Rebounds}</span></li>
                        ))}                  
                        </ol>
                    </div>
                    <div className="col-span-1">
                    <h2 className="my-5 text-md font-bold text-blue-700">Assists Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {seasonassists.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Assists}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Rebounds</th>
                              <th className="text-sm text-gray-800 pl-5">RBS</th>
                            </tr>
                          </thead>
                          <tbody>
                          {seasonrebounds.map((item) => (
                            <tr className="even:bg-gray-100 border-t border-b">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">{PlayersName[item.PlayerId]}</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">{item.Rebounds}</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                </div>
                <div className="lg:grid grid-cols-3 h-auto my-5 px-5">
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-blue-700">Steals Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {seasonsteals.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Steals}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Assists</th>
                              <th className="text-sm text-gray-800 pl-5">AST</th>
                            </tr>
                          </thead>
                          <tbody>
                          {seasonassists.map((item) => (
                            <tr className="even:bg-gray-100 border-t border-b">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">{PlayersName[item.PlayerId]}</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">{item.Assists}</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-blue-700">Blocks Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {seasonblocks.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Blocks}</span></li>
                        ))}                  
                        </ol> */}
                        <table className="w-full text-left">
                          <thead className="border-t border-b">
                            <tr>
                              <th className="text-sm text-gray-800 pl-5">Blocks</th>
                              <th className="text-sm text-gray-800 pl-5">BLK</th>
                            </tr>
                          </thead>
                          <tbody>
                          {seasonblocks.map((item) => (
                            <tr className="even:bg-gray-100 border-t border-b">
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
                    {/* <h2 className="my-5 text-md font-bold text-blue-700">Feild Goal Percentage</h2>
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
                              <th className="text-sm text-gray-800 pl-5">Test</th>
                              <th className="text-sm text-gray-800 pl-5">TST</th>
                            </tr>
                          </thead>
                          <tbody>
                          {seasonassists.map((item) => (
                            <tr className="even:bg-gray-100 border-t border-b">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">Test</td>
                              </Link>
                              <td className="text-sm pl-5 py-2">Test</td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                </div>
                <div className="lg:grid grid-cols-3 h-auto my-5 px-5">
                    <div className="col-span-1 bg-white rounded-lg py-5 mt-5 shadow-lg">
                    {/* <h2 className="my-5 text-md font-bold text-blue-700">Three Pointers Made</h2>
                    <ol className="ml-5 list-decimal">
                        {seasontpm.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.ThreePointersMade}</span></li>
                        ))}                  
                        </ol>
                    </div>
                    <div className="col-span-1">
                    <h2 className="my-5 text-md font-bold text-blue-700">Three Points Percentage</h2>
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
                              <th className="text-sm text-gray-800 pl-5">Three Pointers</th>
                              <th className="text-sm text-gray-800 pl-5">3PM</th>
                            </tr>
                          </thead>
                          <tbody>
                          {seasontpm.map((item) => (
                            <tr className="even:bg-gray-100 border-t border-b">
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
                    {/* <h2 className="my-5 text-md font-bold text-blue-700">MVP Points</h2>
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
                              <th className="text-sm text-gray-800 pl-5">Assists</th>
                              <th className="text-sm text-gray-800 pl-5">AST</th>
                            </tr>
                          </thead>
                          <tbody>
                          {seasonassists.map((item) => (
                            <tr className="even:bg-gray-100 border-t border-b">
                              <Link to={`/stats/${item.PlayerId}`}>
                                <td className="text-sm pl-5 py-2">Test</td>
                              </Link>
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

export default Stats;