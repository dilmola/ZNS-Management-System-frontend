import React from 'react';
import myLogoBlack from '../img/logoBlack.png';
import myLogoWhite from '../img/logoWhite.png';
import shoppingCart from '../img/icon/shoppingCart_icon.svg';
import NotificationIcon from '../img/icon/notification_icon.svg';
import Noti from '../components/NotificationBell';

const Navbar = () => {
  return (
    // <div className="flex">
    //     <nav className="fixed top-0 w-full border-b  bg-navbar dark:border-gray-700 z-0	">
    //         <div className="px-3 py-3 lg:px-5 lg:pl-3">            
                                        
    //         </div>
    //     </nav>                
    // </div>

    <div className='flex'>
        <nav className="fixed top-0 z-50 md:w-[83.2%] lg:w-[88%] border-b border-black border-b-2 bg-LightSilverColor">
            <div className="px-12 py-4">
                <div className="flex items-center justify-between mt-14">
                    <div className="flex items-center justify-start">                  
                        <span className="ml-0.5m self-center font-poppins text-4xl text-CharlestonGreenText font-black">Dashboard</span>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3 bg-PlatinumColor rounded-lg py-4 px-5">
                            <button type="button" className="flex px-4">
                            <img className="w-6 h-6 " src={shoppingCart} alt="Shopping Cart Icon"/>
                            </button>
                            <button type="button" className="flex px-4 ">                                 
                                <Noti />  
                            </button>
                        </div> 
                        <div className="flex items-center ml-3 bg-CharlestonGreenColor rounded-lg py-2 px-5">
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 ">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                            </button>
                            <h2 className="text-l text-PlatinumColorText font-black m-2">Hi! Zahir</h2>
                        </div>                                        
                    </div>
                </div>
            </div>
            
        </nav>

    </div>

//     <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
//     <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
//       {/* Brand */}
//       <a
//         className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
//         href="#pablo"
//         onClick={(e) => e.preventDefault()}
//       >
//         Dashboard
//       </a>
//       {/* Form */}
//       <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
//         <div className="relative flex w-full flex-wrap items-stretch">
//           <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
//             <i className="fas fa-search"></i>
//           </span>
//           <input
//             type="text"
//             placeholder="Search here..."
//             className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
//           />
//         </div>
//       </form>
//       {/* User */}
//       <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
//       </ul>
//     </div>
//   </nav>

   
  );
}

export default Navbar;