import { useEffect, useState } from "react";
import { supabase } from "../../../services/client";

const RecentGames = () => {
    const [games, setGames] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [teams, setTeams] = useState([]);
    const [oppTeams, setOppTeams] = useState([]);
  
    useEffect(() => {
      fetchPictures();
      fetchGames();
      fetchTeams();
      fetchOppTeams();
    }, []);
  
    async function fetchGames() {
      try {
        const { data: latestGameData, error: latestGameError } = await supabase
          .from("Games")
          .select("TeamId, OppTeamId, TeamScore, OppTeamScore, GameDate")
          .order("GameDate", { ascending: false })
          .limit(1);
  
        if (latestGameError) {
          return;
        }
  
        if (!latestGameData || latestGameData.length === 0) {
          return;
        }
  
        const latestGameDate = new Date(latestGameData[0].GameDate);
  
        const threeWeeksBefore = new Date(latestGameDate);
        threeWeeksBefore.setDate(latestGameDate.getDate() - 14); // Subtract 14 days (2 weeks)
  
        const { data: gamesData, error: gamesError } = await supabase
          .from("Games")
          .select("TeamId, OppTeamId, TeamScore, OppTeamScore, GameDate")
          .lte("GameDate", latestGameDate.toISOString()) // Games on or before the latest date
          .gte("GameDate", threeWeeksBefore.toISOString()) // Games on or after 2 weeks before the latest date
          .order("GameDate", { ascending: true }); // Order the games by GameDate in ascending order
  
        if (gamesError) {
          return;
        }
  
        if (!gamesData || gamesData.length === 0) {
          return;
        }
  
        setGames(gamesData);
      } catch (e) {}
    }
  
    async function fetchTeams() {
      const { data } = await supabase.from("teams").select();
      setTeams(data);
    }
  
    var TeamsName = teams.reduce(function (result, currentObject) {
      result[currentObject.id] = currentObject.TeamName;
      return result;
    }, {});
  
    async function fetchOppTeams() {
      const { data } = await supabase.from("oppTeam").select();
      setOppTeams(data);
    }
  
    var OppTeamsName = oppTeams.reduce(function (result, currentObject) {
      result[currentObject.id] = currentObject.Name;
      return result;
    }, {});
  
    async function fetchPictures() {
      const { data } = await supabase.from("pictures").select();
      setPictures(data);
    }
  
    var picture_url = pictures.reduce(function (result, currentObject) {
      result[currentObject.id] = currentObject.picture_url;
      return result;
    }, {});
  
    var GameTeam = teams.reduce(function (result, currentObject) {
      result[currentObject.id] = currentObject.logo;
      return result;
    }, {});
  
    var GameTeam1 = oppTeams.reduce(function (result, currentObject) {
      result[currentObject.id] = currentObject.Logo;
      return result;
    }, {});

  return (
    <div className="overflow-x-auto pl-[1%]">
  <div className="flex space-x-2 py-3">
    {games && Array.isArray(games) ? (
      games.map((game, index) => {
        // Parse the game date to a Date object
        const gameDate = new Date(game.GameDate);
        // Format the date to "dd MMM yyyy" format
        const formattedDate = gameDate.toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });

        return (
          <div
            key={index}
            className="h-[125px] w-[200px] lg:p-2 pl-[10px] pr-[10px] rounded-xl border bg-white text-sm flex flex-col justify-start"
          >
            <div>
              <p>{formattedDate}</p>
            </div>
            <div className="flex justify-between pt-2 space-x-[10px] lg:space-x-0">
              <div>
                <div className="flex lg:space-x-3 space-x-[10px] w-[140px]">
                  <img
                    className="w-[30px] h-[30px]"
                    src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${
                      picture_url[GameTeam[game.TeamId]]
                    }`}
                    alt="AI"
                  />
                  <p>{TeamsName[game.TeamId]}</p>
                </div>
                <div className="flex lg:space-x-3 space-x-[10px]">
                  <img
                    className="w-[30px] h-[30px] mt-2"
                    src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${
                      picture_url[GameTeam1[game.OppTeamId]]
                    }`}
                    alt="AI"
                  />
                  <p className="pt-3">{OppTeamsName[game.OppTeamId]}</p>
                </div>
              </div>

              <div>
                <p>{game.TeamScore}</p>
                <p className="pt-4">{game.OppTeamScore}</p>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p>No games available in the last 3 weeks.</p>
    )}
  </div>
</div>

  )
}

export default RecentGames