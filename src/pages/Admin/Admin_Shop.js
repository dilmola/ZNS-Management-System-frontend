import Table from "../../components/common/Table/Table_Component";
import { ListCardForShopAdmintStatus } from "../../components/common/Cards";
import React, { useState, useEffect } from "react";
import ReusableButton from "../../components/common/SaveButton";
import addIcon from "../../img/icon/add-icon.png";
import ModalViewShopTable from "../../pages/Admin/Admin_Modal/Admin_ModalViewShopTable";
import ModalAddShop from "../../pages/Admin/Admin_Modal/Admin_ModalAddShop";
import ApiService from "../../API/ApiService";

const columns = [
  { header: "No", accessor: "id" },
  { header: "Name of Item", accessor: "name_of_item" },
  { header: "Description", accessor: "description_item" },
  { header: "Quantity", accessor: "quantity_item" },
  { header: "Price", accessor: "price_item" },
  // { header: "Image", accessor: "image_item" },
];

const AdminShop = () => {
  const [isModalOpenForRow, setIsModalOpenForRow] = useState(false);
  const [isModalOpenForAddItem, setIsModalOpenForAddItem] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedAddItem, setSelectedAddItem] = useState(null);
  const [outOfStockTotalData, setOutOfStockTotalData] = useState(null);
  const [itemTotalData, setItemTotalData] = useState(null);

  const handleRowClick = (row) => {
    setIsModalOpenForRow(true);
    setSelectedRow(row);
  };

  const handleAddItemClick = () => {
    setIsModalOpenForAddItem(true);
    setSelectedAddItem({
      itemName: "",
      descriptionItem: "",
      priceItem: "",
    });
  };

  const closeModal = () => {
    setIsModalOpenForRow(false);
    setSelectedRow(null);
    setIsModalOpenForAddItem(false);
    setSelectedAddItem(null);
  };

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
      setTableData(transformedData);
      //console.log(transformedData);

      const endpointTotalUserListAdmin = "view/total/available/item";
      const responseTotalUser = await ApiService.get(
        endpointTotalUserListAdmin
      );
      const userTotalData = responseTotalUser.totalItem || [];

      setItemTotalData(userTotalData);
      //console.log("User Data:", userTotalData);

      const endpointTotalContractorListAdmin = "view/total/out-of-stock/item";
      const responseTotalContractor = await ApiService.get(
        endpointTotalContractorListAdmin
      );
      const ContractorTotalData = responseTotalContractor.totalItem || [];

      setOutOfStockTotalData(ContractorTotalData);
      //console.log("User Data:", ContractorTotalData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //console.log("Table Data:", tableData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl	mb-6">Inventory</h2>
      <div>
        <ListCardForShopAdmintStatus
          itemTotalData={itemTotalData}
          outOfStockTotalData={outOfStockTotalData}
        />
      </div>
      <div className="flex justify-end mb-4">
        <div className="flex-none">
          <ReusableButton
            label="Add"
            color="AddButton"
            src={addIcon}
            onClick={() => handleAddItemClick()}
          />
        </div>
      </div>
      <div className="rounded-lg border-2 border-black ">
        <Table data={tableData} columns={columns} onRowClick={handleRowClick} />
      </div>

      <ModalViewShopTable
        isOpen={isModalOpenForRow}
        closeModal={closeModal}
        selectedItem={selectedRow}
      />

      <ModalAddShop
        isOpen={isModalOpenForAddItem}
        closeModal={closeModal}
        addItem={selectedAddItem}
      />
    </div>
  );
};

export default AdminShop;
