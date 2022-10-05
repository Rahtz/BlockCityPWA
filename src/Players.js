import { useState, useEffect } from "react";
import { supabase } from "./client";

function Players() {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({ PlayerName: "" });
  // const [editplayer, setEditPlayer] = useState({ PlayerName: ""});
  const { PlayerName } = player;
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
    await supabase.from("players").insert([{ PlayerName }]).single();
    setPlayer({ PlayerName: "" });
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
    <div className="grid grid-cols-10 divide-x mt-20">
    <div className="grid grid-cols-3 divide-x col-span-3">
    <div className="col-span-2">
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-3/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Name"
        value={PlayerName}
        onChange={(e) => setPlayer({ ...player, PlayerName: e.target.value })}
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
                    <th scope="col" className="py-3 px-6">Options</th>
                </tr>
            </thead>
            <tbody>
            {players.map((player) => (
                <tr key={player.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{player.PlayerName}</th>
                <td className="py-4 px-6">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => deletePlayer(player.id)}>
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
