import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table/Table_Component";
import {
  ListCardForPaymentStatus,
  ListCardForUserStatus,
} from "../../components/common/Cards";
import CustomModal from "../../components/common/Modal";
import ApiService from "../../API/ApiService";

const columns = [
  { header: "No", accessor: "id" },
  { header: "Name of contractor", accessor: "contractor_fullname" },
  { header: "Date Appointment", accessor: "date_appointment" },
  { header: "Date Submit", accessor: "add_appointment_date" },
  { header: "Status", accessor: "appointment_status" },
];

const Body = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentRowData, selectedAppointmentRowData] = useState(null);

  const handleRowClick = (row) => {
    setIsModalOpen(true);
    selectedAppointmentRowData(row);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    selectedAppointmentRowData(null);
  };

  const [userTotalData, setUserTotalData] = useState(null);
  const [contractorTotalData, setContractorTotalData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const fetchData = async () => {
    try {
      const endpointAppointmentList = "view/appointment-listforadmin";
      const responseAppointmentList = await ApiService.get(
        endpointAppointmentList
      );
      const appointmentsData = responseAppointmentList.listuser || [];

      const transformedData = appointmentsData.map((appointment, index) => ({
        id: index + 1,
        contractor_fullname: appointment.contractor_fullname,
        date_appointment: appointment.date_appointment,
        appointment_status: appointment.appointment_status,
        add_appointment_date: appointment.add_appointment_date,
        client_fullname: appointment.client_fullname,
        remark: appointment.remark,
        address: appointment.address,
        appointment_type: appointment.appointment_type,
      }));
      setTableData(transformedData);
      //console.log(transformedData);

      const endpointTotalUserListAdmin = "view/users-listforadmin";
      const responseTotalUser = await ApiService.get(
        endpointTotalUserListAdmin
      );
      const userTotalData = responseTotalUser.listuser || [];

      setUserTotalData(userTotalData);
      //console.log("User Data:", userTotalData);

      const endpointTotalContractorListAdmin = "view/contractors-listforadmin";
      const responseTotalContractor = await ApiService.get(
        endpointTotalContractorListAdmin
      );
      const ContractorTotalData = responseTotalContractor.listuser || [];

      setContractorTotalData(ContractorTotalData);
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
      <h2 className="text-2xl	mb-6">Number of users</h2>
      <div>
        <div>
          <ListCardForUserStatus
            userTotalData={userTotalData}
            contractorTotalData={contractorTotalData}
          />
        </div>
      </div>
      {/* 
      <h2 className="text-2xl	mb-6">Payment (in progress)</h2>
      <div>
        <ListCardForPaymentStatus />
      </div> */}

      <h2 className="text-2xl	mb-6">Appointment</h2>

      <div className="rounded-lg border-2	border-black ">
        <Table data={tableData} columns={columns} onRowClick={handleRowClick} />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={
          appointmentRowData && (
            <div className="p-8">
              <h2 className="text-2xl mb-6">Appointment Detail</h2>

              <div className="mb-2">
                <p className="font-semibold">Name of client:</p>
                <p>{appointmentRowData.client_fullname}</p>
              </div>

              <div className="mb-2">
                <p className="font-semibold">Name of contractor:</p>
                {appointmentRowData.contractor_fullname ? (
                  <p>{appointmentRowData.contractor_fullname}</p>
                ) : (
                  <p className="font-semibold text-red-500"> No assign </p>
                )}
              </div>

              <div className="mb-2">
                <p className="font-semibold">Date Appointment:</p>
                <p>{appointmentRowData.date_appointment}</p>
              </div>

              <div className="mb-2">
                <p className="font-semibold">Date Submit:</p>
                <p>{appointmentRowData.add_appointment_date}</p>
              </div>
              <hr className="mb-6"></hr>

              <div className="mb-2 ">
                <p className="font-semibold">Remark:</p>
                <p>{appointmentRowData.remark}</p>
              </div>
              <hr className="mb-6"></hr>

              <div className="mb-2">
                <p className="font-semibold"> Status:</p>
                <p
                  className={`font-semibold ${
                    appointmentRowData.appointment_status === "Accepted"
                      ? "text-green-500"
                      : appointmentRowData.appointment_status === "Pending"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {appointmentRowData.appointment_status}
                </p>
              </div>
            </div>
          )
        }
      />
    </div>
  );
};

export default Body;
