import React, { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import ClientDashboard from "../Client/Client_Dashboard";
import ClientProfile from "../Client/Client_Profile";
import ClientShop from "../Client/Client_Shop";
import ClientAppointment from "../Client/Client_Appointment";
import ClientCheckOut from "../Client/Client_Checkout";

import { useParams } from "react-router-dom";

const Cliet_MainContainer = () => {
  const [activeContent, setActiveContent] = useState("clientDashboard");
  const { userId } = useParams();
  console.log("User ID:", userId);

  const handleSetActiveContent = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="h-screen bg-PlatinumColor">
      <div className="bg-PlatinumColor bg-contain m-0 p-0">
        <Sidebar setActiveContent={handleSetActiveContent} />
        <div className="relative md:ml-64 flex flex-col">
          <Navbar />
          {activeContent === "clientDashboard" && <ClientDashboard />}
          {activeContent === "clientProfile" && <ClientProfile />}
          {activeContent === "clientShop" && <ClientShop />}
          {activeContent === "clientCheckOut" && <ClientCheckOut />}
          {activeContent === "clientAppointment" && <ClientAppointment />}
        </div>
      </div>
    </div>
  );
};

export default Cliet_MainContainer;
