import { useState, useEffect } from "react";
import { supabase } from "../../../services/client";
import { useParams } from "react-router-dom";
import HighFlyers from "../../../assets/images/Highflyers.png";

const TeamProfile = () => {
  const params = useParams();
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchTeams();
    fetchStats();
    fetchPlayers();
  }, []);

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select();
    setTeams(data);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  async function fetchStats() {
    const { data } = await supabase
      .from("stats")
      .select()
      .eq("TeamId", params.id);
    setStats(data);
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  const groupedStats = stats.reduce((acc, curr) => {
    const date = curr.YourDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedDate("");
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredStats = Object.entries(groupedStats).filter(([date]) => {
    const year = new Date(date).getFullYear();
    if (selectedYear) {
      if (year !== parseInt(selectedYear)) {
        return false;
      }
    }
    if (selectedDate) {
      if (date !== selectedDate) {
        return false;
      }
    }
    return true;
  });

  const years = Object.keys(groupedStats).map((date) =>
    new Date(date).getFullYear()
  );
  const uniqueYears = Array.from(
    new Set(stats.map((stat) => new Date(stat.YourDate).getFullYear()))
  ).sort((a, b) => a - b);

  const dates = Array.from(new Set(stats.map((stat) => stat.YourDate))).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const sortedStats = filteredStats.sort(
    (a, b) => new Date(a[0]) - new Date(b[0])
  );

  return (
    <div>
      <div className="flex h-[150px] bg-gray-800">
        <div className="flex justify-center items-center w-1/3">
          <img src={HighFlyers} alt="HF" className="w-[130px] h-[100px] ml-3" />
        </div>
        <div className="flex justify-center items-center w-2/3">
          <h1 className="text-white font-display font-normal text-xl uppercase">
            High Flyers
          </h1>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="mr-2">
          <select
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Select a year</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedDate}
            onChange={handleDateChange}
            disabled={!selectedYear}
          >
            <option value="">Select a date</option>
            {dates
              .filter(
                (date) =>
                  new Date(date).getFullYear() === parseInt(selectedYear)
              )
              .map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {sortedStats.map(([date, stats]) => (
          <div key={date} className="mb-4">
            <h2 className="text-lg font-bold">{date}</h2>
            <div className="table-container w-full overflow-x-auto">
              <table className="table-auto">
                <thead className="border-b bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2 border-r"
                    >
                      Player
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      PTS
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      RBS
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      AST
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      STL
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      BLK
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      FGA
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      FGM
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      3PA
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      3PM
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      FTA
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      FTM
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      TO
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-bold text-gray-900 px-1 py-2"
                    >
                      MVP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat) => (
                    <tr key={stat.id} className="border-b hover:bg-gray-100">
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {PlayersName[stat.PlayerId]}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.Points}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.Rebounds}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.Assists}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.Steals}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.Blocks}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.FeildGoalsAttempted}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.FeildGoalsMade}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.ThreePointersAttempted}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.ThreePointersMade}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.FreeThrowsAttempted}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.FreeThrowsMade}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.Turnovers}
                      </td>
                      <td className="text-xs text-gray-900 font-light px-1 py-2 whitespace-nowrap">
                        {stat.MvpPoints}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamProfile;
