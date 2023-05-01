import { useState, useEffect } from "react";
import { supabase } from "./client";

const Articles = () => {
  const [file, setFile] = useState(null);
  const [heading, setHeading] = useState("");
  const [articles, setArticles] = useState([]);
  const [body, setBody] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data } = await supabase.from("articles").select();
    setArticles(data);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const timestamp = new Date().getTime();
    const filename = `${timestamp}-${file.name}`;

    const { data: imageData, error: imageError } = await supabase.storage
      .from("images/public")
      .upload(filename, file);

    if (imageError) {
      console.log("Error uploading image:", imageError.message);
    } else {
      console.log("Image uploaded successfully:", imageData.Key);

      const { data: articleData, error: articleError } = await supabase
        .from("articles")
        .insert({ imageName: imageData.path, heading, body });

      if (articleError) {
        console.log("Error inserting article:", articleError.message);
      } else {
        console.log("Article inserted successfully:", articleData);
        setFile(null);
        setHeading("");
        setBody("");
      }
    }
  };

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

  const handleCreateClick = () => {
    setShowCreate(true);
  };

  return (
    <div>
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
              Body
            </th>
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
                {player.body}
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
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col h-full mt-auto">
      <div className="mb-4">
        <label
          htmlFor="file-input"
          className="block text-gray-700 font-bold mb-2"
        >
          Select an image to upload:
        </label>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="heading-input"
          className="block text-gray-700 font-bold mb-2"
        >
          Enter article heading:
        </label>
        <input
          type="text"
          id="heading-input"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="body-input"
          className="block text-gray-700 font-bold mb-2"
        >
          Enter article body:
        </label>
        <textarea
          id="body-input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex justify-end">
        <button
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mb-1 mx-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onClick={() => setShowCreate(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Upload
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
