import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import AdminDashboard from '../Admin/Admin_Dashboard';
import AdminProfile from '../Admin/Admin_Profile';
import AdminShop from '../Admin/Admin_Shop';
import QuotationShop from './Admin_QuotationAppointment';
import InvoiceShop from '../Admin/Admin_InvoiceShop';
import ManageAppointment from '../Admin/Admin_Appointment';
import QuotationAppointment from '../Admin/Admin_QuotationAppointment';
import InvoiceAppointment from '../Admin/Admin_InvoiceAppointment';

import ManageClient from '../Admin/Admin_ManageClient';
import ManageContractor from '../Admin/Admin_ManageContractor';
import { useParams } from "react-router-dom";

const Admin_MainContainer = () => {
  const [activeContent, setActiveContent] = useState('adminDashboard');
  const { userId } = useParams();
  console.log("User ID:", userId);


  const handleSetActiveContent = (content) => {
    setActiveContent(content);
  };


// Example usage
// const endpoint = 'view/users-listforadmin';

// async function fetchData() {
//   try {
//     const responseData = await ApiService.get(endpoint);
//     // Handle the response data as needed
//     console.log("Data fetched successfully:", responseData);
//   } catch (error) {
//     // Handle errors
//     console.error(error.message);
//   }
// }

// fetchData();

  return (
    <div className="h-screen bg-PlatinumColor">
      <div className="bg-PlatinumColor bg-contain m-0 p-0">
        <Sidebar 
        setActiveContent={handleSetActiveContent} />
        <div className="relative md:ml-64 flex flex-col">
          <Navbar />
          {activeContent === 'adminDashboard' && <AdminDashboard />}
          {activeContent === 'adminProfile' && <AdminProfile />}
          {activeContent === 'adminShop' && <AdminShop />}
          {activeContent === 'quotationShop' && <QuotationShop />}
          {activeContent === 'invoiceShop' && <InvoiceShop />}
          {/* {activeContent === 'adminAppointment' && <ManageAppointment />} */}
          {activeContent === 'quotationAppointment' && <QuotationAppointment />}
          {activeContent === 'invoiceAppointment' && <InvoiceAppointment />}

          {activeContent === 'client' && <ManageClient />}
          {activeContent === 'contractor' && <ManageContractor />}
        </div>
      </div>
    </div>
  );
};

export default Admin_MainContainer;
