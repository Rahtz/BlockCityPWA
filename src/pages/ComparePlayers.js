import React, { useState, useEffect } from 'react';
import { supabase } from '../services/client';

const ComparePlayers = () => {
  const [stats, setStats] = useState([]);
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');
  const [playerIds, setPlayerIds] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    fetchPlayerIds();
    fetchPlayers();
    getStats(); // Fetch initial statistics
  }, []);

  useEffect(() => {
    getDistinctSeasons();
  }, [stats]);

  async function fetchPlayers() {
    const { data } = await supabase.from('players').select();
    setPlayers(data);
  }

  var PlayersName = players.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.PlayerName;
    return result;
  }, {});

  async function fetchPlayerIds() {
    const { data, error } = await supabase
      .from('players')
      .select('id, PlayerName')
      .order('PlayerName');

    if (error) {
      console.error(error);
      return;
    }

    const sortedPlayerIds = data.map((player) => player.id);

    setPlayerIds(sortedPlayerIds);
  }

  async function fetchPlayerStats(playerId, season) {
    if (!playerId || !season) {
      return [];
    }

    const { data, error } = await supabase
      .from('stats')
      .select('Season, Points, Rebounds, Assists, Steals, Blocks, FeildGoalsAttempted, FeildGoalsMade, ThreePointersAttempted, ThreePointersMade, FreeThrowsAttempted, FreeThrowsMade, Turnovers, MvpPoints')
      .eq('PlayerId', playerId)
      .eq('Season', season);

    if (error) {
      console.error(error);
      return [];
    }

    return data;
  }

  async function getStats() {
    const player1SeasonStats = await fetchPlayerStats(player1Id, selectedSeason);
    const player2SeasonStats = await fetchPlayerStats(player2Id, selectedSeason);

    setStats([player1SeasonStats, player2SeasonStats]);
  }

  async function getDistinctSeasons() {
    const { data, error } = await supabase
      .from('stats')
      .select('Season');

    if (error) {
      console.error(error);
      return;
    }

    const seasons = [...new Set(data.map((item) => String(item.Season).substring(0, 4)))]; // Convert to string and extract the year from the Season value, filter out duplicates
    setSeasons(seasons);
  }

  function calculateAverage(data, property) {
    if (!data) {
      return 0;
    }

    const filteredData = data.filter((item) => item.Season === parseInt(selectedSeason));

    const sum = filteredData.reduce((total, item) => total + item[property], 0);
    return filteredData.length > 0 ? sum / filteredData.length : 0;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center">
        <label className="mb-4">
          Player 1:
          <select
            className="block mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={player1Id}
            onChange={(e) => setPlayer1Id(e.target.value)}
          >
            <option value="">Select Player 1</option>
            {playerIds.map((playerId) => (
              <option key={playerId} value={playerId}>
                {PlayersName[playerId]}
              </option>
            ))}
          </select>
        </label>
        <label className="mb-4">
          Player 2:
          <select
            className="block mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={player2Id}
            onChange={(e) => setPlayer2Id(e.target.value)}
          >
            <option value="">Select Player 2</option>
            {playerIds.map((playerId) => (
              <option key={playerId} value={playerId}>
                {PlayersName[playerId]}
              </option>
            ))}
          </select>
        </label>
        <label className="mb-4">
          Season:
          <select
            className="block mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            <option value="">All Seasons</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </label>
        <button
          className="px-4 py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          onClick={getStats}
          disabled={!player1Id || !player2Id}
        >
          Generate Stats
        </button>
      </div>

      <table className="w-full mt-8">
        <thead>
          <tr>
            <th className="py-2 text-left">Category</th>
            <th className="py-2 text-left">Player 1</th>
            <th className="py-2 text-left">Player 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Points</td>
            <td>{calculateAverage(stats[0], 'Points').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'Points').toFixed(1)}</td>
          </tr>
          <tr>
            <td>Rebounds</td>
            <td>{calculateAverage(stats[0], 'Rebounds').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'Rebounds').toFixed(1)}</td>
          </tr>
          <tr>
            <td>Assists</td>
            <td>{calculateAverage(stats[0], 'Assists').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'Assists').toFixed(1)}</td>
          </tr>
          <tr>
            <td>Steals</td>
            <td>{calculateAverage(stats[0], 'Steals').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'Steals').toFixed(1)}</td>
          </tr>
          <tr>
            <td>Blocks</td>
            <td>{calculateAverage(stats[0], 'Blocks').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'Blocks').toFixed(1)}</td>
          </tr>
          <tr>
            <td>FGA</td>
            <td>{calculateAverage(stats[0], 'FeildGoalsAttempted').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'FeildGoalsAttempted').toFixed(1)}</td>
          </tr>          
          <tr>
            <td>FGM</td>
            <td>{calculateAverage(stats[0], 'FeildGoalsMade').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'FeildGoalsMade').toFixed(1)}</td>
          </tr>           
          <tr>
            <td>FG%</td>
            <td>{(((calculateAverage(stats[0], 'FeildGoalsMade').toFixed(1))/(calculateAverage(stats[0], 'FeildGoalsAttempted').toFixed(1)))*100).toFixed(1)+"%"}</td>
            <td>{(((calculateAverage(stats[1], 'FeildGoalsMade').toFixed(1))/(calculateAverage(stats[1], 'FeildGoalsAttempted').toFixed(1)))*100).toFixed(1)+"%"}</td>
          </tr>       
          <tr>
            <td>3PA</td>
            <td>{calculateAverage(stats[0], 'ThreePointersAttempted').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'ThreePointersAttempted').toFixed(1)}</td>
          </tr>        
          <tr>
            <td>3PM</td>
            <td>{calculateAverage(stats[0], 'ThreePointersMade').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'ThreePointersMade').toFixed(1)}</td>
          </tr>            
          <tr>
            <td>3P%</td>
            <td>{(((calculateAverage(stats[0], 'ThreePointersMade').toFixed(1))/(calculateAverage(stats[0], 'ThreePointersAttempted').toFixed(1)))*100).toFixed(1)+"%"}</td>
            <td>{(((calculateAverage(stats[1], 'ThreePointersMade').toFixed(1))/(calculateAverage(stats[1], 'ThreePointersAttempted').toFixed(1)))*100).toFixed(1)+"%"}</td>
          </tr>        
          <tr>
            <td>FTA</td>
            <td>{calculateAverage(stats[0], 'FreeThrowsAttempted').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'FreeThrowsAttempted').toFixed(1)}</td>
          </tr>        
          <tr>
            <td>FTM</td>
            <td>{calculateAverage(stats[0], 'FreeThrowsMade').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'FreeThrowsMade').toFixed(1)}</td>
          </tr>            
          <tr>
            <td>FT%</td>
            <td>{(((calculateAverage(stats[0], 'FreeThrowsMade').toFixed(1))/(calculateAverage(stats[0], 'FreeThrowsAttempted').toFixed(1)))*100).toFixed(1)+"%"}</td>
            <td>{(((calculateAverage(stats[1], 'FreeThrowsMade').toFixed(1))/(calculateAverage(stats[1], 'FreeThrowsAttempted').toFixed(1)))*100).toFixed(1)+"%"}</td>
          </tr>        
          <tr>
            <td>Turnovers</td>
            <td>{calculateAverage(stats[0], 'Turnovers').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'Turnovers').toFixed(1)}</td>
          </tr>       
          <tr>
            <td>MVP Points</td>
            <td>{calculateAverage(stats[0], 'MvpPoints').toFixed(1)}</td>
            <td>{calculateAverage(stats[1], 'MvpPoints').toFixed(1)}</td>
          </tr> 
        </tbody>
      </table>
    </div>
  );
};

export default ComparePlayers;