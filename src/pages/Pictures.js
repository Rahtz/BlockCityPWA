import { useState, useEffect } from "react";
import { supabase } from "../services/client";
import AdminNav from "../layout/AdminNav";


const Pictures = () => {
  const [imageName, setImageName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    fetchPictures();
    fetchPic();
  }, []);

  async function fetchPictures() {
    const { data } = await supabase.from('pictures').select('*');
    setPictures(data);
  }

  async function fetchPic() {
    const { data } = await supabase.storage
        .from('images')
        .list('public');

    const filtered = data.filter(image => image.name === "test")   
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleInputChange = (event) => {
    setImageName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      console.log('No image selected.');
      return;
    }

    const imageNameWithExtension = imageName;
    const { data, error } = await supabase.storage
      .from('images/public')
      .upload(imageNameWithExtension, selectedImage);

    if (error) {
      console.error('Error uploading image:', error);
    } else {
      console.log('Image uploaded successfully.');
      const { data: imageData, error: imageError } = await supabase
        .from('pictures')
        .insert([{ picture_url: imageNameWithExtension }]);

      if (imageError) {
        console.error('Error saving image name:', imageError);
      } else {
        console.log('Image name saved successfully.');
        fetchPictures(); // Fetch pictures again to update the table
        setImageName(''); // Clear the input field
      }
    }
  };

  const handleDelete = async (picture) => {
    const imageNameWithExtension = picture.picture_url;
  
    try {
      // Check if the image exists in Supabase storage
      const { data } = await supabase.storage
        .from('images')
        .list('public');
      const filtered = data.filter(image => image.name === `${imageNameWithExtension}`)  
  
      if (!filtered || filtered.length === 0) {
        console.log('Image does not exist.');
        return;
      }
  
      // Delete the image from Supabase storage
      await supabase.storage
      .from('images')
      .remove([`public/${imageNameWithExtension}`]);
      console.log('Image deleted from storage successfully.');
  
      // Delete the image name from the pictures table
      const { data: deleteData } = await supabase
        .from('pictures')
        .delete()
        .eq('picture_url', imageNameWithExtension);
      console.log('Image name deleted from the pictures table successfully.');
  
      fetchPictures(); // Fetch pictures again to update the table
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const deleteImg = async (picture) => {
    const imageNameWithExtension = picture.picture_url;
    await supabase.storage
      .from('images')
      .remove(['public/test1.jpg']);
  }

  

  return (
    <div>
    <AdminNav/>
    <div className="ml-[200px] px-8">
  <form onSubmit={handleSubmit} className="mb-4">
    <label className="block mb-2">
      Image Name:
      <input
        type="text"
        value={imageName}
        onChange={handleInputChange}
        className="border border-gray-300 px-2 py-1 mt-1"
      />
    </label>
    <br />
    <label className="block mb-2">
      Select Image:
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1"
      />
    </label>
    <br />
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Upload
    </button>
  </form>
  <br />
  <table className="table-auto">
    <thead>
      <tr>
        <th className="px-4 py-2">Image Name</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {pictures.map((picture) => (
        <tr key={picture.id}>
          <td className="px-4 py-2">{picture.picture_url}</td>
          <td className="px-4 py-2">
            <button
              onClick={() => handleDelete(picture)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
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
};

export default Pictures;