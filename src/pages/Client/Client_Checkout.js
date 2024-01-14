import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table/Table_Component";
import ApiService from "../../API/ApiService.js";
import { useParams } from "react-router-dom";
import Button from "../../components/common/SaveButton";
import showToast from "../../components/common/Toast.js";
import { ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const columns = [
  { header: "No", accessor: "id" },
  { header: "Name of items", accessor: "name_of_item" },
  { header: "Price (RM)", accessor: "price_item" },
];

const ClientCheckOut = () => {
  const [tableData, setTableData] = useState([]);
  const { userId } = useParams();
  const [beforeDepositPrice, setBeforeDepositPrice] = useState(0); // Initialize with default value
  const [finalTotalPrice, setFinalTotalPrice] = useState(0); // Initialize with default value
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const endpointShopListCheckout = `payment/required/item/${userId}`;
      const responseShopListCheckout = await ApiService.get(
        endpointShopListCheckout
      );
      const shopListCheckoutData =
        responseShopListCheckout.listPendingPayment || [];

      const transformedData = shopListCheckoutData.map((checkout, index) => ({
        id: index + 1,
        user_id: checkout.user_id,
        name_of_item: checkout.name_of_item,
        price_item: checkout.price_item,
        shop_item_list_id: checkout.shop_item_list_id,
      }));

      setBeforeDepositPrice(responseShopListCheckout.beforeDepositPrice);
      setFinalTotalPrice(responseShopListCheckout.finalTotalPrice);

      setTableData(transformedData);
      console.log(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("Table Data:", tableData);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const updateProfileData = `update/success/payment/user/${userId}`;
      const updateData = {
        shop_item_list_id: tableData.map((item) => item.shop_item_list_id),
        // Add other data if needed
      };
      window.location.href = 'http://127.0.0.1:8000/toyyibpay';

      await ApiService.update(updateProfileData, updateData);
      console.log("successful");
      showToast("👍 Successful Checkout!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl	mb-6">Checkout</h2>
      <div className="rounded-lg border-2 border-black ">
        <Table data={tableData} columns={columns} onRowClick={null} />
      </div>
      <div className="flex flex-row-reverse mt-12 bg-CharlestonGreenColorCard p-4 rounded-lg">
        <Button
          label="Checkout"
          color="SubmitButton"
          // src={submitIcon}
          onClick={handleSubmit}
        />
        <div className="mr-8 flex flex-col text-white	">
          <div className="font-semibold	text-2xl mb-2 ">
            <small className="opacity-50">Deposit:</small> RM 10.00
          </div>
          <div className="opacity-50 ">
            The total price for this purchase after deposit RM:
          </div>
          <p className="text-base	 opacity-50">
            RM {beforeDepositPrice} - RM 10.00
          </p>
          <p className="text-lg	 opacity-100">RM {finalTotalPrice}</p>
        </div>http://127.0.0.1:8000/toyyibpay
      </div>
      <ToastContainer />
    </div>
  );
};

export default ClientCheckOut;
