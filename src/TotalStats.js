import { useState, useEffect } from "react";
import { supabase } from "./client";

function Stats() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [totalstats, setTotalStats] = useState([]);

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    fetchTotalStats()
  }, []);

  


  async function fetchTotalStats() {
    const { data } = await supabase.rpc('totalstat');
    console.log(data);
    setTotalStats(data);
    
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
    <div className="grid grid-cols-4 divide-x mt-20">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full col-span-3">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
            <th scope="col" className="py-3 px-6">playerId</th>
            <th scope="col" className="py-3 px-6">teamId</th>
            <th scope="col" className="py-3 px-6">date</th>
            <th scope="col" className="py-3 px-6">Points</th>
            <th scope="col" className="py-3 px-6">Rebounds</th>
            <th scope="col" className="py-3 px-6">Assists</th>
            <th scope="col" className="py-3 px-6">Steals</th>
            <th scope="col" className="py-3 px-6">Blocks</th>
            <th scope="col" className="py-3 px-6">FGA</th>
            <th scope="col" className="py-3 px-6">FGM</th>
            <th scope="col" className="py-3 px-6">3PA</th>
            <th scope="col" className="py-3 px-6">3PM</th>
            <th scope="col" className="py-3 px-6">FTA</th>
            <th scope="col" className="py-3 px-6">FTM</th>
          </tr>
          </thead>
          <tbody>
          {totalstats.map((stat) => (
            <tr key={stat.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {PlayersName[stat.PlayerId]}
              </th>
              <td className="py-4 px-6">
                {TeamsName[stat.TeamId]}
              </td>
              <td className="py-4 px-6">{stat.YourDate}</td>
              <td className="py-4 px-6">{stat.Points}</td>
              <td className="py-4 px-6">{stat.Rebounds}</td>
              <td className="py-4 px-6">{stat.Assists}</td>
              <td className="py-4 px-6">{stat.Steals}</td>
              <td className="py-4 px-6">{stat.Blocks}</td>
              <td className="py-4 px-6">
                {stat.FeildGoalsAttempted}
              </td>
              <td className="py-4 px-6">
                {stat.FeildGoalsMade}
              </td>
              <td className="py-4 px-6">
                {stat.ThreePointersAttempted}
              </td>
              <td className="py-4 px-6">
                {stat.ThreePointersMade}
              </td>
              <td className="py-4 px-6">
                {stat.FreeThrowsAttempted}
              </td>
              <td className="py-4 px-6">
                {stat.FreeThrowsMade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Stats;