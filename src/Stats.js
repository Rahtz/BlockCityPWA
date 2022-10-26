import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";
import Pagination from './Pagination';

function Stats() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [stat, setStat] = useState({
    YourDate: "",
    PlayerId: "",
    TeamId: "",
    Points: "",
    Rebounds: "",
    Assists: "",
    Steals: "",
    Blocks: "",
    FeildGoalsAttempted: "",
    FeildGoalsMade: "",
    ThreePointersAttempted: "",
    ThreePointersMade: "",
    FreeThrowsAttempted: "",
    FreeThrowsMade: "",
    Season: "",
  });
  const {
    YourDate,
    PlayerId,
    TeamId,
    Points,
    Rebounds,
    Assists,
    Steals,
    Blocks,
    FeildGoalsAttempted,
    FeildGoalsMade,
    ThreePointersAttempted,
    ThreePointersMade,
    FreeThrowsAttempted,
    FreeThrowsMade,
    Season,
  } = stat;

  useEffect(() => {
    fetchStats();
    fetchPlayers();
    fetchTeams();
  }, []);

  async function fetchStats() {
    const { data } = await supabase.from("stats").select();
    setStats(data);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select();
    setTeams(data);
  }

  async function createStat() {
    await supabase
      .from("stats")
      .insert([
        {
          YourDate,
          PlayerId,
          TeamId,
          Points,
          Rebounds,
          Assists,
          Steals,
          Blocks,
          FeildGoalsAttempted,
          FeildGoalsMade,
          ThreePointersAttempted,
          ThreePointersMade,
          FreeThrowsAttempted,
          FreeThrowsMade,
          Season,
        },
      ])
      .single();
    setStat({
      YourDate: "",
      PlayerId: "",
      TeamId: "",
      Points: "",
      Rebounds: "",
      Assists: "",
      Steals: "",
      Blocks: "",
      FeildGoalsAttempted: "",
      FeildGoalsMade: "",
      ThreePointersAttempted: "",
      ThreePointersMade: "",
      FreeThrowsAttempted: "",
      FreeThrowsMade: "",
    });
    fetchStats();
  }

  async function deleteStat(id) {
    const { data, error } = await supabase.from("stats").delete().eq("id", id);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }

    fetchStats();
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  var TeamsName = teams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.TeamName;
    return result;
  }, {});




  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = stats.slice(firstPostIndex, lastPostIndex);



  return (
    <div className="divide-x mt-2 lg:grid grid-cols-4 ">
      <div className="hidden lg:grid grid-cols-3 divide-x col-span-1">
        <div className="col-span-3">
        <div className="grid grid-cols-2 mt-2">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            placeholder="YourDate"
            value={YourDate}
            onChange={(e) => setStat({ ...stat, YourDate: e.target.value })}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={createStat}
          >
            Create Stat
          </button>
        </div>
          {/* <input type="number" placeholder="PlayerId" value={PlayerId} onChange={e => setStat({ ...stat, PlayerId: e.target.value})} /> */}
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={PlayerId}
            onChange={(e) => setStat({ ...stat, PlayerId: e.target.value })}
          >
            <option></option>
            {players.map((player) => (
              <option value={player.id}>{player.PlayerName}</option>
            ))}
          </select>
          {/* <input type="number" placeholder="TeamId" value={TeamId} onChange={e => setStat({ ...stat, TeamId: e.target.value})} /> */}
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={TeamId}
            onChange={(e) => setStat({ ...stat, TeamId: e.target.value })}
          >
            <option></option>
            {teams.map((team) => (
              <option value={team.id}>{team.TeamName}</option>
            ))}
          </select>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="Points"
            value={Points}
            onChange={(e) => setStat({ ...stat, Points: e.target.value })}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="Rebounds"
            value={Rebounds}
            onChange={(e) => setStat({ ...stat, Rebounds: e.target.value })}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="Assists"
            value={Assists}
            onChange={(e) => setStat({ ...stat, Assists: e.target.value })}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="Steals"
            value={Steals}
            onChange={(e) => setStat({ ...stat, Steals: e.target.value })}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="Blocks"
            value={Blocks}
            onChange={(e) => setStat({ ...stat, Blocks: e.target.value })}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="FeildGoalsAttempted"
            value={FeildGoalsAttempted}
            onChange={(e) =>
              setStat({ ...stat, FeildGoalsAttempted: e.target.value })
            }
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="FeildGoalsMade"
            value={FeildGoalsMade}
            onChange={(e) =>
              setStat({ ...stat, FeildGoalsMade: e.target.value })
            }
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="ThreePointersAttempted"
            value={ThreePointersAttempted}
            onChange={(e) =>
              setStat({ ...stat, ThreePointersAttempted: e.target.value })
            }
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="ThreePointersMade"
            value={ThreePointersMade}
            onChange={(e) =>
              setStat({ ...stat, ThreePointersMade: e.target.value })
            }
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="FreeThrowsAttempted"
            value={FreeThrowsAttempted}
            onChange={(e) =>
              setStat({ ...stat, FreeThrowsAttempted: e.target.value })
            }
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="FreeThrowsMade"
            value={FreeThrowsMade}
            onChange={(e) =>
              setStat({ ...stat, FreeThrowsMade: e.target.value })
            }
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            placeholder="Season"
            value={Season}
            onChange={(e) => setStat({ ...stat, Season: e.target.value })}
          />
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto h-screen relative shadow-md sm:rounded-lg mx-1 col-span-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
            <tr>
              <th scope="col" className="py-3 px-1 sticky left-0 bg-gray-200">
                Player
              </th>
              <th scope="col" className="py-3 px-1">
                Team
              </th>
              <th scope="col" className="py-3 px-1">
                date
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                Points
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                Rebounds
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                Assists
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                Steals
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                Blocks
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                FGA
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                FGM
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                3PA
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                3PM
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                FTA
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                FTM
              </th>
              <th scope="col" className="py-3 px-1 text-center">
                Season
              </th>
              <th scope="col" className="hidden md:block py-3 px-1 text-center">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((stat) => (
              <tr
                key={stat.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-xs"
              >
                <th
                  scope="row"
                  className="sticky left-0 bg-white py-4 pl-5 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                >
                  <Link to={`/stats/${stat.PlayerId}`}>
                    {PlayersName[stat.PlayerId]}
                  </Link>
                </th>
                <td>{TeamsName[stat.TeamId]}</td>
                <td className="py-1 px-1">{stat.YourDate}</td>
                <td className="py-1 px-1 text-center">{stat.Points}</td>
                <td className="py-1 px-1 text-center">{stat.Rebounds}</td>
                <td className="py-1 px-1 text-center">{stat.Assists}</td>
                <td className="py-1 px-1 text-center">{stat.Steals}</td>
                <td className="py-1 px-1 text-center">{stat.Blocks}</td>
                <td className="py-1 px-1 text-center">{stat.FeildGoalsAttempted}</td>
                <td className="py-1 px-1 text-center">{stat.FeildGoalsMade}</td>
                <td className="py-1 px-1 text-center">{stat.ThreePointersAttempted}</td>
                <td className="py-1 px-1 text-center">{stat.ThreePointersMade}</td>
                <td className="py-1 px-1 text-center">{stat.FreeThrowsAttempted}</td>
                <td className="py-1 px-1 text-center">{stat.FreeThrowsMade}</td>
                <td className="py-1 px-1 text-center">{stat.Season}</td>
                <td className="py-1 px-1 text-center">
                  <button
                    className="hidden md:block font-medium text-blue-600 dark:text-blue-500 hover:underline "
                    onClick={() => deleteStat(stat.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border border-red-500">
            <div className="inline-flex">
              <Pagination totalPosts={stats.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>
            </div>
          </tfoot>
        </table>
        
      </div>

      
      

      
    </div>
  );
}

export default Stats;
