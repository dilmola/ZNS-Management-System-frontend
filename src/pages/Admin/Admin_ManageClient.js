import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table/Table_Component";
import CustomModal from "../../components/common/Modal";
import ApiService from "../../API/ApiService";

const columns = [
  { header: "No", accessor: "fullname" },
  { header: "Username", accessor: "email" },
  { header: "Email", accessor: "phone" },
];

const ManageClient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clientRowData, selectedClientRowData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const endpointCLientList = "view/list/client";
      const responseCLientList = await ApiService.get(endpointCLientList);
      const ClientsData = responseCLientList.listuser || [];

      const transformedData = ClientsData.map((client, index) => ({
        id: index + 1,
        fullname: client.fullname,
        email: client.email,
        phone: client.phone,

        username: client.username,
        address: client.address,
      }));
      setTableData(transformedData);
      console.log(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (row) => {
    setIsModalOpen(true);
    selectedClientRowData(row);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    selectedClientRowData(null);
  };

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl	mb-6">Manage client</h2>
      <div className="rounded-lg border-2 border-black ">
        <Table data={tableData} columns={columns} onRowClick={handleRowClick} />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={
          clientRowData && (
            <div className="p-8">
              <h2 className="text-2xl mb-6">Client Detail</h2>

              <div className="mb-2">
                <p className="font-semibold">Fullname:</p>
                <p>{clientRowData.fullname}</p>
              </div>

              <div className="mb-2">
                <p className="font-semibold">Username:</p>
                <p>{clientRowData.username}</p>
              </div>

              <div className="mb-2">
                <p className="font-semibold">Email:</p>
                <p>{clientRowData.email}</p>
              </div>

              <div className="mb-2">
                <p className="font-semibold">Phone:</p>
                <p>{clientRowData.phone}</p>
              </div>

              <hr className="mb-6"></hr>

              <div className="mb-2 ">
                <p className="font-semibold">Address:</p>
                <p>{clientRowData.address}</p>
              </div>
            </div>
          )
        }
      />
    </div>
  );
};

export default ManageClient;
