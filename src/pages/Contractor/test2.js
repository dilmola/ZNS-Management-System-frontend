import React, { useState, useEffect } from "react";

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [nameOfItem, setNameOfItem] = useState("");
  const [descriptionItem, setDescriptionItem] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name_of_item', nameOfItem);
    formData.append('description_item', descriptionItem);

    try {
      const endpoint = editingItemId
        ? `http://127.0.0.1:8000/api/edit/shop/item/${editingItemId}`
        : 'http://127.0.0.1:8000/api/upload';

      const method = editingItemId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (response.ok) {
        console.log(
          editingItemId
            ? 'Item edited successfully'
            : 'Image uploaded successfully'
        );
        setNameOfItem('');
        setDescriptionItem('');
        setImage(null);
        setEditingItemId(null);
        fetchShopItems(); // Assuming fetchShopItems is a function to update the item list
      } else {
        setError(
          editingItemId ? 'Error editing item' : 'Error uploading image'
        );
      }
    } catch (error) {
      setError(
        editingItemId ? 'Error editing item' : 'Error uploading image'
      );
    } finally {
      setLoading(false);
    }
  };


  const handleEditClick = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    setNameOfItem(itemToEdit.name_of_item);
    setDescriptionItem(itemToEdit.description_item);
    setEditingItemId(itemId);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete/shop/item/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Item deleted successfully");
        // Refresh the list of items after deleting
        fetchShopItems();
      } else {
        console.error("Error deleting item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const [items, setItems] = useState([]);

  const fetchShopItems = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/get/shop/item/lists"
      );
      const data = await response.json();

      if (response.ok) {
        setItems(data.data);
      } else {
        console.error("Error fetching shop items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching shop items:", error.message);
    }
  };

  useEffect(() => {
    fetchShopItems();
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="nameOfItem">Name of Item:</label>
          <input
            type="text"
            id="nameOfItem"
            value={nameOfItem}
            onChange={(e) => setNameOfItem(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="descriptionItem">Description Item:</label>
          <input
            type="text"
            id="descriptionItem"
            value={descriptionItem}
            onChange={(e) => setDescriptionItem(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit">
          {editingItemId ? "Edit Item" : "Upload Image"}
        </button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name_of_item}</strong> - {item.description_item}
            <br />
            {item.image_item && (
              <img
                src={`http://127.0.0.1:8000/${item.image_item}`}
                alt={item.name_of_item}
                style={{ maxWidth: "200px" }}
              />
            )}
            <button onClick={() => handleEditClick(item.id)}>Edit</button>
            <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageUploadForm;

// // ImageUploadComponent.jsx

// import React, { useState } from 'react';

// const ImageUploadComponent = () => {
//     const [description, setDescription] = useState('');
//     const [image, setImage] = useState(null);

//     const handleDescriptionChange = (e) => {
//         setDescription(e.target.value);
//     };

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         const formData = new FormData();
//         formData.append('description', description);
//         formData.append('image', image);

//         try {
//             // Make a POST request to your Laravel API endpoint
//             const response = await fetch('http://127.0.0.1:8000/api/create/shop/item/lists', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 console.log('Image uploaded successfully!');
//             } else {
//                 console.error('Failed to upload image.');
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     };

//     return (
//         <div>
//             <label>Description:</label>
//             <input type="text" value={description} onChange={handleDescriptionChange} />

//             <label>Image:</label>
//             <input type="file" onChange={handleImageChange} />

//             <button onClick={handleUpload}>Upload</button>
//         </div>
//     );
// };

// export default ImageUploadComponent;
