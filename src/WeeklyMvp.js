import { useState, useEffect } from "react";
import { supabase } from "./client";

const WeeklyMvp = () => {
    const [stats, setStats] = useState([]);
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getStats();
        fetchPlayers();
        fetchTeams();
      }, []);

      async function fetchPlayers() {
        const { data } = await supabase.from("players").select();
        setPlayers(data);
      }

      async function fetchTeams(){
        const { data } = await supabase
            .from('teams')
            .select()
        setTeams(data)
        console.log("data: ", data);
    }

      var PlayersName = players.reduce(function (result, currentObject) {
        result[currentObject.id] = currentObject.PlayerName;
        return result;
      }, {});


      var TeamsName = teams.reduce(function (result, currentObject) {
        result[currentObject.id] = currentObject.TeamName;
        return result;
      }, {});


      async function getStats() {
        const { data } = await supabase
          .from("stats")
          .select("*")
          .order("YourDate", { ascending: false })
          .limit(1);
        const latestDate = data[0].YourDate;
        const { data: latestStats } = await supabase
          .from("stats")
          .select()
          .eq("YourDate", latestDate);
        const groupedStats = latestStats.reduce((acc, stat) => {
          if (!acc[stat.TeamId] || acc[stat.TeamId].MvpPoints < stat.MvpPoints) {
            acc[stat.TeamId] = stat;
          }
          return acc;
        }, {});
        const topMvpPoints = Object.values(groupedStats);
        setStats(topMvpPoints);
        console.log(topMvpPoints);
      }

  return (
    <div className="flex flex-col items-center">
  <h1 className="text-4xl mt-4 font-bold">Weekly MVPs</h1>
  {stats.map(({ TeamId, PlayerId, MvpPoints, Points, Assists, Rebounds, Steals, Blocks }) => (
    <div
      key={TeamId}
      className="flex flex-col items-center bg-white rounded-lg shadow-lg px-6 py-4 my-4 w-full max-w-2xl border border-gray-200"
    >
      <p className="text-xl font-semibold mb-2">{TeamsName[TeamId]}</p>
      <p className="text-lg font-medium mb-2">{PlayersName[PlayerId]}</p>
      <p className="text-lg font-medium mb-2">MVP Points: {MvpPoints}</p>
      <div className="grid grid-cols-5 gap-2">
        <div className="bg-gray-200 rounded-lg px-4 py-2 text-center">
          <p className="text-sm font-bold">PTS</p>
          <p>{Points}</p>
        </div>
        <div className="bg-gray-200 rounded-lg px-4 py-2 text-center">
          <p className="text-sm font-bold">AST</p>
          <p>{Assists}</p>
        </div>
        <div className="bg-gray-200 rounded-lg px-4 py-2 text-center">
          <p className="text-sm font-bold">REB</p>
          <p>{Rebounds}</p>
        </div>
        <div className="bg-gray-200 rounded-lg px-4 py-2 text-center">
          <p className="text-sm font-bold">STL</p>
          <p>{Steals}</p>
        </div>
        <div className="bg-gray-200 rounded-lg px-4 py-2 text-center">
          <p className="text-sm font-bold">BLK</p>
          <p>{Blocks}</p>
        </div>
      </div>
    </div>
  ))}
</div>
  )
}

export default WeeklyMvp