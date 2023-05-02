import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import ClipLoader from "react-spinners/ClipLoader";

function Stats() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState([]);
  const [sexs, setSexs] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStat, setSelectedStat] = useState(null);
  const [updatedStat, setUpdatedStat] = useState({
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
    sex_id: "",
  });

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
    sex_id: "",
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
    sex_id,
  } = stat;

  useEffect(() => {
    fetchStats();
    fetchPlayers();
    fetchTeams();
    fetchSexs();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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

  async function fetchSexs() {
    const { data } = await supabase.from("Sex").select();
    setSexs(data);
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
          sex_id,
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
      sex_id: "",
    });
    fetchStats();
    setShowCreate(false)
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

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("stats")
      .update(updatedStat)
      .match({ id: selectedStat.id });
    if (error) {
      console.error(error);
    } else {
      window.location.reload();
    }
  };

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  var TeamsName = teams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.TeamName;
    return result;
  }, {});

  const filteredPlayers = players.filter((player) =>
    player.PlayerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPlayers = filteredPlayers.sort((a, b) =>
    a.PlayerName.localeCompare(b.PlayerName)
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateClick = () => {
    setShowCreate(true);
  };

  const handleEditClick = (stat) => {
    setSelectedStat(stat);
    setUpdatedStat(stat);
    setShowModal(true);
  };

  return (
    <div className="divide-x mt-2 lg:grid grid-cols-4 ">
      <div className="grid grid-cols-3 divide-x col-span-1">
        <div className="col-span-3">
          <div className="grid grid-cols-2 mt-2">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleCreateClick}
            >
              Create Stat
            </button>
          </div>
          <div className="ml-2">
          <input
            type="text"
            placeholder="Search by player name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 md:w-auto md:ml-5"
          />
          </div>
          {/* <input type="number" placeholder="PlayerId" value={PlayerId} onChange={e => setStat({ ...stat, PlayerId: e.target.value})} /> */}

          {/* <input type="number" placeholder="TeamId" value={TeamId} onChange={e => setStat({ ...stat, TeamId: e.target.value})} /> */}
        </div>
      </div>
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-3 h-auto w-auto">
            <div className="flex">
              <label className="flex flex-col">
                <h3>Date</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  placeholder="YourDate"
                  value={YourDate}
                  onChange={(e) =>
                    setStat({ ...stat, YourDate: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <h3>Player</h3>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={stat.PlayerId}
                  onChange={(e) =>
                    setStat({ ...stat, PlayerId: e.target.value })
                  }
                >
                  <option></option>
                  <div className="absolute top-0 left-0 right-0">
                    <input
                      type="text"
                      placeholder="Search players"
                      value={searchTerm}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  {sortedPlayers.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.PlayerName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Team</h3>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={TeamId}
                  onChange={(e) => setStat({ ...stat, TeamId: e.target.value })}
                >
                  <option></option>
                  {teams.map((team) => (
                    <option value={team.id}>{team.TeamName}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col">
                <h3>Sex</h3>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={sex_id}
                  onChange={(e) => setStat({ ...stat, sex_id: e.target.value })}
                >
                  <option></option>
                  {sexs.map((sex) => (
                    <option value={sex.id}>{sex.Sex}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Points</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="Points"
                  value={Points}
                  onChange={(e) => setStat({ ...stat, Points: e.target.value })}
                />
              </label>
              <label className="flex flex-col">
                <h3>Rebounds</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="Rebounds"
                  value={Rebounds}
                  onChange={(e) =>
                    setStat({ ...stat, Rebounds: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Assists</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="Assists"
                  value={Assists}
                  onChange={(e) =>
                    setStat({ ...stat, Assists: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <h3>Steals</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="Steals"
                  value={Steals}
                  onChange={(e) => setStat({ ...stat, Steals: e.target.value })}
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Blocks</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="Blocks"
                  value={Blocks}
                  onChange={(e) => setStat({ ...stat, Blocks: e.target.value })}
                />
              </label>
              <label className="flex flex-col">
                <h3>FGA</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="FeildGoalsAttempted"
                  value={FeildGoalsAttempted}
                  onChange={(e) =>
                    setStat({ ...stat, FeildGoalsAttempted: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>FGM</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="FeildGoalsMade"
                  value={FeildGoalsMade}
                  onChange={(e) =>
                    setStat({ ...stat, FeildGoalsMade: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <h3>3PA</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="ThreePointersAttempted"
                  value={ThreePointersAttempted}
                  onChange={(e) =>
                    setStat({ ...stat, ThreePointersAttempted: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>3PM</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="ThreePointersMade"
                  value={ThreePointersMade}
                  onChange={(e) =>
                    setStat({ ...stat, ThreePointersMade: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <h3>FTA</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="FreeThrowsAttempted"
                  value={FreeThrowsAttempted}
                  onChange={(e) =>
                    setStat({ ...stat, FreeThrowsAttempted: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>FTM</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="FreeThrowsMade"
                  value={FreeThrowsMade}
                  onChange={(e) =>
                    setStat({ ...stat, FreeThrowsMade: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <h3>Season</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="Season"
                  value={Season}
                  onChange={(e) => setStat({ ...stat, Season: e.target.value })}
                />
              </label>
            </div>
            <div className="flex justify-center">
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mb-1 mx-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mb-1 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={createStat}
              >
                Create Stat
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto overflow-y-auto h-screen relative shadow-md sm:rounded-lg mx-1 col-span-3">
        {loading ? (
          <div className="grid h-screen place-items-center">
            <ClipLoader
              size={30}
              color={"#F37A24"}
              loading={loading}
              className="mb-24"
            />
          </div>
        ) : (
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
                <th
                  scope="col"
                  className="md:block py-3 px-1 text-center"
                >
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {stats
  .filter((stat) =>
    PlayersName[stat.PlayerId].toLowerCase().includes(searchQuery.toLowerCase())
  )
  .map((stat) => (
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
                  <td className="py-1 px-1 text-center">
                    {stat.FeildGoalsAttempted}
                  </td>
                  <td className="py-1 px-1 text-center">
                    {stat.FeildGoalsMade}
                  </td>
                  <td className="py-1 px-1 text-center">
                    {stat.ThreePointersAttempted}
                  </td>
                  <td className="py-1 px-1 text-center">
                    {stat.ThreePointersMade}
                  </td>
                  <td className="py-1 px-1 text-center">
                    {stat.FreeThrowsAttempted}
                  </td>
                  <td className="py-1 px-1 text-center">
                    {stat.FreeThrowsMade}
                  </td>
                  <td className="py-1 px-1 text-center">{stat.Season}</td>
                  <td className="py-1 px-1 text-center">
                  <button
                      className="lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEditClick(stat)}
                    >
                      Edit
                    </button>
                    <button
                      className="md:block font-medium text-blue-600 dark:text-blue-500 hover:underline "
                      onClick={() => deleteStat(stat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-3 h-5/6 w-auto">
          <h2 className="text-lg font-medium mb-4">Edit Stat Details</h2>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Name:</h3>
                <input
                  type="date"
                  value={updatedStat.YourDate}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      YourDate: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>Player:</h3>
                <input
                  type="text"
                  value={PlayersName[updatedStat.PlayerId]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Team:</h3>
                <input
                  type="text"
                  value={TeamsName[updatedStat.TeamId]}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      TeamId: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>Points:</h3>
                <input
                  type="text"
                  value={updatedStat.Points}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Rebounds:</h3>
                <input
                  type="text"
                  value={updatedStat.Rebounds}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      Rebounds: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>Assists:</h3>
                <input
                  type="text"
                  value={updatedStat.Assists}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      Assists: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Steals:</h3>
                <input
                  type="text"
                  value={updatedStat.Steals}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      Steals: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>Blocks:</h3>
                <input
                  type="text"
                  value={updatedStat.Blocks}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      Blocks: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>FeildGoalsAttempted:</h3>
                <input
                  type="text"
                  value={updatedStat.FeildGoalsAttempted}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      FeildGoalsAttempted: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>FeildGoalsMade:</h3>
                <input
                  type="text"
                  value={updatedStat.FeildGoalsMade}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      FeildGoalsMade: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>ThreePointersAttempted:</h3>
                <input
                  type="text"
                  value={updatedStat.ThreePointersAttempted}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      ThreePointersAttempted: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>ThreePointersMade:</h3>
                <input
                  type="text"
                  value={updatedStat.ThreePointersMade}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      ThreePointersMade: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>FreeThrowsAttempted:</h3>
                <input
                  type="text"
                  value={updatedStat.FreeThrowsAttempted}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      FreeThrowsAttempted: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>FreeThrowsMade:</h3>
                <input
                  type="text"
                  value={updatedStat.FreeThrowsMade}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      FreeThrowsMade: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Season:</h3>
                <input
                  type="text"
                  value={updatedStat.Season}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      Season: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>sex_id:</h3>
                <input
                  type="text"
                  value={updatedStat.sex_id}
                  onChange={(e) =>
                    setUpdatedStat({
                      ...updatedStat,
                      sex_id: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </label>
            </div>
            <div className="flex justify-center">
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
          </div>
      )}
    </div>
  );
}

export default Stats;
