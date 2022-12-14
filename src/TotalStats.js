import { useState, useEffect } from "react";
import { supabase } from "./client";
import ClipLoader from "react-spinners/ClipLoader";

function Stats() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  // const [teams, setTeams] = useState([]);
  const [totalstats, setTotalStats] = useState([]);

  useEffect(() => {
    fetchPlayers();
    // fetchTeams();
    fetchTotalStats()
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000)
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
    <div className="lg:grid grid-cols-4 divide-x mt-2">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full col-span-3">
        {
      loading ?(
        <div className="grid h-screen place-items-center">
      <ClipLoader size={30} color={"#F37A24"} loading={loading} className="mb-24"/>
        </div>
      )
      :
      (<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
            <th scope="col" className="py-2 px-2">Player</th>
            <th scope="col" className="py-2 px-2 text-center">Points</th>
            <th scope="col" className="py-2 px-2 text-center">Rebounds</th>
            <th scope="col" className="py-2 px-2 text-center">Assists</th>
            <th scope="col" className="py-2 px-2 text-center">Steals</th>
            <th scope="col" className="py-2 px-2 text-center">Blocks</th>
            <th scope="col" className="py-2 px-2 text-center">FGA</th>
            <th scope="col" className="py-2 px-2 text-center">FGM</th>
            <th scope="col" className="py-2 px-2 text-center">3PA</th>
            <th scope="col" className="py-2 px-2 text-center">3PM</th>
            <th scope="col" className="py-2 px-2 text-center">FTA</th>
            <th scope="col" className="py-2 px-2 text-center">FTM</th>
          </tr>
          </thead>
          <tbody>
          {totalstats.map((stat) => (
            <tr key={stat.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-xs">
              <th scope="row" className="py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {PlayersName[stat.PlayerId]}
              </th>
              <td className="py-2 px-2 text-center">{stat.Points}</td>
              <td className="py-2 px-2 text-center">{stat.Rebounds}</td>
              <td className="py-2 px-2 text-center">{stat.Assists}</td>
              <td className="py-2 px-2 text-center">{stat.Steals}</td>
              <td className="py-2 px-2 text-center">{stat.Blocks}</td>
              <td className="py-2 px-2 text-center">
                {stat.FeildGoalsAttempted}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.FeildGoalsMade}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.ThreePointersAttempted}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.ThreePointersMade}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.FreeThrowsAttempted}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.FreeThrowsMade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>)}
      </div>
    </div>
  );
}

export default Stats;