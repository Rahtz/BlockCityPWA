import { useState, useEffect } from "react";
import { supabase } from "../../services/client";

const TopWeeklyMvpPoints = () => {
  const [stats, setStats] = useState([]);
  const [players, setPlayers] = useState([]);
  const [category, setCategory] = useState(""); // category state
  const [year, setYear] = useState(""); // year state
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    getStats();
    fetchPlayers();
  }, []);

  useEffect(() => {
    const latestYear = Math.max(
      ...stats.map((d) => parseInt(d.YourDate.substring(0, 4)))
    );
    setYear(latestYear.toString());
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
    console.log(allData);
  }

  async function fetchPlayers(category) {
    let request = supabase.from("players").select();
  
    if (category !== "" && !isNaN(category)) {
      request = request.eq("sex_id", parseInt(category));
    }
  
    const { data, error } = await request;
  
    if (error) {
      console.error(error);
      // Handle the error as needed
      return;
    }
  
    setPlayers(data);
  }

  var PlayersName = players
  ? players.reduce(function (result, currentObject) {
      result[currentObject.id] = currentObject.PlayerName;
      return result;
    }, {})
  : {};

  const years = Array.from(
    new Set(stats.map((d) => d.YourDate.substring(0, 4)))
  ).sort((a, b) => b - a);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };
  
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
  };

  const filteredData =
  year === "" && category === ""
    ? stats
    : stats.filter((d) =>
        (year === "" || d.YourDate.startsWith(year)) &&
        (category === "" || d.sex_id === parseInt(category))
      );

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
      <div className="mb-4">
  <select
    className="border border-gray-400 rounded px-4 py-2 mr-2"
    value={category}
    onChange={handleCategoryChange}
  >
    <option value="">All Categories</option>
    <option value="1">Men</option>
    <option value="2">Women</option>
    <option value="3">Social</option>
  </select>
  <span className="text-gray-500">Filter by category</span>
</div>
      <ol>
        {!showMore &&
          sortedPlayerPoints.map(({ rank, playerId, points }) => (
            <li key={playerId} className="mb-2">
              <span className="font-bold">{rank}</span> -{" "}
              <span className="text-blue-500">{PlayersName[playerId] || ''}</span>:{" "}
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
