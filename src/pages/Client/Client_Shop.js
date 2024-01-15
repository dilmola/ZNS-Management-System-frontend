// ClientShop component
import Table from "../../components/common/Table/Table_Component";
import { ListCardForShop } from "../../components/common/Cards";
import React, { useState, useEffect } from "react";
import ReusableButton from "../../components/common/SaveButton";
import ModalAddToCartItem from "../../pages/Client/Client_Modal/Client_ModalAddToCartItem";
import { useParams } from "react-router-dom"; // Import useParams
import showToast from "../../components/common/Toast.js";
import { ToastContainer } from "react-toastify";
import CustomModal from "../../components/common/Modal";

import ApiService from "../../API/ApiService";

const ClientShop = () => {
  const [data, setData] = useState([]);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpenForAddItem, setIsModalOpenForAddItem] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpointAppointmentList = "get/shop/item/lists";
        const responseShopItemListsData = await ApiService.get(
          endpointAppointmentList
        );
        const shopItemListsData = responseShopItemListsData.data || [];

        const transformedData = shopItemListsData.map((item, index) => ({
          id: index + 1,
          item_id: item.id,
          name_of_item: item.name_of_item,
          description_item: item.description_item,
          quantity_item: item.quantity_item,
          price_item: item.price_item,
          image_item: item.image_item,
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (item) => {
    //console.log("click");
    setIsModalOpenForAddItem(true);
    setSelectedRow(item);
    setTotalAmount(item.quantity_item * item.price_item);
  };
  const closeModal = () => {
    setIsModalOpenForAddItem(false);
    setSelectedRow(null);
  };

  const handleAddToCart = async (selectedItem) => {
    //console.log
    ({
      itemId: selectedItem.item_id,
      itemName: selectedItem.name_of_item,
      quantity: "1",
      price: selectedItem.price_item,
      totalAmount: selectedItem.quantity_item * selectedItem.price_item,
    });
    try {
      // Prepare the data to be sent to the server
      const postData = {
        itemId: selectedItem.item_id,
        itemName: selectedItem.name_of_item,
        quantity: "1",
        price: selectedItem.price_item,
      };

      // Make an HTTP POST request to your server endpoint
      const response = await ApiService.post(
        `new/payment/item/${selectedItem.item_id}/user/${userId}`,
        postData
      );
      showToast("👍 Successful Submit!");

      // Log the server response (you can customize this based on your needs)
      //console.log("Server Response:", response.data);

      // Implement additional logic as needed
    } catch (error) {
      // Handle error if the POST request fails
      console.error("Error adding to cart:", error);
    }

    closeModal(); // Close the modal after adding to the cart (you can adjust this based on your requirements)
  };
  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl mb-6">Inventory</h2>
      <div>
        <ListCardForShop sampleData={data} onRowClick={handleRowClick} />
      </div>

      {selectedRow && (
        <CustomModal
          isOpen={isModalOpenForAddItem}
          closeModal={closeModal}
          content={
            <div className="p-4 bg-white rounded">
              <h3 className="text-xl font-semibold mb-2">
                Name item: {selectedRow.name_of_item}
              </h3>
              <p className="text-gray-600 mb-2">
                Description: {selectedRow.description_item}
              </p>
              <p className="text-gray-600 mb-2">
                Quantity: {selectedRow.quantity_item}
              </p>
              <p className="text-green-600 font-bold mb-4">
                Price: {selectedRow.price_item}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleAddToCart(selectedRow)}
              >
                Add to Cart
              </button>
            </div>
          }
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ClientShop;
