import React from 'react';
import myLogoBlack from '../img/logoBlack.png';
import myLogoWhite from '../img/logoWhite.png';
import shoppingCart from '../img/icon/shoppingCart_icon.svg';
import NotificationIcon from '../img/icon/notification_icon.svg';
import Noti from '../components/NotificationBell';

const Navbar = ({ userData }) => {
    console.log('Navbar userData:', userData);

    const nestedUsername = userData?.user?.username || 'Guest';

  return (
    <div className='flex'>
        <nav className="fixed top-0 z-50 md:w-[83.2%] lg:w-[88%] border-b border-black border-b-2 bg-LightSilverColor">
            <div className="px-12 py-4">
                <div className="flex items-center justify-between mt-14">
                    <div className="flex items-center justify-start">                  
                        <span className="ml-0.5m self-center font-poppins text-4xl text-CharlestonGreenText font-black">Dashboard</span>
                    </div>
                    <div className="flex items-center">
                        {/* <div className="flex items-center ml-3 bg-PlatinumColor rounded-lg py-4 px-5">
                            <button type="button" className="flex px-4">
                            <img className="w-6 h-6 " src={shoppingCart} alt="Shopping Cart Icon"/>
                            </button>
                            <button type="button" className="flex px-4 ">                                 
                                <Noti />  
                            </button>
                        </div>  */}
                        <div className="flex items-center ml-3 bg-CharlestonGreenColor rounded-lg py-2 px-5">
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 ">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                            </button>
                            <h2 className="text-l text-PlatinumColorText font-black m-2">{nestedUsername }</h2>
                        </div>                                        
                    </div>
                </div>
            </div>            
        </nav>
    </div>   
  );
}

export default Navbar;