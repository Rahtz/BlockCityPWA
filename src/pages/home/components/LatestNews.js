import { useEffect, useState } from "react";
import { supabase } from "../../../services/client";

const LatestNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from("articles")
      .select("heading, body, picture_id")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching articles:", error);
    } else {
      if (data) {
        setArticles(data);
      }
    }
  }

  return (
    <div className="flex justify-center items-center py-5 h-[450px] lg:w-3/12 w-full">
      <div
        className="h-full w-10/12 rounded-xl border bg-white"
        style={{ overflowY: "auto" }}
      >
        <div className="sticky top-0 bg-white">
          <h1 className="text-orange-500 font-bold text-center py-5 border-b-[3px] border-orange-500">
            Latest News
          </h1>
        </div>
        <ul>
          {articles && Array.isArray(articles) ? (
            articles.map((article, index) => (
              <li key={index}>
                <div className="pl-5 py-5 border-b border-gray-400 font-bold">
                  {article.heading}
                </div>
              </li>
            ))
          ) : (
            <li>No articles available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LatestNews;
