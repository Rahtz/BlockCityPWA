import { useState, useEffect } from "react";
import { supabase } from "./client";
import ClipLoader from "react-spinners/ClipLoader";

function Stats() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [averagestats, setAverageStats] = useState([]);
//   const [stat, setStat] = useState({
//     YourDate: "",
//     PlayerId: "",
//     TeamId: "",
//     Points: "",
//     Rebounds: "",
//     Assists: "",
//     Steals: "",
//     Blocks: "",
//     FeildGoalsAttempted: "",
//     FeildGoalsMade: "",
//     ThreePointersAttempted: "",
//     ThreePointersMade: "",
//     FreeThrowsAttempted: "",
//     FreeThrowsMade: "",
//   });
//   const {
//     YourDate,
//     PlayerId,
//     TeamId,
//     Points,
//     Rebounds,
//     Assists,
//     Steals,
//     Blocks,
//     FeildGoalsAttempted,
//     FeildGoalsMade,
//     ThreePointersAttempted,
//     ThreePointersMade,
//     FreeThrowsAttempted,
//     FreeThrowsMade,
//   } = stat;

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    fetchAverageStats();
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, []);

  


  async function fetchAverageStats() {
    const { data } = await supabase.rpc('averagestats');
    console.log(data);
    setAverageStats(data);
    
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
            <th scope="col" className="py-2 px-2">Team</th>
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
          {averagestats.map((stat) => (
            <tr key={stat.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-xs">
              <th scope="row" className="py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {PlayersName[stat.PlayerId]}
              </th>
              <td className="py-2 px-2">
                {TeamsName[stat.TeamId]}
              </td>
              <td className="py-2 px-2 text-center">{stat.Points.toFixed(1)}</td>
              <td className="py-2 px-2 text-center">{stat.Rebounds.toFixed(1)}</td>
              <td className="py-2 px-2 text-center">{stat.Assists.toFixed(1)}</td>
              <td className="py-2 px-2 text-center">{stat.Steals.toFixed(1)}</td>
              <td className="py-2 px-2 text-center">{stat.Blocks.toFixed(1)}</td>
              <td className="py-2 px-2 text-center">
                {stat.FeildGoalsAttempted.toFixed(1)}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.FeildGoalsMade.toFixed(1)}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.ThreePointersAttempted.toFixed(1)}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.ThreePointersMade.toFixed(1)}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.FreeThrowsAttempted.toFixed(1)}
              </td>
              <td className="py-2 px-2 text-center">
                {stat.FreeThrowsMade.toFixed(1)}
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