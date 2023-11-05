import { useState, useEffect } from "react";
import { supabase } from "../../services/client";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import AdminNav from "../../layout/AdminNav";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function Stats() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [oppTeams, setOppTeams] = useState([]);
  const [stats, setStats] = useState([]);
  const [allStats, setAllStats] = useState([]);
  const [sexs, setSexs] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStat, setSelectedStat] = useState(null);
  const [total, SetTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const itemsPerPageOptions = [10, 25, 50, 100];
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
    Turnovers: "",
    OppTeamId: "",
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
    Turnovers: "",
    OppTeamId: "",
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
    Turnovers,
    OppTeamId,
  } = stat;

  useEffect(() => {
    fetchStats();
    fetchAllStats();
    fetchPlayers();
    fetchTeams();
    fetchSexs();
    fetchOppTeams();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  async function fetchStats(pageNumber) {
    const offset = (pageNumber - 1) * itemsPerPage;
    const { data, error } = await supabase
      .from("stats")
      .select()
      .range(offset, offset + itemsPerPage - 1)
      .order("YourDate", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    if (data && data.length > 0) {
      setStats(data);
    }
  }

  useEffect(() => {
    fetchStats(currentPage);
  }, [currentPage, itemsPerPage]);

  async function fetchAllStats() {
    let allData = [];
    let lastItem = null;

    do {
      const { data, error } = await supabase
        .from("stats")
        .select()
        .limit(1000) // Fetching 1000 records at a time
        .gt("id", lastItem?.id || 0)
        .order("id");

      if (error) {
        console.error(error);
        break;
      }

      allData.push(...data);
      lastItem = data[data.length - 1];
    } while (lastItem);

    setAllStats(allData.length); // Setting the total count of all records
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select();
    setTeams(data);
  }

  async function fetchOppTeams() {
    const { data } = await supabase.from("oppTeam").select();
    setOppTeams(data);
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
          Turnovers,
          OppTeamId,
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
      Turnovers: "",
      OppTeamId: "",
    });
    fetchStats();
    setShowCreate(false);
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

  var OppTeamsName = oppTeams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.Name;
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

  const handleMvpPoints = (e) => {
    const result = Number(stat.Points) + Number(stat.Rebounds);
    setStat({ ...stat, MvpPoints: e.target.value });
    SetTotal(result);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex space-x-[63px]">
        <div className="w-[150px] z-10">
          <AdminNav />
        </div>
        <div className="w-full bg-white">
          <div className="lg:sticky top-[80px] h-[100px] bg-white z-50 border">
            <div className="mt-5 -mb-14 ml-5 bg-white">
              <p className="text-2xl text-black">Stats</p>
            </div>
            <div className="hidden lg:block mb-1 text-right">
              <button
                className="hover:bg-gray-50 focus:bg-gray-300 border font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4 mr-10"
                onClick={handleCreateClick}
              >
                Create Stat
              </button>
            </div>
            <div className="ml-32 -mt-12">
              <input
                type="text"
                placeholder="Search by player name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white md:w-auto md:ml-5"
              />
            </div>

            <div className="bg-white border-b ml-1">
              <table className="w-full">
                <thead className="text-xs text-gray-500 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-2 w-[100px] text-left"
                      // style={{ width: "10%" }}
                    >
                      Player
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-2 w-[100px] text-left"
                      // style={{ width: "10%" }}
                    >
                      Team
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-2 w-[100px] text-left"
                      // style={{ width: "10%" }}
                    >
                      Opp Team
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-2 w-[100px] text-left"
                      // style={{ width: "4%" }}
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      PTS
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      RBS
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      AST
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      STL
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      BLK
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      FGA
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      FGM
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      3PA
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      3PM
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      FTA
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      FTM
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      Year
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      TO
                    </th>
                    <th
                      scope="col"
                      className="py-3 -pl-2 w-[50px] text-left"
                      // style={{ width: "4%" }}
                    >
                      MVP
                    </th>
                    <th className="w-[50px]"></th>
                    {/* <th
                      scope="col"
                      className="py-3 px-6 text-left"
                      style={{ width: "4%" }}
                    >
                    Options
                  </th> */}
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {showCreate && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
              <div className="bg-white rounded-lg p-3 h-auto w-auto">
                <div className="flex -mb-4">
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
                <div className="flex -mb-4">
                  <label className="flex flex-col">
                    <h3>Team</h3>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={TeamId}
                      onChange={(e) =>
                        setStat({ ...stat, TeamId: e.target.value })
                      }
                    >
                      <option></option>
                      {teams.map((team) => (
                        <option value={team.id}>{team.TeamName}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col">
                    <h3>Opposition Team</h3>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={OppTeamId}
                      onChange={(e) =>
                        setStat({ ...stat, OppTeamId: e.target.value })
                      }
                    >
                      <option></option>
                      {oppTeams.map((team) => (
                        <option value={team.id}>{team.Name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col">
                    <h3>Sex</h3>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={sex_id}
                      onChange={(e) =>
                        setStat({ ...stat, sex_id: e.target.value })
                      }
                    >
                      <option></option>
                      {sexs.map((sex) => (
                        <option value={sex.id}>{sex.Sex}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="flex -mb-4">
                  <label className="flex flex-col">
                    <h3>Points</h3>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      placeholder="Points"
                      value={Points}
                      onChange={(e) =>
                        setStat({ ...stat, Points: e.target.value })
                      }
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
                <div className="flex -mb-4">
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
                      onChange={(e) =>
                        setStat({ ...stat, Steals: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className="flex -mb-4">
                  <label className="flex flex-col">
                    <h3>Blocks</h3>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      placeholder="Blocks"
                      value={Blocks}
                      onChange={(e) =>
                        setStat({ ...stat, Blocks: e.target.value })
                      }
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
                        setStat({
                          ...stat,
                          FeildGoalsAttempted: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="flex -mb-4">
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
                        setStat({
                          ...stat,
                          ThreePointersAttempted: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="flex -mb-4">
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
                        setStat({
                          ...stat,
                          FreeThrowsAttempted: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="flex -mb-4">
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
                      onChange={(e) =>
                        setStat({ ...stat, Season: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className="flex -mb-4">
                  <label className="flex flex-col">
                    <h3>Turnovers</h3>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      placeholder="Turnovers"
                      value={Turnovers}
                      onChange={(e) =>
                        setStat({ ...stat, Turnovers: e.target.value })
                      }
                    />
                  </label>
                </div>
                {/* <div className="flex -mb-4">
              <label className="flex flex-col">
                <h3>Mvp Points</h3>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="MVP Points"
                  value={MvpPoints}
                  onBlur={(e) =>
                    setStat({ ...stat, MvpPoints:(() => {
                      if(stat.PlayerId){
                        return(stat.Points + stat.Rebounds)
                      }
                    }) })
                  }
                />
              </label>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mb-1 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleMvpPoints}
              >
                Calculate
              </button>
            </div> */}
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
          <div className="overflow-x-auto relative">
            <div className="overflow-y-auto w-full z-1">
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
              <table className="w-full text-sm text-left">
                <tbody>
                  {stats
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .filter((stat) =>
                      PlayersName[stat.PlayerId]
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((stat) => (
                      <tr
                        key={stat.id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-300 text-xs group relative hover:bg-gray-100"
                      >
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[100px] text-left font-medium text-gray-900  dark:text-white"
                        >
                          <Link to={`/stats/${stat.PlayerId}`}>
                            {PlayersName[stat.PlayerId]}
                          </Link>
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[100px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {TeamsName[stat.TeamId]}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[100px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {OppTeamsName[stat.OppTeamId]}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[100px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.YourDate}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.Points}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.Rebounds}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.Assists}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.Steals}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.Blocks}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.FeildGoalsAttempted}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.FeildGoalsMade}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.ThreePointersAttempted}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.ThreePointersMade}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.FreeThrowsAttempted}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.FreeThrowsMade}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.Season}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.Turnovers}
                        </td>
                        <td
                          scope="row"
                          className="py-2 pl-2 w-[50px] text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {stat.MvpPoints}
                        </td>
                        <td className="py-2 px-1 w-[10px]">
                          <div className="flex">
                            <button
                              className="mt-1 delete-icon invisible group-hover:visible"
                              onClick={() => handleEditClick(stat)}
                            >
                              <AiFillEdit />
                            </button>
                            <button
                              className="mt-1 mr-4 delete-icon invisible group-hover:visible"
                              onClick={() => deleteStat(stat.id)}
                            >
                              <AiFillDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white shadow-md p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center"></div>
                <div className="flex items-center">
                  <div className="ml-4 pr-6">
                    {/* Items per page dropdown */}
                    <label htmlFor="itemsPerPage" className="mr-2">
                      Items per page:
                    </label>
                    <select
                      id="itemsPerPage"
                      className="border rounded px-2 py-1 focus:outline-none"
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                      {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mr-2 pr-6">
                    {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(currentPage * itemsPerPage, allStats)} of{" "}
                    {allStats}
                  </p>
                  <button
                    className="px-3 py-1 mr-1 border rounded focus:outline-none"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 ml-1 border rounded focus:outline-none"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={stats.length < itemsPerPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <div className="flex">
                <label className="flex flex-col">
                  <h3>Turnovers:</h3>
                  <input
                    type="text"
                    value={updatedStat.Turnovers}
                    onChange={(e) =>
                      setUpdatedStat({
                        ...updatedStat,
                        Turnovers: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-1 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    </div>
  );
}

export default Stats;
