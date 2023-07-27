import { useState, useEffect } from "react";
import { supabase } from "../../services/client";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Stats() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [totalstats, setTotalStats] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchPlayers();
    fetchTotalStats();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  async function fetchTotalStats() {
    const { data } = await supabase.rpc("totals");
    setTotalStats(data);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  function handleSort(column) {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  }

  function sortData(data, column, order) {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });
    return sortedData;
  }

  const sortedStats = sortColumn
    ? sortData(totalstats, sortColumn, sortOrder)
    : totalstats;

  return (
    <div className="lg:grid grid-cols-4 divide-x">
      <div className="flex items-center justify-center space-x-[20px] bg-white h-[40px]">
        <div>
          <p className="font-display -ml-[50px]">STATS</p>
        </div>
        <div className="border border-black h-[25px]"></div>
        <div>
          <Link to={`/stat/`}>
            <p className="text-sm">Leaders</p>
          </Link>
        </div>
        <div>
          <Link to={`/records/`}>
            <p className="text-sm">Records</p>
          </Link>
        </div>
        <div>
          <Link to={`/totalstats/`}>
            <p className="text-sm">Totals</p>
          </Link>
        </div>
        <div>
          <Link to={`/averagestats/`}>
            <p className="text-sm">Averages</p>
          </Link>
        </div>
      </div>
      <div className="mt-6 bg-white">
        <h1 className="pl-6 font-display text-xl">CLUB Totals</h1>
        <hr />
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full col-span-3">
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
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-2 px-2 sticky left-0 bg-gray-50">
                  Player
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("Points")}
                >
                  Points
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("Rebounds")}
                >
                  Rebounds
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("Assists")}
                >
                  Assists
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("Steals")}
                >
                  Steals
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("Blocks")}
                >
                  Blocks
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("FeildGoalsAttempted")}
                >
                  FGA
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("FeildGoalsMade")}
                >
                  FGM
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("ThreePointersAttempted")}
                >
                  3PA
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("ThreePointersMade")}
                >
                  3PM
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("FreeThrowsAttempted")}
                >
                  FTA
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 text-center cursor-pointer"
                  onClick={() => handleSort("FreeThrowsMade")}
                >
                  FTM
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map((stat) => (
                <tr
                  key={stat.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-xs"
                >
                  <th
                    scope="row"
                    className="py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white sticky left-0 bg-white"
                  >
                    {PlayersName[stat.PlayerId]}
                  </th>
                  <td className="py-2 px-2 text-center">{stat.Points}</td>
                  <td className="py-2 px-2 text-center">{stat.Rebounds}</td>
                  <td className="py-2 px-2 text-center">{stat.Assists}</td>
                  <td className="py-2 px-2 text-center">{stat.Steals}</td>
                  <td className="py-2 px-2 text-center">{stat.Blocks}</td>
                  <td className="py-2 px-2 text-center">
                    {stat.FeildGoalsAttempted}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {stat.FeildGoalsMade}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {stat.ThreePointersAttempted}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {stat.ThreePointersMade}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {stat.FreeThrowsAttempted}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {stat.FreeThrowsMade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Stats;
