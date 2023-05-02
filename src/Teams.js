import { useState, useEffect } from 'react';
import { supabase } from './client';
import { Link } from "react-router-dom";

function Teams() {
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState({ TeamName: ""});
    const { TeamName } = team;

    useEffect(() => {
        fetchTeams();
    }, [])

    async function fetchTeams(){
        const { data } = await supabase
            .from('teams')
            .select()
        setTeams(data)
        console.log("data: ", data);
    }

    async function createTeam() {
        await supabase
            .from('teams')
            .insert([
                {TeamName}
            ])
            .single()
        setTeam({TeamName: ""});
        fetchTeams();
    }

    async function deleteTeam(id) {
        const { data, error } = await supabase
            .from('teams')
            .delete()
            .eq('id', id)

            if(error) {
                console.log(error);
            }
            if (data) {
                console.log(data);
            }

            fetchTeams();
    }

    return(
        <div className="lg:grid grid-cols-10 divide-x mt-1">
    <div className="hidden lg:block col-span-3">
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Name"
        value={TeamName}
        onChange={(e) => setTeam({ ...team, TeamName: e.target.value })}
      />

      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={createTeam}>Create Team</button>
      
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full col-span-7">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">Team Name</th>
                    <th scope="col" className="hidden lg:block py-3 px-6">Options</th>
                </tr>
            </thead>
            <tbody>
            {teams.map((team) => (
                <tr key={team.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-xs">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><Link to={`/team/${team.id}`}>{team.TeamName}</Link></th>
                <td className="py-4 px-6">
                    <button className="hidden lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => deleteTeam(team.id)}>
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
    );
}

export default Teams;