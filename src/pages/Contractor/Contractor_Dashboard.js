import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table/Table_Component";
import { ListCardForPaymentStatus } from "../../components/common/Cards";
import { useParams } from "react-router-dom"; // Import useParams
import showToast from "../../components/common/Toast.js";
import { ToastContainer } from "react-toastify";
import CustomModal from "../../components/common/Modal";
import ApiService from "../../API/ApiService";

const columns = [
  { header: "No", accessor: "id" },
  { header: "Name of client", accessor: "client_fullname" },
  { header: "Date Appointment", accessor: "date_appointment" },
  { header: "Date Submit", accessor: "add_appointment_date" },
  { header: "Status", accessor: "appointment_status" },
];

const columns2 = [
  { header: "No", accessor: "id" },
  { header: "Name of client", accessor: "client_fullname2" },
  { header: "Date Appointment", accessor: "date_appointment2" },
  { header: "Date Submit", accessor: "add_appointment_date2" },
  { header: "Status", accessor: "appointment_status2" },
];

const ContractorDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [appointmentRowData, selectedAppointmentRowData] = useState(null);
  const [appointmentRowData2, selectedAppointmentRowData2] = useState(null);

  const { userId } = useParams(); // Get user_id from URL params

  const handleRowClick = (row) => {
    setIsModalOpen(true);
    selectedAppointmentRowData(row);
    selectedAppointmentRowData2(row);

  };

  const closeModal = () => {
    setIsModalOpen(false);
    selectedAppointmentRowData(null);
    selectedAppointmentRowData2(null);

  };

  const handleAcceptClick = async () => {
    try {
      const updatedData = {
        ...appointmentRowData,
        appointment_status: 1,
      };
      const endpointupdatestatus = `update/appointment/${updatedData.appointment_id}/contractor/${userId}/status/${updatedData.appointment_status}`;
      await ApiService.update(endpointupdatestatus, updatedData);
      showToast("👍 Successful Submit!");

      closeModal();
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);

  const fetchData = async () => {
    try {
      const endpointAppointmentList = `view/listforcontractor/appointment/${userId}`;
      const responseAppointmentList = await ApiService.get(
        endpointAppointmentList
      );
      const appointmentsData = responseAppointmentList.appointment || [];

      const transformedData = appointmentsData.map((appointment, index) => ({
        id: index + 1,
        client_fullname: appointment.client_fullname,
        date_appointment: appointment.date_appointment,
        appointment_status: appointment.appointment_status,
        add_appointment_date: appointment.add_appointment_date,

        client_fullname: appointment.client_fullname,
        appointment_id: appointment.appointment_id,
        remark: appointment.remark,
        address: appointment.address,
        appointment_type: appointment.appointment_type,
      }));

      setTableData(transformedData);
      console.log(transformedData);

      const endpointAppointmentList2 = `ViewAcceptAppointmentContractor/${userId}`;
      const responseAppointmentList2 = await ApiService.get(
        endpointAppointmentList2
      );
      const appointmentsData2 = responseAppointmentList2.appointment || [];

      const transformedData2 = appointmentsData2.map((appointment2, index) => ({
        id: index + 1,
        contractor_fullname2: appointment2.contractor_fullname,
        date_appointment2: appointment2.date_appointment,
        appointment_status2: appointment2.appointment_status,
        add_appointment_date2: appointment2.add_appointment_date,

        client_fullname2: appointment2.client_fullname,
        appointment_id2: appointment2.appointment_id,
        remark2: appointment2.remark,
        address2: appointment2.address,
        appointment_type2: appointment2.appointment_type,
      }));

      setTableData2(transformedData2);
      console.log(transformedData2);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("Table Data:", tableData2);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-12 mt-8.6m">
      {/* <h2 className="text-2xl	mb-6">Payment (In progress)</h2>
      <div>
        <ListCardForPaymentStatus />
      </div> */}

      <h2 className="text-2xl	mb-6">Appointment</h2>
      <h2 className="text-xl	mb-6">List Pending Appointment</h2>

      <div className="rounded-lg border-2 border-black ">
        <Table data={tableData} columns={columns} onRowClick={handleRowClick} />
      </div>
      <h2 className="text-xl	mb-6">List Accept Appointment</h2>

      <div className="rounded-lg border-2 border-black ">
        <Table
          data={tableData2}
          columns={columns2}
          onRowClick={handleRowClick}
        />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={
          appointmentRowData&& (
            <div className="p-8">
              <h2 className="text-2xl mb-6">Appointment Detail</h2>

              <div className="mb-2">
                <p className="font-semibold">Name of client:</p>
                {appointmentRowData.client_fullname ? (
                  <p>{appointmentRowData.client_fullname}</p>
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
                <p className="font-semibold"> Contractor action:</p>
                {appointmentRowData.appointment_status === "Accepted" ? (
                  <p className="font-semibold text-green-500">Accepted</p>
                ) : (
                  <button
                    onClick={handleAcceptClick}
                    className="bg-green-500 text-white p-2 rounded-md"
                  >
                    Accept
                  </button>
                )}
              </div>
            </div>
          )
        }
      />
      <CustomModal
        isOpen={isModalOpen2}
        closeModal={closeModal}
        content={
          appointmentRowData2 && (
            <div className="p-8">
              <h2 className="text-2xl mb-6">Appointment Detail</h2>

              <div className="mb-2">
                <p className="font-semibold">Name of client:</p>
                <p>{appointmentRowData2.client_fullname2}</p>
              </div>

              <div className="mb-2">
                <p className="font-semibold">Name of contractor:</p>
                {appointmentRowData2.contractor_fullname ? (
                  <p>{appointmentRowData2.contractor_fullname2}</p>
                ) : (
                  <p className="font-semibold text-red-500"> No assign </p>
                )}
              </div>

              <div className="mb-2">
                <p className="font-semibold">Date Appointment:</p>
                <p>{appointmentRowData2.date_appointment2}</p>
              </div>

              <div className="mb-2">
                <p className="font-semibold">Date Submit:</p>
                <p>{appointmentRowData2.add_appointment_date2}</p>
              </div>
              <hr className="mb-6"></hr>

              <div className="mb-2 ">
                <p className="font-semibold">Remark:</p>
                <p>{appointmentRowData2.remark2}</p>
              </div>
            </div>
          )
        }
      />
      <ToastContainer />
    </div>
  );
};

export default ContractorDashboard;
