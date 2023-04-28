import Navbar from './Navbar';
import Players from './Players';
import Stats from './Stats';
import Teams from './Teams';
import TotalStats from './TotalStats';
import AverageStats from './AverageStats';
import PlayerProfile from './PlayerProfile';
import Records from './Records';
import Home from './Home';
import Message from './Message';
import Stat from './Stat';
import Login from './Login';
import AddToHomeScreen from './AddToHomeScreen';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";

function App() {
  const [session, setSession] = useState(localStorage.getItem("session") || ""); // session object after registration / login

  const handleSessionChange = (newSession) => {
    setSession(newSession);
    localStorage.setItem("session", newSession);
  };

  return (
    <Router>
      <div className="App">
      <Navbar  session={session} handleSessionChange={handleSessionChange}/>
      <AddToHomeScreen />
        <div className="content">
        <Routes>
          <Route path="/" element={<Message/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/players" element={<Players  session={session}/>}/>
          <Route path="/stats" element={<Stats />}/>
          <Route path="/teams" element={<Teams />}/>
          <Route path="/totalstats" element={<TotalStats />}/>
          <Route path="/averagestats" element={<AverageStats />}/>
          <Route path="/stats/:id" element={<PlayerProfile />}/>
          <Route path="/records" element={<Records />}/>
          <Route path="/stat" element={<Stat />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<NotFound />} />            
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
