import React, { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import ContractorDashboard from "../Contractor/Contractor_Dashboard";
import ContractorProfile from "../Contractor/Contractor_Profile";
import ContractorQuotation from "../Contractor/Contractor_Quotation";

import { useParams } from "react-router-dom";

const Contractor_MainContainer = () => {
  const [activeContent, setActiveContent] = useState("contractorDashboard");
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
          {activeContent === "contractorDashboard" && <ContractorDashboard />}
          {activeContent === "contractorProfile" && <ContractorProfile />}
          {activeContent === "contractorQuotation" && <ContractorQuotation />}

        </div>
      </div>
    </div>
  );
};

export default Contractor_MainContainer;
