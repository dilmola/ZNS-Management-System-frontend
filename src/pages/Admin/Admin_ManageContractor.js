import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table/Table_Component";
import CustomModal from "../../components/common/Modal";
import ApiService from "../../API/ApiService";
import ModalViewShopTable from "../Admin/Admin_Modal/Admin_ModalAddContractor";

const columns = [
  { header: "No", accessor: "id" },

  { header: "Fullname", accessor: "fullname" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Status", accessor: "contractorStatus" },
];

const ManageContractor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddContractorModalOpen, setAddContractorIsModalOpen] =
    useState(false);
  const [isModalOpenForRow, setIsModalOpenForRow] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [clientRowData, selectedClientRowData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("active"); // Default status
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const endpointCLientList = "view/list/contractor";
      const responseCLientList = await ApiService.get(endpointCLientList);
      const ClientsData = responseCLientList.listuser || [];

      const transformedData = ClientsData.map((client, index) => ({
        id: index + 1,
        fullname: client.fullname,
        email: client.email,
        phone: client.phone,

        contractorId: client.contractorId,
        contractorStatus: client.status,
        username: client.username,
        address: client.address,
      }));
      setTableData(transformedData);
      //console.log(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = async () => {
    // Ensure clientRowData exists
    if (clientRowData) {
      const contractorId = clientRowData.contractorId;
      const currentStatus = clientRowData.contractorStatus;

      // Make an API call to update the status
      try {
        const updatedStatus =
          currentStatus === "active" ? "inactive" : "active";
        const updateEndpoint = `update/status/${updatedStatus}/contractor/${contractorId}`;
        await ApiService.update(updateEndpoint);

        // Update the status in the local state
        const updatedData = tableData.map((client) =>
          client.id === clientRowData.id
            ? { ...client, contractorStatus: updatedStatus }
            : client
        );

        setTableData(updatedData);
        // Optionally, you can update clientRowData as well
        selectedClientRowData({
          ...clientRowData,
          contractorStatus: updatedStatus,
        });

        //console.log("Status updated successfully");
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const handleAddContractor = () => {
    // Logic for handling the addition of a new contractor
    // You can show a different modal or perform other actions
    //console.log("Adding a new contractor");
    setAddContractorIsModalOpen(true);
  };

  const handleRowClick = (row) => {
    setIsModalOpen(true);
    setAddContractorIsModalOpen(true);
    selectedClientRowData(row);
    setSelectedRow(row);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAddContractorIsModalOpen(false);
    selectedClientRowData(null);
  };

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl	mb-6">Manage contractor</h2>
      <button
        onClick={handleAddContractor}
        className="bg-TerraCotta hover:bg-TerraCotta text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Contractor
      </button>
      <div className="rounded-lg border-2 border-black ">
        <Table data={tableData} columns={columns} onRowClick={handleRowClick} />
      </div>

      <ModalViewShopTable
        isOpen={isAddContractorModalOpen}
        closeModal={closeModal}
        selectedItem={selectedRow}
      />

      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={
          clientRowData && (
            <div className="p-8">
              <h2 className="text-2xl mb-6">Contractor Detail</h2>

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

              <div className="mb-2">
                <p className="font-semibold">Status:</p>
                <p
                  className={`font-bold ${
                    clientRowData.contractorStatus === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {clientRowData.contractorStatus}
                </p>
              </div>

              <hr className="mb-6"></hr>

              <div className="mb-2 ">
                <p className="font-semibold">Address:</p>
                <p>{clientRowData.address}</p>
              </div>

              <button
                onClick={() =>
                  handleToggleStatus(clientRowData.id, currentStatus)
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Toggle Status
              </button>
            </div>
          )
        }
      />
    </div>
  );
};

export default ManageContractor;
