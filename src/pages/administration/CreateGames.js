import { useState, useEffect } from "react";
import { supabase } from "../../services/client";

const CreateGames = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [oppTeams, setOppTeams] = useState([]);
  const [sexs, setSexs] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [oppTeamId, setOppTeamId] = useState("");
  const [stats, setStats] = useState([]);
  const [teamPoints, setTeamPoints] = useState(0);
  const [oppositionPoints, setOppositionPoints] = useState(0);
  const [gameId, setGameId] = useState(0); // Default value is 1
  const [totalTeamPoints, setTotalTeamPoints] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedOppTeam, setSelectedOppTeam] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [stat, setStat] = useState([
    {
      YourDate: "",
      PlayerId: "",
      TeamId: "",
      GameId: "",
      sex_id: "",
      OppTeamId: "",
      Points: 0,
      Rebounds: 0,
      Assists: 0,
      Steals: 0,
      Blocks: 0,
      FeildGoalsAttempted: 0,
      FeildGoalsMade: 0,
      ThreePointersAttempted: 0,
      ThreePointersMade: 0,
      FreeThrowsAttempted: 0,
      FreeThrowsMade: 0,
      Season: 0,
      Turnovers: 0,
    },
  ]);

  const handleStatChange = (event, index, field) => {
    const updatedStats = [...stats];
    updatedStats[index][field] = event.target.value;
    setStats(updatedStats);
  };

  const addNewStat = () => {
    setStats([
      ...stats,
      {
        YourDate: "",
        PlayerId: "",
        TeamId: "",
        GameId: "",
        sex_id: "",
        OppTeamId: "",
        Points: 0,
        Rebounds: 0,
        Assists: 0,
        Steals: 0,
        Blocks: 0,
        FeildGoalsAttempted: 0,
        FeildGoalsMade: 0,
        ThreePointersAttempted: 0,
        ThreePointersMade: 0,
        FreeThrowsAttempted: 0,
        FreeThrowsMade: 0,
        Season: 0,
        Turnovers: 0,
      },
    ]);
  };

  useEffect(() => {
    const fetchMaxGameId = async () => {
      try {
        const { data, error } = await supabase
          .from("Games")
          .select("id", {
            order: [{ column: "id", order: "desc", type: "num" }],
            limit: 1,
          });

        if (error) {
          console.error("Error fetching max game ID:", error);
        } else {
          const maxGameId = data[0]?.id || 0;
          let newGameId = maxGameId + 1;

          while (true) {
            const { data: existingData, error: existingError } = await supabase
              .from("Games")
              .select("*")
              .eq("id", newGameId);

            if (existingError) {
              console.error(
                "Error checking for existing game ID:",
                existingError
              );
              break;
            } else if (existingData.length === 0) {
              setGameId(newGameId);
              break;
            }

            newGameId++;
          }
        }
      } catch (error) {
        console.error("Error fetching max game ID:", error);
      }
    };

    fetchMaxGameId();
  }, []);

  useEffect(() => {
    if (stats.length > 0) {
      calculatePoints();
    }
  }, [stats]);

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    fetchOppTeams();
    fetchSexs();
  }, []);

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  const filteredPlayers = players.filter((player) =>
    player.PlayerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPlayers = filteredPlayers.sort((a, b) =>
    a.PlayerName.localeCompare(b.PlayerName)
  );

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

  const calculatePoints = () => {
    let totalPoints = 0;
    stats.forEach((stat) => {
      totalPoints += parseInt(stat.Points); // Make sure to parse the value as an integer
    });
    setTotalTeamPoints(totalPoints);
  };

  const removeStat = (index) => {
    const updatedStats = stats.filter((_, i) => i !== index);
    setStats(updatedStats);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleOppTeamChange = (event) => {
    setSelectedOppTeam(event.target.value);
  };

  const handleSexChange = (event) => {
    setSelectedSex(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const handleCreateGameAndStats = async () => {
    try {
      // Create the game record in the Games table
      const gameData = {
        id: gameId,
        GameDate: selectedDate,
        TeamId: selectedTeam,
        OppTeamId: selectedOppTeam,
        TeamScore: totalTeamPoints,
        OppTeamScore: oppositionPoints, // Add oppositionPoints if needed
      };

      const { data: gameDataResponse, error: gameError } = await supabase
        .from("Games")
        .upsert([gameData]);

      if (gameError) {
        console.error("Error creating game:", gameError);
        return;
      }

      console.log("Game created successfully:", gameDataResponse);

      // Create the stats records in the Stats table
      const statsData = stats.map((stat) => ({
        GameId: gameId,
        YourDate: selectedDate,
        PlayerId: stat.PlayerId,
        TeamId: selectedTeam,
        sex_id: selectedSex,
        OppTeamId: selectedOppTeam,
        Points: stat.Points,
        Rebounds: stat.Rebounds,
        Assists: stat.Assists,
        Steals: stat.Steals,
        Blocks: stat.Blocks,
        FeildGoalsAttempted: stat.FeildGoalsAttempted,
        FeildGoalsMade: stat.FeildGoalsMade,
        ThreePointersAttempted: stat.ThreePointersAttempted,
        ThreePointersMade: stat.ThreePointersMade,
        FreeThrowsAttempted: stat.FreeThrowsAttempted,
        FreeThrowsMade: stat.FreeThrowsMade,
        Season: selectedSeason,
        Turnovers: stat.Turnovers,
        // ... (other fields)
      }));

      const { data: statsDataResponse, error: statsError } = await supabase
        .from("stats")
        .upsert(statsData);

      if (statsError) {
        console.error("Error creating stats:", statsError);
        return;
      }

      console.log("Stats created successfully:", statsDataResponse);

      // You might want to show success messages or reset the form here
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Enter Game Details</h2>
      <div className="flex">
        <div className="flex flex-col">
          <label>Date</label>
          <input
            type="date"
            className="border rounded p-2 mr-2"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="flex flex-col">
          <label>Team</label>
          <select
            className="border rounded p-2"
            value={selectedTeam}
            onChange={handleTeamChange}
          >
            <option key="" value=""></option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.TeamName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label>Opposition Team</label>
          <select
            className="border rounded p-2"
            value={selectedOppTeam}
            onChange={handleOppTeamChange}
          >
            <option></option>
            {oppTeams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label>League</label>
          <select
            className="border rounded p-2 w-[150px]"
            value={selectedSex}
            onChange={handleSexChange}
          >
            <option></option>
            {sexs.map((sex) => (
              <option key={sex.id} value={sex.id}>
                {sex.Sex}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label>Season</label>
          <input
            type="number"
            placeholder="Season"
            className="border rounded p-2 w-[150px]"
            value={selectedSeason}
            onChange={handleSeasonChange}
          />
        </div>

        <div className="flex flex-col">
          <label>Opposition Points</label>
          {/* Add input for Opposition points */}
          <input
            type="number"
            placeholder="Opposition Points"
            className="border rounded p-2"
            value={oppositionPoints}
            onChange={(e) => setOppositionPoints(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label>Team Points</label>
          {/* Add input for Team points */}
          <input
            type="number"
            placeholder="Team Points"
            className="border rounded p-2"
            value={totalTeamPoints}
            readOnly
          />
        </div>

        <div className="flex flex-col">
          <label>Game Id</label>
          <input
            type="text"
            placeholder="Game ID"
            className="border rounded p-2 w-[60px]"
            value={gameId || ""} // Use gameId value, or empty string if it's null
            readOnly // Make the input field read-only since you're auto-populating it
          />
        </div>

        {stats.length > 0 && gameId && (
          <button
            className="bg-blue-500 text-white rounded p-2 ml-2"
            onClick={handleCreateGameAndStats}
          >
            Submit
          </button>
        )}
      </div>

      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2">Enter Player Stats</h2>
        <div className="flex">
          <label className="p-2 w-[150px]">Name</label>
          {/* <label className="p-2 w-[60px]">GID</label> */}
          <label className="p-2 ml-2 w-[60px]">PTS</label>
          <label className="p-2 ml-2 w-[60px]">RBS</label>
          <label className="p-2 ml-2 w-[60px]">AST</label>
          <label className="p-2 ml-2 w-[60px]">STL</label>
          <label className="p-2 ml-2 w-[60px]">BLK</label>
          <label className="p-2 ml-2 w-[60px]">FGA</label>
          <label className="p-2 ml-2 w-[60px]">FGM</label>
          <label className="p-2 ml-2 w-[60px]">3PA</label>
          <label className="p-2 ml-2 w-[60px]">3PM</label>
          <label className="p-2 ml-2 w-[60px]">FTA</label>
          <label className="p-2 ml-2 w-[60px]">FTM</label>
          <label className="p-2 ml-2 w-[60px]">TO</label>
        </div>
        {stats.map((stat, index) => (
          <div key={index} className="mb-2">
            <select
              className="border rounded p-2 w-[150px]"
              value={stat.PlayerId}
              onChange={(e) => handleStatChange(e, index, "PlayerId")}
            >
              <option></option>
              <div className="absolute top-0 left-0 right-0"></div>
              {sortedPlayers.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.PlayerName}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              placeholder="Game ID"
              className="border rounded p-2 w-[60px]"
              value={gameId || ""} // Use gameId value, or empty string if it's null
              readOnly // Make the input field read-only since you're auto-populating it
            /> */}
            <input
              type="text"
              placeholder="Points"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.Points}
              onChange={(e) => handleStatChange(e, index, "Points")}
            />
            <input
              type="number"
              placeholder="Rebounds"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.Rebounds}
              onChange={(e) => handleStatChange(e, index, "Rebounds")}
            />
            <input
              type="number"
              placeholder="Assists"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.Assists}
              onChange={(e) => handleStatChange(e, index, "Assists")}
            />
            <input
              type="number"
              placeholder="Steals"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.Steals}
              onChange={(e) => handleStatChange(e, index, "Steals")}
            />
            <input
              type="number"
              placeholder="Blocks"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.Blocks}
              onChange={(e) => handleStatChange(e, index, "Blocks")}
            />
            <input
              type="number"
              placeholder="FeildGoalsAttempted"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.FeildGoalsAttempted}
              onChange={(e) =>
                handleStatChange(e, index, "FeildGoalsAttempted")
              }
            />
            <input
              type="number"
              placeholder="FeildGoalsMade"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.FeildGoalsMade}
              onChange={(e) => handleStatChange(e, index, "FeildGoalsMade")}
            />
            <input
              type="number"
              placeholder="ThreePointersAttempted"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.ThreePointersAttempted}
              onChange={(e) =>
                handleStatChange(e, index, "ThreePointersAttempted")
              }
            />
            <input
              type="number"
              placeholder="ThreePointersMade"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.ThreePointersMade}
              onChange={(e) => handleStatChange(e, index, "ThreePointersMade")}
            />
            <input
              type="number"
              placeholder="FreeThrowsAttempted"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.FreeThrowsAttempted}
              onChange={(e) =>
                handleStatChange(e, index, "FreeThrowsAttempted")
              }
            />
            <input
              type="number"
              placeholder="FreeThrowsMade"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.FreeThrowsMade}
              onChange={(e) => handleStatChange(e, index, "FreeThrowsMade")}
            />

            <input
              type="number"
              placeholder="Turnovers"
              className="border rounded p-2 ml-2 w-[60px]"
              value={stat.Turnovers}
              onChange={(e) => handleStatChange(e, index, "Turnovers")}
            />
            {/* Add similar input fields for other stats (Rebounds, Assists, Steals, Blocks) */}
            <button
              className="bg-red-500 text-white rounded p-2 ml-2"
              onClick={() => removeStat(index)}
            >
              X
            </button>
          </div>
        ))}
        <button
          className="bg-green-500 text-white rounded p-2"
          onClick={addNewStat}
        >
          Add Player Stats
        </button>
        {/* <button
          className="bg-blue-500 text-white rounded p-2 ml-2"
          onClick={handleCreateStats}
        >
          Submit Stats
        </button> */}
      </div>
    </div>
  );
};

export default CreateGames;
