import React, { useState, useRef } from "react";
import Table from "../../components/common/Table/Table_Component";
import CustomModal from "../../components/common/Modal";

const data = [
  {
    id: 1,
    nameOfPdf: "John Doe",
    totalAmountKey: 25,
    statusKey: "Rejected",
    actionInvoiceKey: 22,
  },
  {
    id: 2,
    nameOfPdf: "Jane Doe",
    totalAmountKey: 30,
    statusKey: "Accepted",
    actionInvoiceKey: 1,
  },
  {
    id: 3,
    nameOfPdf: "Kamil",
    totalAmountKey: 12,
    statusKey: "Pending",
    actionInvoiceKey: 22,
  },
];

const columns = [
  { key: "id", header: "Id" },
  { key: "nameOfPdf", header: "Name" },
  { key: "totalAmountKey", header: "Amount" },
  { key: "statusKey", header: "Status" },
  { key: "actionInvoiceKey", header: "Action" },
];

const InvoiceShop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl	mb-6">View Invoice</h2>
      <div className="rounded-lg border-2 border-black ">
        <Table data={data} columns={columns} disableRowClick={true} />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={
          selectedRow && (
            <div>
              <h2>{selectedRow.nameContractor}'s Details</h2>
              <p>Date: {selectedRow.date}</p>
              <p>Status: {selectedRow.status}</p>
            </div>
          )
        }
      />{" "}
    </div>
  );
};

export default InvoiceShop;
