import React, { useEffect, useState } from "react";
import myLogoWhite from "../../img/logoWhite.png";
import dashboard from "../../img/icon/dashboard-icon.png";
import profile from "../../img/icon/profile-icon.png";
import shopping from "../../img/icon/shopping-icon.png";
import order from "../../img/icon/order-icon.png";
import appointment from "../../img/icon/appointment-icon.png";
// import payment from "../../img/icon/payment-icon.png";
import logout from "../../img/icon/logout-icon.png";
import contractor from "../../img/icon/user-icon.png";
import client from "../../img/icon/user-icon.png";
import { getUserInfo } from "../../API/ApiService.js";
import { useParams } from "react-router-dom";

const Sidebar = ({ setActiveContent, id }) => {
  const [showAdditionalItemsForShop, setShowAdditionalItemsForShop] =
    useState(false);
  const [
    showAdditionalItemsForAppointment,
    setShowAdditionalItemsForAppointment,
  ] = useState(false);

  const [userType, setUserType] = useState(null);
  const { userId } = useParams();
  const [users_type_id, setUsersTypeId] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const userInfo = await getUserInfo(userId);

        // Assuming users_type_id is present in userInfo
        const users_type_id = userInfo.user.users_type_id;

        console.log("User Type ID:", users_type_id);

        if (users_type_id === 1) {
          setUserType("Admin");
        } else if (users_type_id === 2) {
          setUserType("Contractor");
        } else if (users_type_id === 3) {
          setUserType("Client");
        } else {
          setUserType("Unknown Type");
        }

        setUsersTypeId(users_type_id);
      } catch (error) {
        console.error(error);
        setUserType("Error");
      }
    };

    fetchUserType();
  }, [userId]);

  const handleMenuClick = (menuType) => {
    if (users_type_id === 1) {
      console.log("User Type 1 - Setting ActiveContent to admin");
      if (menuType === "dashboard") {
        setActiveContent("adminDashboard");
      } else if (menuType === "profile") {
        setActiveContent("adminProfile");
      } else if (menuType === "shop") {
        setActiveContent("adminShop");
      } else if (menuType === "appointment") {
        setActiveContent("adminAppointment");
      }
    } else if (users_type_id === 2) {
      console.log("User Type 2 - Setting ActiveContent to contractor");
      if (menuType === "dashboard") {
        setActiveContent("contractorDashboard");
      } else if (menuType === "profile") {
        setActiveContent("contractorProfile");
      } else if (menuType === "appointment") {
        setActiveContent("contractorQuotation");
      }
    } else if (users_type_id === 3) {
      console.log("User Type 3 - Setting ActiveContent to client");
      if (menuType === "dashboard") {
        setActiveContent("clientDashboard");
      } else if (menuType === "profile") {
        setActiveContent("clientProfile");
      } else if (menuType === "shop") {
        setActiveContent("clientShop");
      } else if (menuType === "appointment") {
        setActiveContent("clientAppointment");
      }
    } else {
      console.log("Unknown User Type - No ActiveContent set");
    }
  };

  return (
    <div className="flex">
      <main className="flex-1 p-2">
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto bg-sidebar ">
            <div>
              <a href="" className="flex  items-end pl-2.5 p-5 mb-20">
                <img
                  className="h-6 mr-3 sm:h-7"
                  src={myLogoWhite}
                  alt="Your Image"
                />
                <h2 className="text-sm text-white font-semibold">{userType}</h2>
              </a>
              <h2 className="text-lg text-white font-semibold mb-2">Menu</h2>
              <ul className="space-y-2 font-medium ">
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick("dashboard")}
                    className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                  >
                    <div className="w-auto">
                      <img
                        className="h-6 mr-3 sm:h-5"
                        src={dashboard}
                        alt="dashboard"
                      />
                    </div>
                    <span className="ml-8">Dashboard</span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick("profile")}
                    className="flex items-center p-3 text-slate-200	rounded-lg group hover:bg-gray-700"
                  >
                    <div className="w-auto">
                      <img
                        className="h-6 mr-3 sm:h-5"
                        src={profile}
                        alt="profile"
                      />
                    </div>
                    <span className="ml-8">Profile</span>
                  </a>
                </li>
                {users_type_id !== 2 && (
                  <>
                    <ul>
                      <li>
                        <a
                          href="#"
                          className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                          onClick={() => {
                            if (users_type_id === 1 || users_type_id === 3) {
                              setShowAdditionalItemsForShop(
                                !showAdditionalItemsForShop
                              );
                            } else {
                              handleMenuClick("shop");
                            }
                          }}
                        >
                          <div className="w-auto">
                            <img
                              className="h-6 mr-3 sm:h-5"
                              src={shopping}
                              alt="shop"
                            />
                          </div>
                          <span className="ml-8">Shop</span>
                        </a>
                      </li>
                      {showAdditionalItemsForShop && (
                        <>
                          {users_type_id === 1 && (
                            <>
                              <li className="transition-opacity duration-1000 ease-in">
                                <a
                                  href="#"
                                  className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                                  onClick={() => handleMenuClick("shop")}
                                >
                                  <div className="w-auto">
                                    <img
                                      className="pl-2 h-6 mr-3 sm:h-5"
                                      src={order}
                                      alt="order"
                                    />
                                  </div>
                                  <span className="ml-8">Manage Shop</span>
                                </a>
                              </li>                              
                              <li className="transition-opacity duration-300 ease-in">
                                <a
                                  href="#"
                                  onClick={() =>
                                    setActiveContent("invoiceShop")
                                  }
                                  className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                                >
                                  <div className="w-auto">
                                    <img
                                      className="pl-2 h-6 mr-3 sm:h-5"
                                      src={order}
                                      alt="invoice"
                                    />
                                  </div>
                                  <span className="ml-8">Invoice</span>
                                </a>
                              </li>
                            </>
                          )}
                          {users_type_id === 3 && (
                            <>
                              <li className="transition-opacity duration-1000 ease-in">
                                <a
                                  href="#"
                                  className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                                  onClick={() => handleMenuClick("shop")}
                                >
                                  <div className="w-auto">
                                    <img
                                      className="pl-2 h-6 mr-3 sm:h-5"
                                      src={order}
                                      alt="order"
                                    />
                                  </div>
                                  <span className="ml-8">List Item</span>
                                </a>
                              </li>
                              <li className="transition-opacity duration-1000 ease-in">
                                <a
                                  href="#"
                                  onClick={() =>
                                    setActiveContent("clientCheckOut")
                                  }
                                  className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                                >
                                  <div className="w-auto">
                                    <img
                                      className="pl-2 h-6 mr-3 sm:h-5"
                                      src={order}
                                      alt="quotation"
                                    />
                                  </div>
                                  <span className="ml-8">Checkout</span>
                                </a>
                              </li>
                            </>
                          )}
                        </>
                      )}
                    </ul>
                  </>
                )}

                <ul>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                      onClick={() => {
                        if (users_type_id === 1) {
                          setShowAdditionalItemsForAppointment(
                            !showAdditionalItemsForAppointment
                          );
                        } else {
                          handleMenuClick("appointment");
                        }
                      }}
                    >
                      <div className="w-auto">
                        <img
                          className="h-6 mr-3 sm:h-5"
                          src={appointment}
                          alt="appointment"
                        />
                      </div>
                      <span className="ml-8">Appointment</span>
                    </a>
                  </li>
                  {showAdditionalItemsForAppointment && (
                    <>
                      <li className="transition-opacity duration-1000 ease-in">
                        <a
                          href="#"
                          className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                          onClick={() => handleMenuClick("appointment")}
                        >
                          <div className="w-auto">
                            <img
                              className="pl-2 h-6 mr-3 sm:h-5"
                              src={order}
                              alt="order"
                            />
                          </div>
                          <span className="ml-8">Manage Appointment</span>
                        </a>
                      </li>
                      <li className="transition-opacity duration-1000 ease-in">
                        <a
                          href="#"
                          onClick={() =>
                            setActiveContent("quotationAppointment")
                          }
                          className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                        >
                          <div className="w-auto">
                            <img
                              className="pl-2 h-6 mr-3 sm:h-5"
                              src={order}
                              alt="quotation"
                            />
                          </div>
                          <span className="ml-8">Quotation</span>
                        </a>
                      </li>
                      <li className="transition-opacity duration-300 ease-in">
                        <a
                          href="#"
                          onClick={() => setActiveContent("invoiceAppointment")}
                          className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                        >
                          <div className="w-auto">
                            <img
                              className="pl-2 h-6 mr-3 sm:h-5"
                              src={order}
                              alt="invoice"
                            />
                          </div>
                          <span className="ml-8">Invoice</span>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
                {/* <li>
                  <a
                    href="#"
                    onClick={() => setActiveContent("appointment")}
                    className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                  >
                    <div className="w-auto">
                      <img
                        className="h-6 mr-3 sm:h-5"
                        src={payment}
                        alt="payment"
                      />
                    </div>
                    <span className="ml-8">Payment</span>
                  </a>
                </li> */}
              </ul>
            </div>
            {users_type_id === 1 && (
              <div>
                <div>
                  <h2 className="text-lg text-white font-semibold mt-4 mb-2">
                    Manage
                  </h2>
                  <ul className="space-y-2 font-medium ">
                    <li>
                      <a
                        href="#"
                        onClick={() => setActiveContent("client")}
                        className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                      >
                        <div className="w-auto">
                          <img
                            className="h-6 mr-3 sm:h-5"
                            src={client}
                            alt="client"
                          />
                        </div>
                        <span className="ml-8">Client</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() => setActiveContent("contractor")}
                        className="flex items-center p-3 text-slate-200 rounded-lg group hover:bg-gray-700"
                      >
                        <div className="w-auto">
                          <img
                            className="h-6 mr-3 sm:h-5"
                            src={contractor}
                            alt="contractor"
                          />
                        </div>
                        <span className="ml-8">Contractor</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div>
              <a
                href="#"
                className="flex items-center p-3 text-slate-200 rounded-lg group mt-10 hover:bg-gray-700"
              >
                <img className="h-6 mr-3 sm:h-5" src={logout} alt="logout" />
                <span className="ml-8">Log out</span>
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Sidebar;
