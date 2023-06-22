import React, { useState, useEffect, Fragment } from "react";
import { supabase } from "../../../services/client";

const Milestones = () => {
  const [totalstats, setTotalStats] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Points");

  useEffect(() => {
    fetchTotalStats();
    fetchPlayers();
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

  // Filter and sort the players closest to reaching a milestone
const filterPlayersByMilestone = (statName, startMilestone, endMilestone) =>
totalstats
  .filter((player) => player[statName] >= startMilestone && player[statName] < endMilestone)
  .sort((a, b) => b[statName] - a[statName]);

  const milestoneConfigs = [
    { statName: "Points", startMilestone: 0, endMilestone: 10000, incrementValue: 500 },
    { statName: "Rebounds", startMilestone: 0, endMilestone: 10000, incrementValue: 500 },
    { statName: "Assists", startMilestone: 0, endMilestone: 10000, incrementValue: 100 },
    { statName: "Steals", startMilestone: 0, endMilestone: 10000, incrementValue: 50 },
    { statName: "Blocks", startMilestone: 0, endMilestone: 10000, incrementValue: 50 },    
  ];
  
  const generateMilestoneTables = (config) => {
    const incrementValue = config.incrementValue;
    const numberOfTables = Math.ceil((config.endMilestone - config.startMilestone) / incrementValue);
  
    return Array.from({ length: numberOfTables }, (_, index) => {
      const startRange = config.startMilestone + index * incrementValue;
      const endRange = startRange + incrementValue;
  
      const milestonePlayers = totalstats
        .filter((player) => player[config.statName] >= startRange && player[config.statName] < endRange)
        .sort((a, b) => b[config.statName] - a[config.statName]); // Sort players in descending order
  
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
  
  const handleTabClick = (statName) => {
    setSelectedTab(statName);
  };
  
  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold mb-4">Milestones</h1>
  <div className="mb-8">
    <div className="relative inline-block">
      <select
        className="block appearance-none w-full py-2 px-4 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        value={selectedTab}
        onChange={(e) => handleTabClick(e.target.value)}
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
        if (selectedTab !== config.statName) {
          return null;
        }

        const milestoneTables = generateMilestoneTables(config).reverse();

        if (milestoneTables.every((table) => table === null)) {
          return <p key={config.statName}>No players found.</p>;
        }

        return (
          <div key={config.statName}>
            {milestoneTables.map((table, index) => (
              <React.Fragment key={`${config.statName}-${index}`}>
                {table}
              </React.Fragment>
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