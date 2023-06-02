import { useState, useEffect } from "react";
import { supabase } from "../../services/client";
import AdminNav from "../../layout/AdminNav";

const Articles = () => {
  const [file, setFile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [updatedArticle, setUpdatedArticle] = useState({
    heading: "",
    body: "",
    picture_id: "",
  });

  const [article, setArticle] = useState({
    heading: "",
    body: "",
    picture_id: "",
  });
  const {
    heading,
    body,
    picture_id,
  } = article;

  useEffect(() => {
    fetchArticles();
    fetchPictures();
  }, []);

  async function fetchArticles() {
    const { data } = await supabase.from("articles").select();
    setArticles(data);
  }

  async function fetchPictures() {
    const { data } = await supabase.from("pictures").select();
    setPictures(data);
  }

  async function createArticle() {
    await supabase
      .from("articles")
      .insert([
        {
          heading,
          body,
          picture_id,
        },
      ])
      .single();
    setArticle({
      heading: "",
      body: "",
      picture_id: "",
    });
    fetchArticles();
    setShowCreate(false);
  }

  async function deleteArticle(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (confirmed) {
      const { data, error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }

      fetchArticles();
    }
  }

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("articles")
      .update(updatedArticle)
      .match({ id: selectedArticle.id });
    if (error) {
      console.error(error);
    } else {
      // setShowModal(false);
      window.location.reload();
    }
  };

  const handleCreateClick = () => {
    setShowCreate(true);
  };

  return (
    <div>
    <AdminNav/>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleCreateClick}
      >
        Create Article
      </button>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-2 w-1/3">
              Heading
            </th>
            <th scope="col" className="py-3 px-2 w-1/3">
              Image Name
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((player) => (
            <tr
              key={player.id}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-xs"
            >
              <th
                scope="row"
                className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/3"
              >
                {player.heading}
              </th>
              <th
                scope="row"
                className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/3"
              >
                {player.imageName}
              </th>
              <td className="py-4 px-6">
                <button className="lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </button>
                <button
                  className="lg:block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => deleteArticle(player.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 z-50">
          <div className="bg-white rounded-lg p-3 h-5/6 w-auto">
            <form
              className="w-full max-w-sm flex flex-col h-full mt-auto"
            >
              <div className="flex flex-col">
                <h3>Image:</h3>
                <form
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5  w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setArticle({ ...article, picture_id: e.target.value })
                  }
                >
                  <select name="picture_id">
                    <option value="">--Select a image--</option>
                    {pictures.map((picture) => (
                      <option key={picture.id} value={picture.id}>
                        {picture.picture_url}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="heading-input"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Enter article heading:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  value={heading}
                  onChange={(e) =>
                    setArticle({ ...article, heading: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="body-input"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Enter article body:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  value={body}
                  onChange={(e) =>
                    setArticle({ ...article, body: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-center">
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mb-1 mx-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={createArticle}
              >
                Create Article
              </button>
            </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
