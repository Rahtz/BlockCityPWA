import { useState, useEffect } from "react";
import { supabase } from "../../services/client";
import { Link } from "react-router-dom";
import AdminNav from "../../layout/AdminNav";
import { AiFillDelete } from "react-icons/ai";

const Games = () => {
  const [stats, setStats] = useState([]);
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [oppTeams, setOppTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25); 
  const itemsPerPageOptions = [10, 25, 50, 100];
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchStats();
    fetchGames();
    fetchAllGames();
    fetchTeams();
    fetchOppTeams();
  }, [currentPage, itemsPerPage]);

  async function fetchStats() {
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

  async function fetchGames() {
    const { data } = await supabase
      .from("Games")
      .select()
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);
    setGames(data);
  }

  async function fetchAllGames() {
    const { data } = await supabase.from("Games").select();
    const dl = data.length;
    setAllGames(dl);
  }

  async function fetchTeams() {
    const { data } = await supabase.from("teams").select();
    setTeams(data);
  }

  async function fetchOppTeams() {
    const { data } = await supabase.from("oppTeam").select();
    setOppTeams(data);
  }

  var TeamsName = teams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.TeamName;
    return result;
  }, {});

  var OppTeamsName = oppTeams.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.Name;
    return result;
  }, {});

  return (
    <div className="flex flex-col h-screen">
      <div className="flex space-x-[66px]">
        <div className="w-[150px] z-10">
          <AdminNav />
        </div>
        <div className="w-full bg-white">
          <div className="lg:sticky top-[100px] z-10">
            <div className="mt-5 -mb-14 ml-5">
              <p className="text-2xl text-black">Games</p>
            </div>
            <div className="hidden lg:block text-right bg-white">
              {/* Create Game button */}
              <Link to="/creategames/">
                <button className="hover:bg-gray-50 focus:bg-gray-300 border font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4 mr-10">
                  Create Game
                </button>
              </Link>
            </div>

            <div className="bg-white border-b">
              <table className="w-full">
                <thead className="text-xs text-gray-500 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left"
                      style={{ width: "20%" }} // 1/6th width for each column
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left"
                      style={{ width: "20%" }}
                    >
                      Team Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left"
                      style={{ width: "20%" }}
                    >
                      Opposition Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left"
                      style={{ width: "20%" }}
                    >
                      Team Score
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left"
                      style={{ width: "20%" }}
                    >
                      Opposition Score
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <div className="overflow-x-auto relative">
            <div className="overflow-y-auto w-full z-1">
              <table className="w-full text-sm text-left">
                <tbody>
                  {games.map((game) => (
                    <tr
                      key={game.id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-300 text-xs group relative hover:bg-gray-100"
                    >
                      <td
                        scope="row"
                        className="py-2 px-6 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        style={{ width: "20%" }} // 1/6th width for each column
                      >
                        {game.GameDate}
                      </td>
                      <td
                        scope="row"
                        className="py-2 px-6 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        style={{ width: "20%" }}
                      >
                        {TeamsName[game.TeamId]}
                      </td>
                      <td
                        scope="row"
                        className="py-2 px-6 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        style={{ width: "20%" }}
                      >
                        {OppTeamsName[game.OppTeamId]}
                      </td>
                      <td
                        scope="row"
                        className="py-2 px-6 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        style={{ width: "20%" }}
                      >
                        {game.TeamScore}
                      </td>
                      <td
                        scope="row"
                        className="py-2 px-6 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        style={{ width: "20%" }}
                      >
                        {game.OppTeamScore}
                      </td>
                      <td
                        className="delete-icon absolute top-1 right-1 invisible group-hover:visible"
                      >
                        {/* Add your delete icon here */}
                        <p className="mt-1 mr-4">
                          <AiFillDelete />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white shadow-md p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center"></div>
              <div className="flex items-center">
                <div className="ml-4 pr-6">
                  {/* Items per page dropdown */}
                  <label htmlFor="itemsPerPage" className="mr-2">
                    Items per page:
                  </label>
                  <select
                    id="itemsPerPage"
                    className="border rounded px-2 py-1 focus:outline-none"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    {itemsPerPageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mr-2 pr-6">
                  {(currentPage - 1) * itemsPerPage + 1} -{" "}
                  {Math.min(currentPage * itemsPerPage, totalRecords)} of{" "}
                  {allGames}
                </p>
                <button
                  className="px-3 py-1 mr-1 border rounded focus:outline-none"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="px-3 py-1 ml-1 border rounded focus:outline-none"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={games.length < itemsPerPage}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
