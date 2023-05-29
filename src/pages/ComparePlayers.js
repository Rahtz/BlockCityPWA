import React, { useState, useEffect } from 'react';
import { supabase } from '../services/client';

const ComparePlayers = () => {
  const [stats, setStats] = useState([]);
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [averages, setAverages] = useState(null);

  useEffect(() => {
    getStats();
  }, []);

  async function getStats() {
    let allData = [];
    let lastItem = null;

    do {
      const { data, error } = await supabase
        .from('stats')
        .select()
        .limit(1000)
        .gt('id', lastItem?.id || 0)
        .order('id');

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

  function calculateAverages() {
    const player1Stats = stats.filter((stat) => stat.PlayerId === player1Id && stat.Year === selectedYear);
    const player2Stats = stats.filter((stat) => stat.PlayerId === player2Id && stat.Year === selectedYear);

    const player1Points = player1Stats.reduce((total, stat) => total + stat.Points, 0);
    const player1Assists = player1Stats.reduce((total, stat) => total + stat.Assists, 0);
    const player1Rebounds = player1Stats.reduce((total, stat) => total + stat.Rebounds, 0);
    const player2Points = player2Stats.reduce((total, stat) => total + stat.Points, 0);
    const player2Assists = player2Stats.reduce((total, stat) => total + stat.Assists, 0);
    const player2Rebounds = player2Stats.reduce((total, stat) => total + stat.Rebounds, 0);

    const player1AveragePoints = player1Points / player1Stats.length || 0;
    const player1AverageAssists = player1Assists / player1Stats.length || 0;
    const player1AverageRebounds = player1Rebounds / player1Stats.length || 0;
    const player2AveragePoints = player2Points / player2Stats.length || 0;
    const player2AverageAssists = player2Assists / player2Stats.length || 0;
    const player2AverageRebounds = player2Rebounds / player2Stats.length || 0;

    setAverages({
      player1AveragePoints,
      player1AverageAssists,
      player1AverageRebounds,
      player2AveragePoints,
      player2AverageAssists,
      player2AverageRebounds,
    });
  }

  useEffect(() => {
    if (player1Id && player2Id && selectedYear) {
      calculateAverages();
    }
  }, [player1Id, player2Id, selectedYear]);

  // Extract unique playerIds from stats array
  const uniquePlayerIds = [...new Set(stats.map((stat) => stat.PlayerId))];


  return (
    <div>
      <div>
        <label htmlFor="player1">Player 1:</label>
        <select
          id="player1"
          value={player1Id}
          onChange={(e) => setPlayer1Id(e.target.value)}
        >
          <option value="">Select Player 1</option>
          {uniquePlayerIds.map((playerId) => (
            <option key={playerId} value={playerId}>
              {playerId}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="player2">Player 2:</label>
        <select
          id="player2"
          value={player2Id}
          onChange={(e) => setPlayer2Id(e.target.value)}
        >
          <option value="">Select Player 2</option>
          {uniquePlayerIds.map((playerId) => (
            <option key={playerId} value={playerId}>
              {playerId}
            </option>
          ))}
        </select>
      </div>
      <div>
      <label htmlFor="year">Year:</label>
      <select
        id="year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Select Year</option>
        {/* Render options for the years */}
      </select>
    </div>
    <button onClick={calculateAverages}>Calculate Averages</button>
      {averages && (
        <div>
          <h2>Averages</h2>
          <p>
            Player 1 Points: {averages.player1AveragePoints.toFixed(2)}
          </p>
          <p>
            Player 1 Assists: {averages.player1AverageAssists.toFixed(2)}
          </p>
          <p>
            Player 1 Rebounds: {averages.player1AverageRebounds.toFixed(2)}
          </p>
          <p>
            Player 2 Points: {averages.player2AveragePoints.toFixed(2)}
          </p>
          <p>
            Player 2 Assists: {averages.player2AverageAssists.toFixed(2)}
          </p>
          <p>
            Player 2 Rebounds: {averages.player2AverageRebounds.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
      };

export default ComparePlayers;