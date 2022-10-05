import React from 'react';
import Navbar from './Navbar';
import Players from './Players';
import Stats from './Stats';
import Teams from './Teams';
import TotalStats from './TotalStats';
import AverageStats from './AverageStats';
import PlayerProfile from './PlayerProfile';
import SeasonLeaders from './SeasonLeaders';
import Records from './Records';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <div className="content">
        <Routes>
          <Route path="/players" element={<Players />}/>
          <Route path="/stats" element={<Stats />}/>
          <Route path="/teams" element={<Teams />}/>
          <Route path="/totalstats" element={<TotalStats />}/>
          <Route path="/averagestats" element={<AverageStats />}/>
          <Route path="/stats/:id" element={<PlayerProfile />}/>
          <Route path="/seasonleaders" element={<SeasonLeaders />}/>
          <Route path="/records" element={<Records />}/>
          <Route path="*" element={<NotFound />} />            
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
