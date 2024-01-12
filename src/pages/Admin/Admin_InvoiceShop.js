import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table/Table_Component";
import CustomModal from "../../components/common/Modal";
import ApiService from "../../API/ApiService";
import { useReactToPrint } from "react-to-print";
import PrintInvoice from "../../components/common/PrintInvoice";

const columns = [
  { header: "No", accessor: "id" },
  { header: "fullname", accessor: "fullname" },
  { header: "transaction_id", accessor: "transaction_id" },
  { header: "status", accessor: "status" },
];

const InvoiceShop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);

  const handleRowClick = (row) => {
    setIsModalOpen(true);
    setSelectedRow(row);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const fetchAppointmentsData = async () => {
    try {
      const endpointAppointmentList = `view/list/payment/item/`;
      const responseAppointmentList = await ApiService.get(
        endpointAppointmentList
      );
      const appointmentsData = responseAppointmentList.listSuccessPayment || [];
      console.log(appointmentsData);
      setAppointmentsData(appointmentsData);

      const uniqueData = appointmentsData.reduce((acc, appointment) => {
        const existingIndex = acc.findIndex(
          (item) => item.transaction_id === appointment.transaction_id
        );
        if (existingIndex === -1) {
          acc.push({
            id: acc.length + 1,
            transaction_id: appointment.transaction_id,
            status: appointment.status,
            fullname: appointment.fullname,
          });
        }
        return acc;
      }, []);

      setTableData(uniqueData);
      console.log(uniqueData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentsData();
  }, []);
  console.log("Table Data:", tableData);

  const fetchTransactionData = (transactionId) => {
    // Filter appointmentsData based on the selected transaction_id
    return appointmentsData.filter(
      (appointment) => appointment.transaction_id === transactionId
    );
  };
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const calculateTotalPrice = (targetTransactionId) => {
    const filteredTransactions = appointmentsData.filter(
      (appointment) => appointment.transaction_id === targetTransactionId
    );

    const totalPrice = filteredTransactions.reduce(
      (acc, transaction) => acc + parseFloat(transaction.price_item || 0),
      0
    );

    // Ensure the total price is at least 10.00
    const finalTotalPrice = Math.max(totalPrice - 10.0, 0); // Ensure the result is not negative

    return finalTotalPrice;
  };

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl mb-6">View Invoice</h2>
      <div className="rounded-lg border-2 border-black">
        <Table data={tableData} columns={columns} onRowClick={handleRowClick} />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={
          selectedRow && (
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Invoice Details</h2>
              <div className="flex flex-col mb-4">
                <p className="text-gray-600 mb-1">Transaction ID:</p>
                <p className="font-semibold">{selectedRow.transaction_id}</p>
              </div>
              <div className="flex flex-col mb-4">
                <p className="text-gray-600 mb-1">Status:</p>
                <p className="font-semibold">{selectedRow.status}</p>
              </div>
              <hr className="mb-4"></hr>
              <div className="flex flex-col mb-4">
                <p className="font-semibold text-black text-md opacity-30 ">
                  Deposit: RM10.00
                </p>
                <p className="text-gray-600 mb-1">Total Price:</p>
                <p className="font-semibold text-green-600 text-lg">
                  RM{calculateTotalPrice(selectedRow.transaction_id)}.00
                </p>
              </div>
              <div className="hidden">
                <PrintInvoice
                  ref={componentRef}
                  selectedRow={selectedRow}
                  appointmentsData={appointmentsData}
                  currentTransactionId={selectedRow.transaction_id}
                  calculateTotalPrice={calculateTotalPrice}
                />
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                onClick={handlePrint}
              >
                Download PDF
              </button>
            </div>
          )
        }
      />
    </div>
  );
};

export default InvoiceShop;
