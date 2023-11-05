import Navbar from "./layout/Navbar";
import Players from "./pages/players/Players";
import Stats from "./pages/addStats/Stats";
import Teams from "./pages/teams/Teams";
import TotalStats from "./pages/stats/TotalStats";
import AverageStats from "./pages/stats/AverageStats";
import PlayerProfile from "./pages/players/playerProfiles/PlayerProfile";
import Records from "./pages/stats/Records";
import Home from "../src/pages/home/Home";
import Milestones from "../src/pages/home/components/Milestones";
import Stat from "./pages/stats/Stat";
import Login from "./pages/login/Login";
// import Footer from "./layout/Footer";
import Articles from "../src/pages/addArticles/Articles";
import TeamProfile from "./pages/teams/teamProfiles/TeamProfile";
import TopWeeklyMvpPoints from "./pages/mvp/TopWeeklyMvpPoints";
import Pictures from "./pages/Pictures";
import ComparePlayers from "./pages/ComparePlayers";
import Admin from "./pages/administration/Admin";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import OppTeams from './pages/administration/OppTeams';
import Games from './pages/administration/Games';
import CreateGames from './pages/administration/CreateGames';


function App() {
  const [session, setSession] = useState(localStorage.getItem("session") || ""); // session object after registration / login

  const handleSessionChange = (newSession) => {
    setSession(newSession);
    localStorage.setItem("session", newSession);
  };

  return (
    
    <div className="flex flex-col min-h-screen">
  <div className="flex-grow">
  <Router>
      <div className="App">
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Helmet>
        <Navbar session={session} handleSessionChange={handleSessionChange} />
        {/* <AddToHomeScreen /> */}
        <div className="content mt-[80px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/players" element={<Players session={session} />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/totalstats" element={<TotalStats />} />
            <Route path="/averagestats" element={<AverageStats />} />
            <Route path="/stats/:id" element={<PlayerProfile />} />
            <Route path="/records" element={<Records />} />
            <Route path="/stat" element={<Stat />} />
            <Route path="/pictures" element={<Pictures />} />
            <Route path="/compare" element={<ComparePlayers />} />
            <Route path="/mvp" element={<TopWeeklyMvpPoints />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/oppteams" element={<OppTeams />} />
            <Route path="/games" element={<Games />} />
            <Route path="/creategames" element={<CreateGames />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/team/:id" element={<TeamProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  </div>
  {/* <footer className="bg-black py-4 mt-2">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-white text-center">
        &copy; {new Date().getFullYear()} Jacob Ratima. All rights reserved.
      </p>
    </div>
  </footer> */}
</div>
  );
}

export default App;
