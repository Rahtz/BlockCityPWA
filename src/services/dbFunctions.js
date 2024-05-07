import { supabase } from "../services/client";

//General function to get all Stats
export async function getStats() {
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

    return allData;
  }


//General function to get all Players
  export async function fetchPlayers() {
    const { data } = await supabase.from("players").select();
    return data;
  }

/*
Function to take in an array and an id and return the corresponding PlayerName
for the id passed
*/
  export function getPlayerNameMap(categories, id = 'id') {
    const playerNameMap = categories.reduce(function(result, currentObject) {
      result[currentObject[id]] = currentObject.PlayerName;
      return result;
    }, {});
  
    return function(playerId) {
      return playerNameMap[playerId];
    };
  }


//Function to get the latest year
  export function getLatestYear(data) {
    let latestYear = null;
    for (let i = 0; i < data.length; i++) {
      const year = new Date(data[i].YourDate).getFullYear();
      if (latestYear === null || year > latestYear) {
        latestYear = year;
      }
    }
    return latestYear;
  }