import { useState, useEffect } from "react";
import { supabase } from "../../services/client";
import { Link, useParams } from "react-router-dom";

function EditPlayer({ onClose }) {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [updatedPlayer, setUpdatedPlayer] = useState(null);
  const [teams, setTeams] = useState([]);
  const [sexs, setSexs] = useState([]);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    if (id) {
      fetchPlayer(id);
    }
    fetchTeams();
    fetchSexs();
    fetchPictures();
  }, [id]);

  async function fetchPlayer(id) {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setPlayer(data);
      setUpdatedPlayer(data);
    }
  }

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select("*");
    setTeams(data);
  }

  async function fetchSexs() {
    const { data } = await supabase.from("Sex").select();
    setSexs(data);
  }

  async function fetchPictures() {
    const { data } = await supabase.from("pictures").select("*");
    setPictures(data);
  }

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("players")
      .update(updatedPlayer)
      .match({ id: player.id });
    if (error) {
      console.error(error);
    } else {
      onClose(); // Close the modal after successful update
    }
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-3 h-5/6 w-auto">
      <div className="flex space-x-5">
        <h2 className="text-lg font-medium mb-4">Edit Player Details</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={updatedPlayer.isActive}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                isActive: e.target.checked,
              })
            }
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <span className="ml-2 text-gray-700">Active</span>
        </label>
      </div>
      <div className="flex flex-col">
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Name:</h3>
          <input
            type="text"
            value={updatedPlayer.PlayerName}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                PlayerName: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none" // Apply text-right class here
          />
        </label>
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Club Number:</h3>
          <input
            type="text"
            value={updatedPlayer.clubNumber}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                clubNumber: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none bg-white"
            disabled
          />
        </label>
        <div className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Team:</h3>
          <select
            value={updatedPlayer.team_id}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                team_id: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none bg-white"
          >
            <option value="">--Select a Team--</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.TeamName}
              </option>
            ))}
          </select>
        </div>
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Birthdate:</h3>
          <input
            type="date"
            value={updatedPlayer.birthdate}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                birthdate: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none bg-white"
          />
        </label>
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Position:</h3>
          <input
            type="text"
            value={updatedPlayer.position}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                position: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none"
          />
        </label>
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Number:</h3>
          <input
            type="text"
            value={updatedPlayer.number}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                number: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none"
          />
        </label>
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>High School:</h3>
          <input
            type="text"
            value={updatedPlayer.highSchool}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                highSchool: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none"
          />
        </label>
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Weight:</h3>
          <input
            type="text"
            value={updatedPlayer.weight}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                weight: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none"
          />
        </label>
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Height Feet:</h3>
          <input
            type="text"
            value={updatedPlayer.heightFeet}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                heightFeet: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none"
          />
        </label>
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Height Inches:</h3>
          <input
            type="text"
            value={updatedPlayer.heightInches}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                heightInches: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none"
          />
        </label>
        <label className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Games Played:</h3>
          <input
            type="text"
            value={updatedPlayer.GamesPlayed}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                GamesPlayed: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none bg-white"
            disabled
          />
        </label>
        <div className="flex">
          <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Sex:</h3>
          <select
            value={updatedPlayer.sex_id}
            onChange={(e) =>
              setUpdatedPlayer({
                ...updatedPlayer,
                sex_id: e.target.value,
              })
            }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none bg-white"
          >
            <option value="">--Select a sex--</option>
            {sexs.map((team) => (
              <option key={team.id} value={team.id}>
                {team.Sex}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex">
        <h3 className='border-b border-gray-200 py-[10px] w-4/12'>Image:</h3>
        <select
          value={updatedPlayer.picture_id}
          onChange={(e) =>
            setUpdatedPlayer({
              ...updatedPlayer,
              picture_id: e.target.value,
            })
          }
            className="w-8/12 text-right border-b border-gray-200 py-[10px] outline-none bg-white"
          >
          <option value="">--Select an Image--</option>
          {pictures.map((picture) => (
            <option key={picture.id} value={picture.id}>
              {picture.picture_url}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center space-x-2 mt-1">
      <button className="hover:bg-gray-50 focus:bg-gray-300 border font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4">
                  <Link to={`/players`}>Cancel</Link>
        </button>
        <button className="hover:bg-gray-50 focus:bg-gray-300 border font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4"
                  onClick={handleUpdate}
        >
          <Link to={`/players`}>Save</Link>
        </button>
      </div>
    </div>
  );
}

export default EditPlayer;
