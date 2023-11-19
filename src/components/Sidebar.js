import React from 'react';
import myLogoBlack from '../img/logoBlack.png';
import myLogoWhite from '../img/logoWhite.png';
import dashboard from '../img/icon/dashboard-icon.png';
import profile from '../img/icon/profile-icon.png';
import shopping from '../img/icon/shopping-icon.png';
import appointment from '../img/icon/appointment-icon.png';
import logout from '../img/icon/logout-icon.png';

const Sidebar= ({ setActiveContent }) => {
  return (
    <div className="flex">
    <main className="flex-1 p-4">
   
        
{/* <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button> */}

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
         <li>
            <a
              href="#"
              onClick={() => setActiveContent('appointment')}
              className="flex items-center p-2 text-slate-200 rounded-lg group"
            >
            <div className="w-6">   
              <img className="h-6 mr-3 sm:h-5" src={appointment} alt="appointment" /></div>
              <span className="ml-8">Appointment</span>
            </a>
         </li>    
      </ul>
         <a href="#" className="flex items-center p-2 text-slate-200 rounded-lg group">
            <img className="h-6 mr-3 sm:h-5" src={logout} alt="logout" /> 
            <span className="ml-8">Log out</span>
         </a>
        </div>
    </aside>
    </main>
  </div>
   
  );
}

export default Sidebar;