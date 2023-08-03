import { useState, useEffect } from "react";
import { supabase } from "../../services/client";
import { Link } from "react-router-dom";

function Players({ session }) {
  const [teams, setTeams] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [players, setPlayers] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [sexs, setSexs] = useState([]);
  const [num, setNum] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showGamesModal, setShowGamesModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortColumn, setSortColumn] = useState("GamesPlayed");
  const [sortOrder, setSortOrder] = useState("dsc");
  const [updatedPlayer, setUpdatedPlayer] = useState({
    PlayerName: "",
    team_id: "",
    sex_id: "",
    birthdate: "",
    position: "",
    number: "",
    highSchool: "",
    weight: "",
    heightFeet: "",
    heightInches: "",
    clubNumber: "",
    GamesPlayed: "",
    ExtraGames: "",
    picture_id: "",
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
    sex_id: "",
    clubNumber: "",
    GamesPlayed: "",
    picture_id: "",
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
    sex_id,
    clubNumber,
    GamesPlayed,
    picture_id,
  } = player;

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    fetchSexs();
    getMaxNumber();
    fetchPictures();
  }, []);

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select("*");
    setTeams(data);
  }

  async function fetchPictures() {
    const { data } = await supabase.from("pictures").select("*");
    setPictures(data);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  async function getMaxNumber() {
    const { data } = await supabase.rpc("getmaxnumber");
    const number = data;
    setNum(number);
  }

  async function fetchSexs() {
    const { data } = await supabase.from("Sex").select();
    setSexs(data);
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
          sex_id,
          clubNumber,
          GamesPlayed,
          picture_id,
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
      sex_id: "",
      clubNumber: "",
      GamesPlayed: "",
      picture_id: "",
    });
    fetchPlayers();
    setShowCreate(false);
  }

  async function deletePlayer(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this player?"
    );

    if (confirmed) {
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
  }

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("players")
      .update(updatedPlayer)
      .match({ id: selectedPlayer.id });
    if (error) {
      console.error(error);
    } else {
      setShowModal(false);
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

  const showGamesModal1 = (player) => {
    setSelectedPlayer(player);
    setUpdatedPlayer(player);
    setShowGamesModal(true);
  };

  const handleImageModal = (player) => {
    setSelectedPlayer(player);
    setUpdatedPlayer(player);
    setShowImageModal(true);
  };

  const filteredPlayers = players.filter((player) => {
    const isNameMatched = player.PlayerName.toLowerCase().includes(
      searchText.toLowerCase()
    );
    const isMale = player.sex_id === 1;
    const isFemale = player.sex_id === 2;
    const isOther = !player.sex_id;

    if (activeTab === "male") {
      return isNameMatched && isMale;
    } else if (activeTab === "female") {
      return isNameMatched && isFemale;
    } else if (activeTab === "other") {
      return isNameMatched && isOther;
    } else {
      return isNameMatched;
    }
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleUpdateClubNumber = () => {
    setPlayer({ ...player, clubNumber: (parseInt(num) + 1).toString() });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const timestamp = new Date().getTime();
    const filename = `${timestamp}-${selectedFile.name}`;

    const { data: imageData, error: imageError } = await supabase.storage
      .from("images/public")
      .upload(filename, selectedFile);

    if (imageError) {
      console.log("Error uploading image:", imageError.message);
    } else {
      console.log("Image uploaded successfully:", imageData.Key);

      const { data: playerData, error: playerError } = await supabase
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
            sex_id,
            clubNumber,
            GamesPlayed,
            avatar_url: imageData.path,
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
        sex_id: "",
        clubNumber: "",
        GamesPlayed: "",
        avatar_url: "",
      });
      fetchPlayers();
      setShowCreate(false);

      if (playerError) {
        console.log("Error inserting article:", playerError.message);
      } else {
        console.log("Article inserted successfully:", playerData);
        setSelectedFile(null);
      }
    }
  };

  const handleEditPlayer = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const timestamp = new Date().getTime();
    const filename = `${timestamp}-${selectedFile.name}`;

    const { data: imageData, error: imageError } = await supabase.storage
      .from("images/public")
      .upload(filename, selectedFile);

    if (imageError) {
      console.log("Error uploading image:", imageError.message);
    } else {
      console.log("Image uploaded successfully:", imageData.Key);

      const { data: playerData, error: playerError } = await supabase
        .from("players")
        .update({ avatar_url: imageData.path })
        .match({ id: selectedPlayer.id });

      if (playerError) {
        console.log("Error updating player:", playerError.message);
      } else {
        console.log("Player updated successfully:", playerData);
        setSelectedFile(null);
        fetchPlayers();
      }
    }
  };

  const handleCreatePlayer = () => {
    // createPlayer();
    handleSubmit();
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the current column is already sorted, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set the new column and set the default sort order to 'asc'
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="lg:grid divide-x mt-1">
      <div className="flex flex-col items-center justify-center w-full my-2 md:flex-row md:items-center md:justify-between">
        {session ? (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[370px] sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mb-0"
            onClick={handleCreateClick}
          >
            Create Player
          </button>
        ) : (
          <></>
        )}

        <div className="flex">
          <div className="ml-2">
            <input
              type="text"
              placeholder="Search players"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 md:w-auto md:ml-5"
            />
          </div>
          <div className="flex mx-2">
            <button
              className={`${
                activeTab === "all" ? "bg-gray-900 text-white" : "bg-gray-200"
              } py-2 px-4 font-semibold rounded-l-lg`}
              onClick={() => handleTabClick("all")}
            >
              All
            </button>
            <button
              className={`${
                activeTab === "male" ? "bg-gray-900 text-white" : "bg-gray-200"
              } py-2 px-4 font-semibold`}
              onClick={() => handleTabClick("male")}
            >
              Mens
            </button>
            <button
              className={`${
                activeTab === "female"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200"
              } py-2 px-4 font-semibold rounded-r-lg`}
              onClick={() => handleTabClick("female")}
            >
              Womens
            </button>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
      <div className="overflow-x-auto relative shadow-md w-full lg:w-10/12 col-span-7">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-2">
                Club Number
              </th>
              <th scope="col" className="py-3 px-2">
                Player Name
              </th>
              <th
                scope="col"
                className="py-3 px-2"
                onClick={() => handleSort("GamesPlayed")}
              >
                Games Played
                {sortColumn === "GamesPlayed" && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
              {session ? (
                <th scope="col" className="py-3 px-2">
                  Options
                </th>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredPlayers
              .sort((a, b) => {
                if (sortColumn === "GamesPlayed") {
                  // If sorting by GamesPlayed, compare the sum of GamesPlayed and ExtraGames
                  const aValue = a.GamesPlayed + a.ExtraGames;
                  const bValue = b.GamesPlayed + b.ExtraGames;
                  return sortOrder === "asc"
                    ? aValue - bValue
                    : bValue - aValue;
                } else {
                  // If sorting by other columns (e.g., ClubNumber or PlayerName), compare them directly
                  return sortOrder === "asc"
                    ? a[sortColumn].localeCompare(b[sortColumn])
                    : b[sortColumn].localeCompare(a[sortColumn]);
                }
              })
              .map((player) => (
                <tr
                  key={player.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-xs"
                >
                  <th
                    scope="row"
                    className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {player.clubNumber}
                  </th>
                  <th
                    scope="row"
                    className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link to={`/stats/${player.id}`}>{player.PlayerName}</Link>
                  </th>
                  {/* <th
                    scope="row"
                    className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {getTeamName(player.id)}
                  </th> */}
                  <th
                    scope="row"
                    className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {player.GamesPlayed + player.ExtraGames}
                  </th>
                  {session ? (
                    <td className="flex flex-col py-4 px-6">
                      <button
                        className="lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => showGamesModal1(player)}
                      >
                        Games
                      </button>
                      <button
                        className="lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditClick(player)}
                      >
                        Edit
                      </button>
                      <button
                        className="lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => deletePlayer(player.id)}
                      >
                        Delete
                      </button>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-3 h-5/6 w-auto">
            <h2 className="text-lg font-medium mb-4">Create Player </h2>
            <div className="flex">
              <div className="flex flex-col">
                <h3 className="mb-2">Name:</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  value={PlayerName}
                  onChange={(e) =>
                    setPlayer({ ...player, PlayerName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <h3 className="mb-2">Club Number:</h3>
                <div className="flex">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[110px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Club Number"
                    value={player.clubNumber}
                    readOnly
                    onChange={(e) =>
                      setPlayer({ ...player, clubNumber: e.target.value })
                    }
                  />
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[50px] h-[45px] sm:w-auto px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleUpdateClubNumber}
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <h3>Team:</h3>
                <form
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <label className="flex flex-col">
                <h3>Birthdate:</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  placeholder="date"
                  value={birthdate}
                  onChange={(e) =>
                    setPlayer({ ...player, birthdate: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Position:</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="position"
                  value={position}
                  onChange={(e) =>
                    setPlayer({ ...player, position: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <h3>Number:</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="number"
                  value={number}
                  onChange={(e) =>
                    setPlayer({ ...player, number: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Highschool:</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="highSchool"
                  value={highSchool}
                  onChange={(e) =>
                    setPlayer({ ...player, highSchool: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <h3>Weight:</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="weight"
                  value={weight}
                  onChange={(e) =>
                    setPlayer({ ...player, weight: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Feet:</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="heightFeet"
                  value={heightFeet}
                  onChange={(e) =>
                    setPlayer({ ...player, heightFeet: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <h3>Inches:</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="heightInches"
                  value={heightInches}
                  onChange={(e) =>
                    setPlayer({ ...player, heightInches: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>GamesPlayed:</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="GamesPlayed"
                  value={GamesPlayed}
                  onChange={(e) =>
                    setPlayer({ ...player, GamesPlayed: e.target.value })
                  }
                />
              </label>
              <div className="flex flex-col">
                <h3>Sex:</h3>
                <form
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setPlayer({ ...player, sex_id: e.target.value })
                  }
                >
                  <select name="sex_id">
                    <option value="">--Select a Sex--</option>
                    {sexs.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.Sex}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>
            <div className="flex flex-col">
              <h3>Image:</h3>
              <form
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setPlayer({ ...player, picture_id: e.target.value })
                }
              >
                <select name="picture_id">
                  <option value="">--Select a picture--</option>
                  {pictures.map((picture) => (
                    <option key={picture.id} value={picture.id}>
                      {picture.picture_url}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            {/* <div className="mb-4">
                <label
                  htmlFor="file-input"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Select an image to upload:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div> */}
            <div className="flex justify-center">
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mb-1 mx-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          <div className="bg-white rounded-lg p-3 h-5/6 w-auto">
            <h2 className="text-lg font-medium mb-4">Edit Player Details</h2>
            <div className="flex">
              <label className="flex flex-col">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>Club Number:</h3>
                <input
                  type="text"
                  value={updatedPlayer.clubNumber}
                  onChange={(e) =>
                    setUpdatedPlayer({
                      ...updatedPlayer,
                      clubNumber: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <h3>Team:</h3>
                <select
                  value={updatedPlayer.team_id}
                  onChange={(e) =>
                    setUpdatedPlayer({
                      ...updatedPlayer,
                      team_id: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">--Select a Team--</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.TeamName}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex flex-col">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>Number:</h3>
                <input
                  type="text"
                  value={updatedPlayer.number}
                  onChange={(e) =>
                    setUpdatedPlayer({
                      ...updatedPlayer,
                      number: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <h3>Weight:</h3>
                <input
                  type="text"
                  value={updatedPlayer.weight}
                  onChange={(e) =>
                    setUpdatedPlayer({
                      ...updatedPlayer,
                      weight: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label className="flex flex-col">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
            </div>
            <div className="flex">
              <label className="flex flex-col">
                <h3>Games Played:</h3>
                <input
                  type="text"
                  value={updatedPlayer.GamesPlayed}
                  onChange={(e) =>
                    setUpdatedPlayer({
                      ...updatedPlayer,
                      GamesPlayed: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <div className="flex flex-col">
                <h3>Sex:</h3>
                <select
                  value={updatedPlayer.sex_id}
                  onChange={(e) =>
                    setUpdatedPlayer({
                      ...updatedPlayer,
                      sex_id: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="flex flex-col">
              <h3>Image:</h3>
              <select
                value={updatedPlayer.picture_id}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    picture_id: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">--Select an Image--</option>
                {pictures.map((picture) => (
                  <option key={picture.id} value={picture.id}>
                    {picture.picture_url}
                  </option>
                ))}
              </select>
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

      {showGamesModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-3 h-auto w-auto">
            <label className="flex flex-col">
              <h3>Winter Games Played:</h3>
              <input
                type="text"
                value={updatedPlayer.GamesPlayed}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    GamesPlayed: e.target.value,
                  })
                }
                readOnly // add this attribute to make the input field readonly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 opacity-50 cursor-not-allowed" // add opacity and cursor styles to make the input look disabled
              />
            </label>
            <label className="flex flex-col">
              <h3>Extra Games Played:</h3>
              <input
                type="text"
                value={updatedPlayer.ExtraGames}
                onChange={(e) =>
                  setUpdatedPlayer({
                    ...updatedPlayer,
                    ExtraGames: e.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
            <div className="flex justify-center">
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 mx-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => setShowGamesModal(false)}
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
