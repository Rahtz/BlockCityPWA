import React, { useState, useEffect } from "react";
import { supabase } from "../../../services/client";

const Milestones = () => {
  const [totalstats, setTotalStats] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Active");
  const [selectedStat, setSelectedStat] = useState("Points");

  console.log("Players:", players);

  useEffect(() => {
    fetchPlayers();
    fetchTotalStats();
  }, [selectedTab, selectedStat]);

  async function fetchTotalStats() {
    const { data, error } = await supabase.rpc("totals");
    if (error) {
      console.error("Error fetching total stats:", error.message);
      return;
    }
    setTotalStats(data);
  }
  
  async function fetchPlayers() {
    const { data, error } = await supabase.from("players").select("*");
  
    if (error) {
      console.error("Error fetching players:", error.message);
      return;
    }
  
    setPlayers(data);
  }
  
  

  // const PlayersName = players.reduce((result, currentObject) => {
  //   result[currentObject.PlayerId] = currentObject.PlayerName;
  //   return result;
  // }, {});

  const PlayersName = {};
players.forEach((player) => {
  PlayersName[player.id] = player.PlayerName;
});

  const milestoneConfigs = [
    { statName: "Points", startMilestone: 0, endMilestone: 10000, incrementValue: 500 },
    { statName: "Rebounds", startMilestone: 0, endMilestone: 10000, incrementValue: 500 },
    { statName: "Assists", startMilestone: 0, endMilestone: 10000, incrementValue: 100 },
    { statName: "Steals", startMilestone: 0, endMilestone: 10000, incrementValue: 50 },
    { statName: "Blocks", startMilestone: 0, endMilestone: 10000, incrementValue: 50 },
    { statName: "Double Doubles", startMilestone: 0, endMilestone: 10000, incrementValue: 100 },
    { statName: "Triple Doubles", startMilestone: 0, endMilestone: 10000, incrementValue: 100 },
    { statName: "ThreePointersMade", startMilestone: 0, endMilestone: 10000, incrementValue: 50 },
  ];

  const generateMilestoneTable = (config, activeOnly) => {
    if (!players.length || !totalstats.length) {
      return null;
    }
  
    // Create a map of active players
    const activePlayersMap = {};
    players.forEach((player) => {
      // If isActive is null, default to true
      activePlayersMap[player.id] = player.isActive === null ? true : player.isActive;
    });
  
    const incrementValue = config.incrementValue;
    const numberOfTables = Math.ceil((config.endMilestone - config.startMilestone) / incrementValue);
  
    return Array.from({ length: numberOfTables }, (_, index) => {
      const startRange = config.startMilestone + index * incrementValue;
      const endRange = startRange + incrementValue;
  
      let milestonePlayers = totalstats
        .filter((player) => {
          const meetsRangeCriteria = player[config.statName] >= startRange && player[config.statName] < endRange;
          return meetsRangeCriteria;
        })
        .sort((a, b) => b[config.statName] - a[config.statName]);
  
      if (activeOnly) {
        milestonePlayers = milestonePlayers.filter((player) => activePlayersMap[player.PlayerId]);
      }
  
      if (milestonePlayers.length === 0) {
        return null;
      }
  
      const milestone = `${startRange} - ${endRange} ${config.statName}`;
  
      return (
        <div key={milestone} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{milestone}</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Player</th>
                <th className="py-2 px-4 border-b">{config.statName}</th>
                <th className="py-2 px-4 border-b">{config.statName} Remaining</th>
              </tr>
            </thead>
            <tbody>
              {milestonePlayers.map((player) => (
                <tr key={player.PlayerId}>
                  <td className="py-2 px-4 border-b">{PlayersName[player.PlayerId]}</td>
                  <td className="py-2 px-4 border-b">{player[config.statName]}</td>
                  <td className="py-2 px-4 border-b">{endRange - player[config.statName]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    });
  };
  
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Milestones</h1>
      <div className="mb-8">
        <div className="flex mb-4">
          {["Active", "All"].map((tab) => (
            <button
              key={tab}
              className={`mr-2 py-2 px-4 rounded-md ${
                selectedTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab} Players
            </button>
          ))}
        </div>
        <div className="relative inline-block">
          <select
            className="block appearance-none w-full py-2 px-4 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            value={selectedStat}
            onChange={(e) => setSelectedStat(e.target.value)}
          >
            {milestoneConfigs.map((config) => (
              <option key={config.statName} value={config.statName}>
                {config.statName}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          {milestoneConfigs.map((config) => {
            if (selectedStat !== config.statName) {
              return null;
            }
  
            const milestoneTable = generateMilestoneTable(config, selectedTab === "Active");
            if (!milestoneTable || milestoneTable.length === 0) {
              return <p key={config.statName}>No players found.</p>;
            }
  
            return (
              <div key={config.statName}>
                {milestoneTable.reverse().map((table, index) => (
                  <React.Fragment key={`${config.statName}-${index}`}>{table}</React.Fragment>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  
};

export default Milestones;
