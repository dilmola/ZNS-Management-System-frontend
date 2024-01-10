import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../API/ApiService.js";
import { useParams } from "react-router-dom";

const Navbar = () => {
    const { userId } = useParams();
    const [username, setUsername] = useState(null);
  
    useEffect(() => {
      const fetchUserType = async () => {
        try {
          const userInfo = await getUserInfo(userId);
          const userTypeId = userInfo.user.username;
          console.log("User Type ID:", userTypeId);
  
          setUsername(userTypeId);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserType();
    }, [userId]);
  
    return (
      <div className="flex">
        <nav className="fixed top-0 z-50 md:w-[83.2%] lg:w-[88%] border-black border-b-2 bg-LightSilverColor">
          <div className="px-12 py-4">
            <div className="flex items-center justify-between mt-14">
              <div className="flex items-center justify-start">
                <span className="ml-0.5m self-center font-poppins text-4xl text-CharlestonGreenText font-black">
                  Dashboard
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ml-3 bg-CharlestonGreenColor rounded-lg py-2 px-5">
                  <h2 className="text-l text-PlatinumColorText font-black m-2">
                    Hi! {username}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  };
  
  export default Navbar;
