import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";

function Players() {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({ 
    PlayerName: "",
    birthdate: "",
    position: "",
    number: "",
    highSchool: "", 
    weight: "",
    heightFeet: "",
    heightInches: "",
  });
  // const [editplayer, setEditPlayer] = useState({ PlayerName: ""});
  const { 
    PlayerName,
    birthdate,
    position,
    number,
    highSchool,
    weight,
    heightFeet,
    heightInches, 
  } = player;
  // const { EditName } = editplayer;

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
    console.log("data: ", data);
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
      }]).single();
    setPlayer({ 
      PlayerName: "",
      birthdate: "",
      position: "",
      number: "",
      highSchool: "",
      weight: "",
      heightFeet: "",
      heightInches: "", 
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

  // async function editPlayer(id) {
  //     const { data, error } = await supabase
  //         .from('players')
  //         .update({ PlayerName: {EditName} })
  //         .eq('id', id)
  //         if(error) {
  //             console.log(error);
  //         }
  //         if (data) {
  //             console.log(data);
  //         }
  //         setEditPlayer({PlayerName: ""})
  //         fetchPlayers();
  // }

  return (
    <div className="lg:grid grid-cols-10 divide-x mt-1">
    <div className="hidden lg:grid grid-cols-3 divide-x col-span-3">
    <div className="col-span-2">
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Name"
        value={PlayerName}
        onChange={(e) => setPlayer({ ...player, PlayerName: e.target.value })}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="date"
        placeholder="date"
        value={birthdate}
        onChange={(e) => setPlayer({ ...player, birthdate: e.target.value })}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="position"
        value={position}
        onChange={(e) => setPlayer({ ...player, position: e.target.value })}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="number"
        value={number}
        onChange={(e) => setPlayer({ ...player, number: e.target.value })}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="highSchool"
        value={highSchool}
        onChange={(e) => setPlayer({ ...player, highSchool: e.target.value })}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="weight"
        value={weight}
        onChange={(e) => setPlayer({ ...player, weight: e.target.value })}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="heightFeet"
        value={heightFeet}
        onChange={(e) => setPlayer({ ...player, heightFeet: e.target.value })}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="heightInches"
        value={heightInches}
        onChange={(e) => setPlayer({ ...player, heightInches: e.target.value })}
      />
    </div>
    <div className="col-span-1">
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={createPlayer}>Create Player</button>
    </div>
      
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full col-span-7">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">Player Name</th>
                    <th scope="col" className="hidden lg:block py-3 px-6">Options</th>
                </tr>
            </thead>
            <tbody>
            {players.map((player) => (
                <tr key={player.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-xs">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><Link to={`/stats/${player.id}`}>
                    {player.PlayerName}
                  </Link></th>
                <td className="py-4 px-6">
                    <button className="hidden lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => deletePlayer(player.id)}>
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default Players;
