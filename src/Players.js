import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";

function Players() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [updatedPlayer, setUpdatedPlayer] = useState({
    PlayerName: "",
    team_id: "",
    birthdate: "",
    position: "",
    number: "",
    highSchool: "",
    weight: "",
    heightFeet: "",
    heightInches: "",
  });

  const [player, setPlayer] = useState({
    PlayerName: "",
    birthdate: "",
    position: "",
    number: "",
    highSchool: "",
    weight: "",
    heightFeet: "",
    heightInches: "",
    team_id: "",
  });
  const {
    PlayerName,
    birthdate,
    position,
    number,
    highSchool,
    weight,
    heightFeet,
    heightInches,
    team_id,
  } = player;

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select("*");
    setTeams(data);
    console.log(data);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  async function createPlayer() {
    await supabase
      .from("players")
      .insert([
        {
          PlayerName,
          birthdate,
          position,
          number,
          highSchool,
          weight,
          heightFeet,
          heightInches,
          team_id,
        },
      ])
      .single();
    setPlayer({
      PlayerName: "",
      birthdate: "",
      position: "",
      number: "",
      highSchool: "",
      weight: "",
      heightFeet: "",
      heightInches: "",
      team_id: "",
    });
    fetchPlayers();
  }

  async function deletePlayer(id) {
    const { data, error } = await supabase
      .from("players")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }

    fetchPlayers();
  }

  function getTeamName(playerId) {
    const player = players.find((player) => player.id === playerId);
    if (!player) {
      return "Unknown Player";
    }
    const team = teams.find((team) => team.id === player.team_id);
    return team ? team.TeamName : "Unknown Team";
  }

  const fetchTableData = async () => {
    const { data, error } = await supabase.from("players").select("*");
    if (error) {
      console.error(error);
    } else {
      setData(data);
    }
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("players")
      .update(updatedPlayer)
      .match({ id: selectedPlayer.id });
    if (error) {
      console.error(error);
    } else {
      setShowModal(false);
      fetchTableData();
      window.location.reload();
    }
  };
  const handleCreateClick = () => {
    setShowCreate(true);
  };

  const handleEditClick = (player) => {
    setSelectedPlayer(player);
    setUpdatedPlayer(player);
    setShowModal(true);
  };

  return (
    <div className="lg:grid divide-x mt-1">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full 
      sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleCreateClick}
        >
          Create Player
        </button>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full col-span-7">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Player Name
              </th>
              <th scope="col" className="py-3 px-6">
                Team
              </th>
              <th scope="col" className="hidden lg:block py-3 px-6">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr
                key={player.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-xs"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/stats/${player.id}`}>{player.PlayerName}</Link>
                </th>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {getTeamName(player.id)}
                </th>
                <td className="py-4 px-6">
                  <button
                    className="hidden lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEditClick(player)}
                  >
                    Edit
                  </button>
                  <button
                    className="hidden lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => deletePlayer(player.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-8 h-5/6 w-auto">
          <h2 className="text-lg font-medium mb-4">Create Player </h2>
          <label className="flex justify-between mb-2">
              <h3>Name:</h3>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              value={PlayerName}
              onChange={(e) =>
                setPlayer({ ...player, PlayerName: e.target.value })
              }
            />
            </label>
            <div className="flex justify-between mb-2">
              <h3>Team:</h3>
            <form
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) =>
                setPlayer({ ...player, team_id: e.target.value })
              }
            >
              <select name="team_id">
    <option value="">--Select a team--</option>
    {teams.map((team) => (
      <option key={team.id} value={team.id}>
        {team.TeamName}
      </option>
    ))}
  </select>
            </form>
            </div>
            <label className="flex justify-between mb-2">
              <h3>Birthdate:</h3>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              placeholder="date"
              value={birthdate}
              onChange={(e) =>
                setPlayer({ ...player, birthdate: e.target.value })
              }
            />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Position:</h3>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="position"
              value={position}
              onChange={(e) =>
                setPlayer({ ...player, position: e.target.value })
              }
            />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Number:</h3>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="number"
              value={number}
              onChange={(e) => setPlayer({ ...player, number: e.target.value })}
            />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Highschool:</h3>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="highSchool"
              value={highSchool}
              onChange={(e) =>
                setPlayer({ ...player, highSchool: e.target.value })
              }
            />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Weight:</h3>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="weight"
              value={weight}
              onChange={(e) => setPlayer({ ...player, weight: e.target.value })}
            />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Feet:</h3>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="heightFeet"
              value={heightFeet}
              onChange={(e) =>
                setPlayer({ ...player, heightFeet: e.target.value })
              }
            />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Inches:</h3>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="heightInches"
              value={heightInches}
              onChange={(e) =>
                setPlayer({ ...player, heightInches: e.target.value })
              }
            />
            </label>
            <div className="button-container">
            <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={createPlayer}
            >
              Create Player
            </button>
          </div>
          </div>
          
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-8 h-5/6 w-auto">
            <h2 className="text-lg font-medium mb-4">Edit Player Details</h2>
            <label className="flex justify-between mb-2">
              <h3>Name:</h3>
              <input
                type="text"
                value={updatedPlayer.PlayerName}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    PlayerName: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
            <div className="flex justify-between mb-2">
              <h3>Team:</h3>
              <select
                value={updatedPlayer.team_id}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    team_id: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.TeamName}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex justify-between mb-2">
              Birthdate:
              <input
                type="date"
                value={updatedPlayer.birthdate}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    birthdate: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Position:</h3>
              <input
                type="text"
                value={updatedPlayer.position}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    position: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Number:</h3>
              <input
                type="text"
                value={updatedPlayer.number}
                onChange={(e) =>
                  setUpdatedPlayer({ ...updatedPlayer, number: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
            <label className="flex justify-between mb-2">
              <h3>High School:</h3>
              <input
                type="text"
                value={updatedPlayer.highSchool}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    highSchool: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Weight:</h3>
              <input
                type="text"
                value={updatedPlayer.weight}
                onChange={(e) =>
                  setUpdatedPlayer({ ...updatedPlayer, weight: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Height Feet:</h3>
              <input
                type="text"
                value={updatedPlayer.heightFeet}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    heightFeet: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
            <label className="flex justify-between mb-2">
              <h3>Height Inches:</h3>
              <input
                type="text"
                value={updatedPlayer.heightInches}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    heightInches: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
            <div className="button-container">
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

export default Players;
