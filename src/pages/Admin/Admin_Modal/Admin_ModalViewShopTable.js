import React, { useState, useEffect } from "react";
import CustomModal from "../../../components/common/Modal";
import Input from "../../../components/common/InputField";
import Button from "../../../components/common/SaveButton";
import addIcon from "../../../img/icon/add-icon.png";
import deleteIcon from "../../../img/icon/delete-icon.png";
import UploadImage from "../../../components/common/UploadImage";
import exampleimg from "../../../img/icon/profile_pictures/male.png";
import axios from "axios";
import ApiService from "../../../API/ApiService.js";
import showToast from "../../../components/common/Toast.js";

const ModalViewShopTable = ({ isOpen, closeModal, selectedItem }) => {
  const [image, setImage] = useState(null);
  const [nameOfItem, setNameOfItem] = useState("");
  const [descriptionItem, setDescriptionItem] = useState("");
  const [quantityItem, setQuantityItem] = useState("");

  const [formData, setFormData] = useState({
    name_of_item: "",
    description_item: "",
    quantity_item: "",
    price_item: "",
    image_item: "",
    item_id: "",
    image: null,
  });

  useEffect(() => {
    // Update form data when selectedItem changes
    if (selectedItem) {
      setFormData({
        name_of_item: selectedItem.name_of_item,
        description_item: selectedItem.description_item,
        quantity_item: selectedItem.quantity_item,
        price_item: selectedItem.price_item,
        image_item: selectedItem.image_item,
        item_id: selectedItem.item_id,
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    //console.log("handleSubmit called");

    e.preventDefault();

    const itemListData = new FormData();
    itemListData.append("image", image);
    itemListData.append("name_of_item", nameOfItem);
    itemListData.append("description_item", descriptionItem);
    itemListData.append("quantity_item", quantityItem);
    //console.log(itemListData);
    try {
      const updateProfileData = `update/shop/item/lists/${selectedItem.item_id}`;
      await ApiService.update(updateProfileData, itemListData);
      //console.log("successful");
      showToast("👍 Successful Submit!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      content={
        selectedItem &&
        selectedItem && (
          <div className="grid grid-flow-col gap-3">
            <div className="bg-slate-50 col-auto flex items-center justify-center rounded-lg">
              <img
                src={
                  `http://127.0.0.1:8000/${formData.image_item}` || exampleimg
                }
                alt={formData.name_of_item}
                style={{ maxWidth: "200px" }}
              />
            </div>
            <div className="col-auto">
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold mb-10">Add new item</h2>
                <label className="font-semibold">Name item:</label>
                <Input
                  className="mb-8"
                  type="text"
                  name="name_of_item"
                  value={formData.name_of_item}
                  onChange={handleChange}
                />
                <label className="font-semibold">Description:</label>
                <textarea
                  rows={4}
                  name="description_item"
                  value={formData.description_item}
                  onChange={handleChange}
                  className="mb-8 focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset w-full border border-1 border-gray-300 p-2 rounded bg-gray-50 text-black"
                />
                <label className="font-semibold">Quantity</label>
                <Input
                  className="mb-8"
                  type="number"
                  name="quantity_item"
                  value={formData.quantity_item}
                  onChange={handleChange}
                />
                <label className="font-semibold">Price: (RM)</label>
                <Input
                  className="mb-8"
                  type="number"
                  name="price_item"
                  value={formData.price_item}
                  onChange={handleChange}
                />
                {/* <label className="font-semibold">Add image:</label> */}
                {/* <div className="mb-8">
                  <UploadImage onImageChange={handleImageChange} />
                </div> */}
                {/* <div className="mb-8 max-w-sm">
                  <div className="mb-8 max-w-sm">
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                    />
                  </div>
                </div> */}
                <div className="flex justify-end">
                  <div className="mr-4">
                    <Button
                      label="Delete item"
                      color="DeleteButton"
                      src={deleteIcon}
                      //   onClick={handleDelete}
                    />
                  </div>
                  <div>
                    <Button
                      label="Update item"
                      color="AddButton"
                      src={addIcon}
                      type="submit" // Make sure it's a submit button
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
      }
    />
  );
};

export default ModalViewShopTable;
