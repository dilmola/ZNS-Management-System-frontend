import React from 'react';
import myLogoBlack from '../img/logoBlack.png';
import myLogoWhite from '../img/logoWhite.png';
import dashboard from '../img/icon/dashboard-icon.png';
import profile from '../img/icon/profile-icon.png';
import shopping from '../img/icon/shopping-icon.png';
import appointment from '../img/icon/appointment-icon.png';
import logout from '../img/icon/logout-icon.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const ContractorSidebar= ({ setActiveContent }) => {
   const navigate = useNavigate(); // useNavigate hook

  const handleLogout = () => {
    // Perform logout actions here, e.g., clear session or authentication token

    // Redirect to the login page using navigate
    navigate('/login');
  };

  return (
    <div className="flex">
    <main className="flex-1 p-4">

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full  flex flex-col justify-between px-3 py-4 overflow-y-auto bg-gray-50 bg-sidebar ">
      <a href="https://flowbite.com/" className="flex  items-end pl-2.5 p-5">
            <img className="h-6 mr-3 sm:h-7" src={myLogoWhite} alt="Your Image" /> 
            <h2 className="text-sm text-white font-semibold">Client </h2>
      </a>
      <ul className="space-y-2 font-medium mb-40">
         <li>
            <a
              href="#"
              onClick={() => setActiveContent('body')}
              className="flex items-center p-2 text-slate-200 rounded-lg group"
            >  
            <div className="w-6">
              <img className="h-6 mr-3 sm:h-5" src={dashboard} alt="dashboard" /></div>
              <span className="ml-8">Dashboard</span>
            </a>
         </li>
         <li>
            <a
              href="#"
              onClick={() => setActiveContent('quotation')}
              className="flex items-center p-2 text-slate-200 rounded-lg group"
            >  
            <div className="w-6">
              <img className="h-6 mr-3 sm:h-5" src={dashboard} alt="quotation" /></div>
              <span className="ml-8">Quotation form</span>
            </a>
         </li>
         <li>
            <a
              href="#"
              onClick={() => setActiveContent('profile')}
              className="flex items-center p-2 text-slate-200	rounded-lg group"
            >  
            <div className="w-6">
              <img className="h-6 mr-3 sm:h-5" src={profile} alt="profile" /></div>
              <span className="ml-8">Profile</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-slate-200 rounded-lg group">
            <div className="w-6">   
               <img className="h-6 mr-3 sm:h-5" src={shopping} alt="shop" /> </div>
               <span className="ml-8">Shop</span>
            </a>
         </li>
        
      </ul>
        <a href="#" onClick={handleLogout} className="flex items-center p-2 text-slate-200 rounded-lg group">
              <img className="h-6 mr-3 sm:h-5" src={logout} alt="logout" />
              <span className="ml-8">Log out</span>
            </a>
        </div>
    </aside>
    </main>
  </div>
   
  );
}

export default ContractorSidebar;