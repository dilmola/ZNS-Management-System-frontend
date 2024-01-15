import React, { useState } from "react";
import CustomModal from "../../../components/common/Modal";
import Input from "../../../components/common/InputField";
import Button from "../../../components/common/SaveButton";
import addIcon from "../../../img/icon/add-icon.png";
import UploadImage from "../../../components/common/UploadImage";
import showToast from "../../../components/common/Toast.js";

const ModalAddShop = ({ isOpen, closeModal, addItem }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [name, setName] = useState("");
  const [quantityItem, setQuantityItem] = useState("");
  const [priceItem, setPriceItem] = useState("");

  const [image, setImage] = useState(null);
  const [nameOfItem, setNameOfItem] = useState("");
  const [descriptionItem, setDescriptionItem] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name_of_item", nameOfItem);
    formData.append("description_item", descriptionItem);
    formData.append("quantity_item", quantityItem);
    formData.append("price_item", priceItem);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/create/shop/item/list",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        //console.log("Image uploaded successfully");
      } else {
        console.error("Error uploading image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      content={
        addItem && (
          <div>
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-10">Add new item</h2>
              <label className="font-semibold">Name item:</label>
              <Input
                type="text"
                name="name_of_item"
                value={nameOfItem}
                onChange={(e) => setNameOfItem(e.target.value)}
              />
              <label className="font-semibold">Description:</label>
              <textarea
                rows={4}
                name="description_item"
                value={descriptionItem}
                onChange={(e) => setDescriptionItem(e.target.value)}
                className="mb-8 focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset w-full border border-1 border-gray-300 p-2 rounded bg-gray-50 text-black"
              />
              <label className="font-semibold">Quantity</label>
              <Input
                className="mb-8"
                type="number"
                name="quantity_item"
                value={quantityItem}
                onChange={(e) => setQuantityItem(e.target.value)}
              />
              <label className="font-semibold">Price: (RM)</label>
              <Input
                className="mb-8"
                type="number"
                name="price_item"
                value={priceItem}
                onChange={(e) =>
                  setPriceItem(parseFloat(e.target.value).toFixed(2))
                }
              />
              <label className="font-semibold">Add image:</label>
              <div className="mb-8 max-w-sm">
                <input type="file" id="image" onChange={handleImageChange} />
              </div>
              <div className="flex justify-end">
                <button type="submit">Upload Image</button>
              </div>
            </form>
          </div>
        )
      }
    />
  );
};

export default ModalAddShop;
