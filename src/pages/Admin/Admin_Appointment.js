import React, { useState, useEffect, useRef } from "react";
import { ListCardForAppointmentClientStatus } from "../../components/common/Cards";
import Table from "../../components/common/Table/Table_Component";
import CustomModal from "../../components/common/Modal";
import ApiService from "../../API/ApiService";
import { useReactToPrint } from "react-to-print";
import PrintAppointmentInvoice from "../../components/common/PrintAppointmentInvoice";

const columns = [
  { header: "No", accessor: "id" },
  { header: "Name of contractor", accessor: "contractor_fullname" },
  { header: "Name of client", accessor: "client_fullname" },

  { header: "Date Appointment", accessor: "date_appointment" },

  { header: "Status", accessor: "appointment_status" },
];

const AdminAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentRowData, setSelectedAppointmentRowData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [printQuotationDetails, setPrintQuotationDetails] = useState([]);

  const handleRowClick = async (row) => {
    setIsModalOpen(true);
    setSelectedAppointmentRowData(row);

    try {
      console.log("Clicked row:", row); // Log the row object to check its structure

      const docIdResponse = await ApiService.get(
        `get/data/document/detail/second/appointment/client/${
          row && row.document_id_sec
        }`,
        {}
      );
      const docIdData = docIdResponse.newAppointmentPaymentOfItemForDoc || [];
      console.log("Document details:", docIdResponse);
      setPrintQuotationDetails(docIdData);

      // Retrieve sec_appointment_id2 from the clicked row
      const invoiceAppointmentId = row && row.sec_appointment_id2;
        console.log(invoiceAppointmentId);


      await submitInvoiceToClient(row, invoiceAppointmentId);

    } catch (error) {
      console.error("Error fetching document details:", error);
    }
  };

  const submitInvoiceToClient = async (row, invoiceAppointmentId) => {
    try {
 
        const response = await ApiService.update(
          `update/client/required/invoice/second/appointment/client/${invoiceAppointmentId}`
        );
        console.log("Invoice submission response:", response);
     
        console.error("invoiceAppointmentId is undefined");
      }
     catch (error) {
      console.error("Error submitting invoice:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointmentRowData(null);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const componentRef = useRef();

  const fetchData = async () => {
    try {
      const response = await ApiService.get(
        `view/list/accept/second/appointment/clients-listforadmin/`,
        {}
      );
      const appointmentsData = response.appointment || [];

      const transformedData = appointmentsData.map((appointment, index) => ({
        id: index + 1,
        contractor_fullname: appointment.contractor_fullname,
        client_fullname: appointment.client_fullname,
        date_appointment: appointment.second_appointment_date,
        appointment_status: appointment.appointment_status,
        appointment_address: appointment.appointment_address,
        document_id_sec: appointment.document_id,
        add_appointment_date: appointment.add_appointment_date,
        remark: appointment.remark,
        address: appointment.address,
        appointment_type: appointment.appointment_type,
        sec_appointment_id2: appointment.sec_appointment_id,
      }));
      setTableData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("Table Data:", tableData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl	mb-6">Manage appointment</h2>
      <div>
        <ListCardForAppointmentClientStatus />
      </div>

      {/* <h2 className="text-2xl	mb-6">Appointment</h2> */}

      <h2 className="text-xl mb-6">Invoice submit</h2>
      <div className="rounded-lg border-2 border-black ">
        <Table data={tableData} columns={columns} onRowClick={handleRowClick} />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={
          appointmentRowData && (
            <div className="p-4">
              <h2 className="text-2xl mb-6">Invoice Details</h2>
              <div className="mb-2">
                <p className="font-semibold">Name contractor:</p>
                <p>{appointmentRowData.contractor_fullname}</p>
              </div>

              <div className="mb-2">
                <p className="font-semibold">Name client:</p>
                <p>{appointmentRowData.client_fullname}</p>
              </div>

              <div className="mb-2 hidden">
                <p className="font-semibold">Name client:</p>
                <p>{appointmentRowData.sec_appointment_id2}</p>
              </div>
              <div className="mb-8">
                <p className="font-semibold">Date appointment:</p>
                <p>{appointmentRowData.date_appointment}</p>
              </div>

              <hr className="mb-4"></hr>
              <div className="flex justify-between">
                <button
                  onClick={handlePrint}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  View Invoice
                </button>

                <button
                  onClick={submitInvoiceToClient}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Send
                </button>
              </div>

              <div className="hidden">
                <PrintAppointmentInvoice
                  fields={printQuotationDetails}
                  ref={componentRef}
                  appointmentsData={appointmentRowData}
                />
              </div>
            </div>
          )
        }
      />
    </div>
  );
};

export default AdminAppointment;
