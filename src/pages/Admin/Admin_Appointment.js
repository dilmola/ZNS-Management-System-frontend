import React, { useState } from "react";
import { ListCardForAppointmentClientStatus } from "../../components/common/Cards";
import Table from "../../components/common/Table/Table_Component";
import CustomModal from "../../components/common/Modal";

const data = [
  { id: 1, nameContractor: "John Doe", date: 25, status: "Rejected" },
  { id: 2, nameContractor: "Jane Doe", date: 30, status: "Accepted" },
  { id: 3, nameContractor: "Kamil", date: 12, status: "Pending" },
];

const columns = [
  { key: "id", header: "No" },
  { key: "nameContractor", header: "Name of contractor" },
  { key: "date", header: "Date" },
  { key: "status", header: "Status" },
];

const AdminAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setIsModalOpen(true);
    setSelectedRow(row);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl	mb-6">Manage appointment</h2>
      <div>
        <ListCardForAppointmentClientStatus />
      </div>
      <div className="rounded-lg border-2 border-black ">
        <Table data={data} columns={columns} onRowClick={handleRowClick} />
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

export default AdminAppointment;
