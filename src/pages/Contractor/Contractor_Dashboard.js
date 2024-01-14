import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table/Table_Component";
import { ListCardForPaymentStatus } from "../../components/common/Cards";
import { useParams } from "react-router-dom"; // Import useParams
import showToast from "../../components/common/Toast.js";
import { ToastContainer } from "react-toastify";
import CustomModal from "../../components/common/Modal";
import ApiService from "../../API/ApiService.js";

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

const columnsSecondAppointment = [
  { header: "No", accessor: "id" },
  { header: "Name of client", accessor: "client_fullname_Sec" },
  { header: "Date Appointment", accessor: "second_appointment_date_Sec" },
  { header: "Status", accessor: "second_appointment_status_Sec" },
];

const ContractorDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalSecondAppointmentOpen, setIsModalSecondAppointmentOpen] =
    useState(false);
  const [documentOptions, setDocumentOptions] = useState([]);

  const [appointmentRowData, selectedAppointmentRowData] = useState(null);
  const [appointmentRowData2, selectedAppointmentRowData2] = useState(null);
  const [secondAppointmentRowData, selectedSecondAppointmentRowData2] =
    useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const { userId } = useParams(); // Get user_id from URL params

  const handleRowClick = (row) => {
    setIsModalOpen(true);
    selectedAppointmentRowData(row);
  };

  const handleRowClick2 = (row) => {
    setIsModalOpen2(true);
    selectedAppointmentRowData2(row);
  };

  const handleRowAppointmentClick = (row) => {
    setIsModalSecondAppointmentOpen(true);
    selectedSecondAppointmentRowData2(row);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalSecondAppointmentOpen(null);
    selectedAppointmentRowData(null);
    selectedAppointmentRowData2(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    try {
      const response = await ApiService.post("create/second/appointment/", {
        date_appointment: selectedDate,
        document_id: selectedCategory,
        appoinment_first_id: secondAppointmentRowData.appointment_id_Sec,
      });
      console.log("Form data submitted successfully:", response);

      // showToast('👍 Successful Submit!');
    } catch (error) {
      console.error("Error submitting form data:", error.message);

      showToast("Failed to create appointment. Please try again.");
    }
    console.log("Submitting data:", selectedDate, selectedCategory);
  };

  const handleSubmitInvoice = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    try {
      const response = await ApiService.post("create/second/appointment/", {
        date_appointment: selectedDate,
        document_id: selectedCategory,
        appoinment_first_id: secondAppointmentRowData.appointment_id_Sec,
      });
      console.log("Form data submitted successfully:", response);

      // showToast('👍 Successful Submit!');
    } catch (error) {
      console.error("Error submitting form data:", error.message);

      showToast("Failed to create appointment. Please try again.");
    }
    console.log("Submitting data:", selectedDate, selectedCategory);
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

  const handleDoneClick = async () => {
    try {
      const updatedData = {
        ...appointmentRowData2,
        status_second_appointment: 1,
      };
      const endpointupdatestatus = `update/second/appointment/done/${updatedData.appointment_id2}`;
      await ApiService.update(endpointupdatestatus, updatedData);
      // showToast("👍 Successful Submit!");

      // closeModal();
      console.log(updatedData);
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableSecAppointmentData, setTableSecAppointmentData] = useState([]);

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
        appointmet_address: appointment.address,

        appointment_id: appointment.appointment_id,
        remark: appointment.remark,
        appointment_type: appointment.appointment_type,
      }));
      setTableData(transformedData);
      console.log(transformedData);

      const endpointAppointmentList2 = `ViewAcceptAppointmentContractor/${userId}`;
      const responseAppointmentList2 = await ApiService.get(
        endpointAppointmentList2
      );
      const appointmentsData2 = responseAppointmentList2.appointment || [];
      console.log(appointmentsData2);
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

      const endpointSecondAppointmentList = `view/list/second/appointment/contractor/${userId}`;
      const responseSecondAppointmentList = await ApiService.get(
        endpointSecondAppointmentList
      );
      const SecAppointmentListData =
        responseSecondAppointmentList.appointment || [];
      console.log(SecAppointmentListData);
      const transformedSecAppointmentData2 = SecAppointmentListData.map(
        (SecAppointment, index) => ({
          id: index + 1,
          contractor_fullname_Sec: SecAppointment.contractor_fullname,
          date_appointment_Sec: SecAppointment.date_appointment,
          appointment_status_Sec: SecAppointment.appointment_status,
          add_appointment_date_Sec: SecAppointment.add_appointment_date,
          second_appointment_status_Sec:
            SecAppointment.second_appointment_status,
          second_appointment_date_Sec: SecAppointment.second_appointment_date,

          client_fullname_Sec: SecAppointment.client_fullname,
          appointment_id_Sec: SecAppointment.appointment_id,
          remark_Sec: SecAppointment.remark,
          address_Sec: SecAppointment.address,
          appointment_type_Sec: SecAppointment.appointment_type,
        })
      );
      setTableSecAppointmentData(transformedSecAppointmentData2);
      console.log(transformedSecAppointmentData2);

      const endpointDocumentIdData = `view/list/document/detail/second/appointment/contractor/${userId}`;
      const responseDocumentIdData = await ApiService.get(
        endpointDocumentIdData
      );

      const documentsData =
        responseDocumentIdData.newAppointmentPaymentOfItemForInvoice || [];
      const uniqueDocumentIds = Array.from(
        new Set(documentsData.map((doc) => doc.documents_id))
      );

      const documentOptions = uniqueDocumentIds.map((documentId, index) => ({
        id: index + 1,
        value: documentId,
        label: documentId, // Set document_id as the label
      }));

      setDocumentOptions(documentOptions);
      console.log(uniqueDocumentIds);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("Table Data:", tableData2);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="p-12 mt-8.6m">
      {/* <h2 className="text-2xl	mb-6">Payment (In progress)</h2>
      <div>
        <ListCardForPaymentStatus />
      </div> */}

      <h2 className="text-2xl	mb-2 semi-bold">Appointment</h2>

      <h2 className="text-xl	mb-6">List Pending First Appointment</h2>
      <div className="rounded-lg border-2 border-black mb-12">
        {/* {tableData.length > 0 ? ( */}
        <Table data={tableData} columns={columns} onRowClick={handleRowClick} />
        {/* ) : (
          <p className="text-red-500 font-bold p-4 text-center">
            No list pending appointment
          </p>
        )} */}
      </div>
      <h2 className="text-xl	mb-6">List Accept First Appointment</h2>

      <div className="rounded-lg border-2 border-black ">
        {/* {tableData2.length > 0 ? ( */}
        <Table
          data={tableData2}
          columns={columns2}
          onRowClick={handleRowClick2}
        />
        {/* ) : (
          <p className="text-red-500 font-bold p-4 text-center">
            No list accept appointment
          </p>
        )} */}
      </div>

      <hr class="w-full h-0.5 mx-auto my-12	 bg-gray-500 border-0 rounded"></hr>

      <h2 className="text-xl	mb-6">List Status Second Appointment</h2>

      <div className="rounded-lg border-2 border-black ">
        {/* {tableSecAppointmentData.length > 0 ? ( */}
        <Table
          data={tableSecAppointmentData}
          columns={columnsSecondAppointment}
          onRowClick={handleRowAppointmentClick}
        />
        {/* ) : (
          <p className="text-red-500 font-bold p-4 text-center">
            No list accept appointment
          </p>
        )} */}
      </div>

      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={
          appointmentRowData && (
            <div className="p-8">
              <h2 className="text-2xl">Appointment Detail</h2>
              <h2 className="text mb-6">First pending appointment detail</h2>

              <div className="mb-2">
                <p className="font-semibold">Name of client:</p>
                {appointmentRowData.client_fullname ? (
                  <p>{appointmentRowData.client_fullname}</p>
                ) : (
                  <p className="font-semibold text-red-500"> No assign </p>
                )}
              </div>
              <div className="mb-2">
                <p className="font-semibold">Address:</p>
                <p>{appointmentRowData.appointmet_address}</p>
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
              <h2 className="text-2xl">Appointment Detail</h2>
              <h2 className="text mb-6">Second pending appointment detail</h2>

              <div className="mb-2">
                <p className="font-semibold">Name of client:</p>
                <p>{appointmentRowData2.client_fullname2}</p>
              </div>
              <div className="mb-2 hidden">
                <p className="font-semibold">Name of client:</p>
                <p>{appointmentRowData2.appointment_id2}</p>
              </div>
              <div className="mb-2">
                <p className="font-semibold">Name of contractor:</p>
                {appointmentRowData2.contractor_fullname2 ? (
                  <p>{appointmentRowData2.contractor_fullname2}</p>
                ) : (
                  <p className="font-semibold text-red-500"> No assign </p>
                )}
              </div>
              <div className="mb-2">
                <p className="font-semibold">Address:</p>
                <p>{appointmentRowData2.address2}</p>
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

              <div className="mb-2">
                <p className="font-semibold"> Contractor action:</p>
                {appointmentRowData2.status_second_appointment2 === "Done" ? (
                  <p className="font-semibold text-green-500">Done</p>
                ) : (
                  <button
                    onClick={handleDoneClick}
                    className="bg-green-500 text-white p-2 rounded-md"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          )
        }
      />
      <CustomModal
        isOpen={isModalSecondAppointmentOpen}
        closeModal={closeModal}
        content={
          secondAppointmentRowData && (
            <div className="p-8">
              <h2 className="text-2xl mb-6">Second Appointment Detail</h2>

              <div className="mb-2">
                <p className="font-semibold">Name of client:</p>
                <p>{secondAppointmentRowData.client_fullname_Sec}</p>
              </div>
              <div className="mb-2 hidden">
                <p className="font-semibold">Name of client:</p>
                <p>{secondAppointmentRowData.appointment_id_Sec}</p>
              </div>
              <div className="mb-2">
                <p className="font-semibold">Name of contractor:</p>
                {secondAppointmentRowData.contractor_fullname_Sec ? (
                  <p>{secondAppointmentRowData.contractor_fullname_Sec}</p>
                ) : (
                  <p className="font-semibold text-red-500"> No assign </p>
                )}
              </div>
              <div className="mb-2">
                <p className="font-semibold">Address:</p>
                <p>{secondAppointmentRowData.address_Sec}</p>
              </div>
              <hr className="mb-6"></hr>

              <div className="mb-4">
                <p className="font-semibold">Client Status:</p>
                {secondAppointmentRowData.second_appointment_status_Sec ? (
                  <div>
                    <p className="font-semibold text-blue-600">
                      {secondAppointmentRowData.second_appointment_status_Sec}
                    </p>{" "}
                    <div className="mb-2">
                      <p className="font-semibold mt-8">Date Appointment:</p>
                      <p>
                        {secondAppointmentRowData.second_appointment_date_Sec}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <p className="font-semibold">Date Appointment:</p>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="w-full p-2 border rounded focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </div>
                    <div className="mb-12">
                      <p className="font-semibold">Please Select Quotation:</p>
                      <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full p-2 border rounded focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      >
                        <option value="">Please Select Quotation</option>
                        {documentOptions.map((document) => (
                          <option key={document.id} value={document.value}>
                            {document.label}
                          </option>
                        ))}
                      </select>
                    </div>{" "}
                    <p className="font-semibold text-red-500"> Not send </p>
                  </div>
                )}
              </div>
              {(secondAppointmentRowData.second_appointment_status_Sec ===
                "Pending" ||
                secondAppointmentRowData.second_appointment_status_Sec ===
                  null) && (
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Submit
                </button>
              )}
              {/* {secondAppointmentRowData.second_appointment_status_Sec ===
                "Accept" && (
                <button
                  onClick={handleSubmitInvoice}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Send Invoice
                </button>
              )} */}
            </div>
          )
        }
      />
      <ToastContainer />
    </div>
  );
};

export default ContractorDashboard;
