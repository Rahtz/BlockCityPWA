import { useState, useEffect } from "react";
import { supabase } from "./client";

const Articles = () => {
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState([]);
  const [article, setArticle] = useState({
    heading: "",
    body: "",
    imageName: "",
  });
  const { heading, body, imageName } = article;

  async function createArticle() {
    await supabase
      .from("articles")
      .insert([
        {
          heading,
          body,
          imageName,
        },
      ])
      .single();
    setArticle({
      heading: "",
      body: "",
      imageName: "",
    });
  }

  useEffect(() => {
    fetchphotos();
  }, []);

  async function fetchphotos() {
    const { data, error } = await supabase.storage
      .from("images")
      .list("public/");
    setPhoto(data);
  }

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `image-${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;
    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (error) {
      alert("Error uploading file");
      console.log(error);
    } else {
      alert("File uploaded successfully");
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileInputChange} />
        <button onClick={handleUploadClick}>Upload</button>

        <div>
          {photo.map((file) => (
            <img
              src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${file.name}`}
              alt={file.name}
              key={file.name}
            />
          ))}
        </div>
      </div>
      <div>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Name"
          value={heading}
          onChange={(e) => setArticle({ ...article, heading: e.target.value })}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Name"
          value={body}
          onChange={(e) => setArticle({ ...article, body: e.target.value })}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-5 mx-5 w-[150px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Name"
          value={imageName}
          onChange={(e) => setArticle({ ...article, imageName: e.target.value })}
        />
        <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[120px] sm:w-auto px-5 py-2.5 mx-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={createArticle}
              >
                Create Article
              </button>
      </div>
    </div>
  );
};

export default Articles;
