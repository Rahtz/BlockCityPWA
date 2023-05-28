import { useState, useEffect } from "react";
import { supabase } from "../../services/client";

const TopWeeklyMvpPoints = () => {
  const [stats, setStats] = useState([]);
  const [players, setPlayers] = useState([]);
  const [year, setYear] = useState(""); // set initial value to an empty string
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    getStats();
    fetchPlayers();
  }, []);

  useEffect(() => {
    // get the latest year from the stats data
    const latestYear = Math.max(
      ...stats.map((d) => parseInt(d.YourDate.substring(0, 4)))
    );
    setYear(latestYear.toString()); // convert to a string and set as the default value
  }, [stats]);

  async function getStats() {
    let allData = [];
    let lastItem = null;
  
    do {
      const { data, error } = await supabase
        .from("stats")
        .select()
        .limit(1000)
        .gt("id", lastItem?.id || 0)
        .order("id");
  
      if (error) {
        console.error(error);
        break;
      }
  
      allData.push(...data);
      lastItem = data[data.length - 1];
    } while (lastItem);
  
    setStats(allData);
  }

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    setPlayers(data);
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  const years = Array.from(
    new Set(stats.map((d) => d.YourDate.substring(0, 4)))
  ).sort((a, b) => b - a);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const filteredData =
    year === "" ? stats : stats.filter((d) => d.YourDate.startsWith(year));

  const playerPoints = filteredData.reduce((points, d) => {
    const playerId = d.PlayerId;
    const playerPoints = d.MvpPoints;
    if (points[playerId]) {
      points[playerId] += playerPoints;
    } else {
      points[playerId] = playerPoints;
    }
    return points;
  }, []);

  const sortedPlayerPoints = Object.entries(playerPoints)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([playerId, points], index) => ({
      rank: index + 1,
      playerId,
      points,
    }));

  const AllsortedPlayerPoints = Object.entries(playerPoints)
  
    .sort((a, b) => b[1] - a[1])
    .map(([playerId, points], index) => ({
      rank: index + 1,
      playerId,
      points,
    }));

  const toggleAllSortedPlayers = () => {
    setShowMore(!showMore);
  };


  return (
    <div className="bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Club MVP Ladder</h1>
      <div className="mb-4">
        <select
          className="border border-gray-400 rounded px-4 py-2 mr-2"
          value={year}
          onChange={handleYearChange}
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <span className="text-gray-500">Filter by year</span>
      </div>
      <ol>
        {!showMore &&
          sortedPlayerPoints.map(({ rank, playerId, points }) => (
            <li key={playerId} className="mb-2">
              <span className="font-bold">{rank}</span> -{" "}
              <span className="text-blue-500">{PlayersName[playerId]}</span>:{" "}
              {points} MVP Points
            </li>
          ))}
        {showMore &&
          AllsortedPlayerPoints.map(({ rank, playerId, points }) => (
            <li key={playerId} className="mb-2">
              <span className="font-bold">{rank}</span> -{" "}
              <span className="text-blue-500">{PlayersName[playerId]}</span>:{" "}
              {points} MVP Points
            </li>
          ))}
      </ol>
      {!showMore && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={toggleAllSortedPlayers}
        >
          Show More
        </button>
      )}
      {showMore && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={toggleAllSortedPlayers}
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export default TopWeeklyMvpPoints;
