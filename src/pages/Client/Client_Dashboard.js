import React, { useState, useEffect, useRef } from "react";
import Table from "../../components/common/Table/Table_Component";
import PrintQuotationAppointment from "../../components/common/PrintQuotationAppointment";
import PrintAppointmentInvoice from "../../components/common/PrintAppointmentInvoice";
import showToast from "../../components/common/Toast.js";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ListCardForPaymentStatus } from "../../components/common/Cards";

import CustomModal from "../../components/common/Modal";
import { useParams } from "react-router-dom";
import ApiService from "../../API/ApiService.js";

const columns = [
  { header: "No", accessor: "id" },
  { header: "Name of contractor", accessor: "contractor_fullname" },
  { header: "Date Appointment", accessor: "date_appointment" },
  { header: "Status", accessor: "appointment_status" },
];

const secondAppointmentcolumns = [
  { header: "No", accessor: "id" },
  { header: "Name of contractor", accessor: "contractor_fullname_sec" },
  { header: "Date Appointment", accessor: "second_appointment_date_Sec" },
  { header: "Status", accessor: "appointment_status_sec" },
];

const ClientDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecAppointmentModalOpen, setIsSecAppointmentModalOpen] =
    useState(false);
  const componentRef = useRef();
  const [formFields, setFormFields] = useState([]);
  const [secAppointmentStatus, setSecAppointmentStatus] = useState("");

  const [appointmentRowData, selectedAppointmentRowData] = useState(null);
  const [secAppointmentRowData, selectedSecAppointmentRowData] = useState(null);
  const [printQuotationDetails, setPrintQuotationDetails] = useState([]);
  const [printQuotationDetails2, setPrintQuotationDetails2] = useState([]);

  const handleRowClick = (row) => {
    setIsModalOpen(true);
    selectedAppointmentRowData(row);
  };

  const handleSecondAppointmentRowClick = async (row) => {
    setIsSecAppointmentModalOpen(true);
    selectedSecAppointmentRowData(row);

    try {
      const docIdResponse = await ApiService.get(
        `get/data/document/detail/second/appointment/client/${
          row && row.document_id_sec
        }`,
        {}
      );
      const docIdData = docIdResponse.newAppointmentPaymentOfItemForDoc || [];
      //console.log(docIdResponse);
      setPrintQuotationDetails(docIdData);
      setPrintQuotationDetails2(docIdData);
    } catch (error) {
      console.error("Error fetching document details:", error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSecAppointmentModalOpen(false);
    selectedSecAppointmentRowData(null);
    selectedAppointmentRowData(null);
  };

  const handleAction = async (actionType) => {
    try {
      let endpoint;

      // Determine the API endpoint based on the action type
      if (actionType === "Accept" || actionType === "Reject") {
        if (secAppointmentRowData && secAppointmentRowData.appointment_id_sec) {
          endpoint = `update/status/${actionType}/second/appointment/client/${secAppointmentRowData.appointment_id_sec}`;
        } else {
          console.error("Error: appointment_id_sec is not defined");
          return;
        }
      } else {
        console.error("Error: Invalid actionType");
        return;
      }

      const response = await ApiService.update(endpoint, {
        // Add any necessary data to the request body
        // For example: appointmentId, additional information
      });
      showToast("👍 Successful Submit!");

      //console.log(response);
    } catch (error) {
      console.error(
        `Error ${actionType}ing appointment:`,
        error.message || error
      );
      // Handle error as needed
    }
  };

  const { userId } = useParams();
  const [tableData, setTableData] = useState([]);
  const [secondAppointmentTableData, setSecondAppointmentTableData] = useState(
    []
  );

  const fetchData = async () => {
    try {
      const response = await ApiService.get(`viewappointment/${userId}`, {});
      const appointmentsData = response.appointment || [];

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

      const secAppointmentResponse = await ApiService.get(
        `view/list/second/appointment/client/${userId}`,
        {}
      );
      const secAppointmentsData = secAppointmentResponse.appointment || [];
      const transformedSecAppointmentData = secAppointmentsData.map(
        (secAppointment, index) => ({
          id: index + 1,
          contractor_fullname_sec: secAppointment.contractor_fullname,
          document_id_sec: secAppointment.document_id,
          appointment_id_sec: secAppointment.sec_appointment_id,

          date_appointment_sec: secAppointment.date_appointment,
          appointment_status_sec: secAppointment.appointment_status,
          add_appointment_date_sec: secAppointment.add_appointment_date,
          second_appointment_status_Sec:
            secAppointment.second_appointment_status,
          second_appointment_date_Sec: secAppointment.second_appointment_date,
          client_fullname_sec: secAppointment.client_fullname,
          remark_sec: secAppointment.remark,
          appointment_type_sec: secAppointment.appointment_type,
          address_sec: secAppointment.address,
          address_user_sec: secAppointment.address_user,
          client_required_invoice: secAppointment.client_required_invoice,
        })
      );
      setSecondAppointmentTableData(transformedSecAppointmentData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //console.log("Table Data:", tableData);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint2 = useReactToPrint({
    content: () => componentRef2.current,
  });
  const componentRef2 = useRef();

  return (
    <div className="p-12 mt-8.6m">
      {/* <h2 className="text-2xl	mb-6">Payment (in progress)</h2>
      <div>
        <ListCardForPaymentStatus />
      </div> */}
      <h2 className="text-2xl	mb-6">First Appointment </h2>
      <div className="rounded-lg border-2 border-black ">
        <Table data={tableData} columns={columns} onRowClick={handleRowClick} />
      </div>
      <h2 className="text-2xl	mt-12 mb-6">Second Appointment </h2>
      <div className="rounded-lg border-2 border-black ">
        <Table
          data={secondAppointmentTableData}
          columns={secondAppointmentcolumns}
          onRowClick={handleSecondAppointmentRowClick}
        />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={
          appointmentRowData && (
            <div className="p-8">
              <h2 className="text-2xl mb-6">First Appointment Detail</h2>

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

              <div className="mb-2">
                <p className="font-semibold">Address:</p>
                <p>{appointmentRowData.address}</p>
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
      <CustomModal
        isOpen={isSecAppointmentModalOpen}
        closeModal={closeModal}
        content={
          secAppointmentRowData && (
            <div className="p-8">
              <h2 className="text-2xl mb-6">Second Appointment Detail</h2>
              <div className="hidden">
                {secAppointmentRowData.document_id_sec}
              </div>
              <div className="mb-2">
                <p className="font-semibold">Name of contractor:</p>
                {secAppointmentRowData.contractor_fullname_sec ? (
                  <p>{secAppointmentRowData.contractor_fullname_sec}</p>
                ) : (
                  <p className="font-semibold text-red-500"> No assign </p>
                )}
              </div>
              <div className="mb-2">
                <p className="font-semibold">Date Appointment:</p>
                <p>{secAppointmentRowData.second_appointment_date_Sec}</p>
              </div>

              <div className="mb-2 hidden">
                <p className="font-semibold">Date Apyrdyyyypointment:</p>
                <p>{secAppointmentRowData.appointment_id_sec}</p>
              </div>
              <div className="mb-2">
                <p className="font-semibold">Address:</p>
                <p>{secAppointmentRowData.address_sec}</p>
              </div>
              <hr className="mb-6"></hr>

              {(secAppointmentRowData.second_appointment_status_Sec ===
                "Pending" ||
                secAppointmentRowData.second_appointment_status_Sec ===
                  null) && (
                <div>
                  <div>
                    <button
                      onClick={handlePrint}
                      className="bg-green-500 text-white p-2 rounded-md"
                    >
                      View Quotation
                    </button>
                  </div>
                  <button
                    onClick={() => handleAction("Reject")}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-6 mt-8 mr-2"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction("Accept")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 mt-8"
                  >
                    Accept
                  </button>
                </div>
              )}
              {secAppointmentRowData.second_appointment_status_Sec ===
                "Accept" &&
                secAppointmentRowData.client_required_invoice === 1 && (
                  <button
                    onClick={handlePrint2}
                    className="bg-green-500 text-white p-2 rounded-md"
                  >
                    Download Invoice
                  </button>
                )}

              <div className="hidden">
                <PrintQuotationAppointment
                  appointmentRowData={secAppointmentRowData}
                  fields={printQuotationDetails}
                  ref={componentRef}
                />
              </div>
              <div className="hidden">
                <PrintAppointmentInvoice
                  fields={printQuotationDetails2}
                  ref={componentRef2}
                  appointmentsData={secAppointmentRowData}
                />
              </div>
            </div>
          )
        }
      />{" "}
      <ToastContainer />
    </div>
  );
};

export default ClientDashboard;
