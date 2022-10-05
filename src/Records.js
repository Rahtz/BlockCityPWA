import { useState, useEffect } from "react";
import { supabase } from "./client";


function Records() {
    const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState([]);
  const [totalstats, setTotalStats] = useState([]);
  const [toppoints, setTopPoints] = useState([]);
  const [toprebounds, setTopRebounds] = useState([]);
  const [topassists, setTopAssists] = useState([]);
  const [topsteals, setTopSteals] = useState([]);
  const [topblocks, setTopBlocks] = useState([]);
  const [toptpm, setTopTpm] = useState([]);

  

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    fetchTotalStats()
    fetchStats();
    getTopPoints();
    getTopRebounds();
    getTopAssists();
    getTopSteals();
    getTopBlocks();
    getTopTPM();
  }, []);

  async function fetchStats() {
    const { data } = await supabase
      .from("stats")
      .select()
    setStats(data);
  }

  async function fetchTotalStats() {
    const { data } = await supabase.rpc('totalstat');
    setTotalStats(data);    
  }

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
    <div className="bg-gray-200 h-screen border border-red-500 divide-x mt-16">
        <div className="bg-white mx-96 my-10 h-auto border rounded-lg">
            <div className="ml-36 my-5">
                <h1 className="text-xl font-bold">Club Records Per Game</h1>
                <div className="grid grid-cols-3 h-auto my-5">
                    <div className="col-span-1">
                        <h2 className="my-5 text-md font-bold text-blue-700">Points Per Game</h2>
                        <ol className="ml-5 list-decimal">
                        {toppoints.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Points}</span></li>
                        ))}                  
                        </ol>
                    </div>
                    <div className="col-span-1">
                    <h2 className="my-5 text-md font-bold text-blue-700">Rebounds Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {toprebounds.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Rebounds}</span></li>
                        ))}                  
                        </ol>
                    </div>
                    <div className="col-span-1">
                    <h2 className="my-5 text-md font-bold text-blue-700">Assists Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {topassists.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Assists}</span></li>
                        ))}                  
                        </ol>
                    </div>
                </div>
                <div className="grid grid-cols-3 h-auto my-5">
                    <div className="col-span-1">
                    <h2 className="my-5 text-md font-bold text-blue-700">Steals Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {topsteals.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Steals}</span></li>
                        ))}                  
                        </ol>
                    </div>
                    <div className="col-span-1">
                    <h2 className="my-5 text-md font-bold text-blue-700">Blocks Per Game</h2>
                    <ol className="ml-5 list-decimal">
                        {topblocks.map((item) => (
                          <li>{PlayersName[item.PlayerId]} <span>{item.Blocks}</span></li>
                        ))}                  
                        </ol>
                    </div>
                    <div className="col-span-1">
                    <h2 className="my-5 text-md font-bold text-blue-700">Feild Goal Percentage</h2>
                    <ol className="ml-5 list-decimal">
                            <b><li>Test <span className="pl-16">24.0</span></li></b>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                        </ol>
                    </div>
                </div>
                <div className="grid grid-cols-3 h-auto my-5">
                    <div className="col-span-1">
                    <h2 className="my-5 text-md font-bold text-blue-700">Three Pointers Made</h2>
                    <ol className="ml-5 list-decimal">
                        {toptpm.map((item) => (
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
                        </ol>
                    </div>
                    <div className="col-span-1">
                    <h2 className="my-5 text-md font-bold text-blue-700">MVP Points</h2>
                    <ol className="ml-5 list-decimal">
                            <b><li>Test <span className="pl-16">24.0</span></li></b>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                            <li>Test <span className="pl-16">24.0</span></li>
                        </ol>
                    </div>
                </div>
                </div>
        </div>
    </div>
  );
}

export default Records;