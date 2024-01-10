// ClientShop component
import Table from "../../components/common/Table/Table_Component";
import { ListCardForShop } from "../../components/common/Cards";
import React, { useState, useEffect } from "react";
import ReusableButton from "../../components/common/SaveButton";
import ModalAddToCartItem from "../../pages/Client/Client_Modal/Client_ModalAddToCartItem";

import CustomModal from "../../components/common/Modal";

import shopimgexample from "../../img/shop_example_img.png";
import ApiService from "../../API/ApiService";

const ClientShop = () => {
  const [data, setData] = useState([]);
  const [isAddToCartItemModalOpen, setIsAddToCartItemModalOpen] =
    useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
    setIsAddToCartItemModalOpen(true);
    setSelectedRow(row);
  };

  const closeModal = () => {
    console.log("Modal closed");
    setIsAddToCartItemModalOpen(false);
    setIsCustomModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl mb-6">Shoping</h2>
      <div>
        <ListCardForShop sampleData={data} onRowClick={handleRowClick} />
      </div>

      {/* <ModalAddToCartItem
        isOpen={isModalOpenForRow}
        closeModal={closeModal}
        selectedItem={selectedRow}
      /> */}

      <CustomModal
        isOpen={isCustomModalOpen}
        closeModal={closeModal}
        content={
          selectedRow && (
            <div>
              {/* Render the content of your modal here */}
              <h3>{selectedRow.name_of_item}</h3>
              <p>{selectedRow.description_item}</p>
              {/* Add other details as needed */}
            </div>
          )
        }
      />
    </div>
  );
};

export default ClientShop;
