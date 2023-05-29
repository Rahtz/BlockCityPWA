import { supabase } from "../services/client";

  
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
    
      setStats(allData);
      console.log(allData);
    }