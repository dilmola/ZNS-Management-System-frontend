import InputField from "../../components/common/InputField";
import ReusableButton from "../../components/common/SaveButton";
import submitIcon from "../../img/icon/submit-icon.png";
import profilePicture from "../../img/icon/profile_pictures/male.png";
import ApiService from "../../API/ApiService";
import { useParams } from "react-router-dom";
import {
  showToast,
  showToastWithoutReload,
} from "../../components/common/Toast.js";
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";

const ContractorProfile = () => {
  const handleCancel = () => {
    setFullname("");
    setUsername("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPassword("");
  };

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [usertype, setUsertype] = useState("");

  const { userId } = useParams();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fetchData = async () => {
    try {
      const getProfileData = `get/data/my-profile/${userId}`;
      const responseProfileData = await ApiService.get(getProfileData);
      const userProfile = responseProfileData.user || {};
      //console.log(userProfile);
      setFullname(userProfile.fullname);
      setUsername(userProfile.username);
      setEmail(userProfile.email);
      setPassword(userProfile.password);
      setPhone(userProfile.phone);
      setAddress(userProfile.address);
      setUsertype(userProfile.users_type);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const userProfileData = {
        fullname,
        email,
        phone,
        address,
        password,
        username,
      };

      const updateProfileData = `update/data/my-profile/${userId}`;
      await ApiService.update(updateProfileData, userProfileData);
      //console.log("succesful");
      showToast("👍 Successful Submit!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl	mb-6">Your profile</h2>
      <div className="grid grid-rows-4 grid-flow-col gap-4">
        <div className="row-span-2 col-span-1 rounded-lg bg-CharlestonGreenColorCard text-white flex items-center justify-center">
          <img
            src={profilePicture}
            alt="profile picture"
            className="w-40 object-cover rounded-lg"
          />
        </div>
        <div className="row-span-2 col-span-1 flex flex-col items-center justify-center rounded-lg bg-CharlestonGreenColorCard text-white">
          You are as: <br />
          <div className="text-2xl font-semibold">{usertype}</div>
        </div>
        <div className="row-span-4 col-span-2 p-8 rounded-lg bg-white border-solid border-2 border-black overflow-auto overflow-x-auto">
          <div className="text-lg">Complete your profile here</div>
          <div className="mb-6 mt-8">
            Fullname
            <InputField
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="fullname"
              type="text"
            />
          </div>
          <div className="mb-6">
            Username
            <InputField
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              type="text"
            />
          </div>
          <div className="mb-6">
            Email
            <InputField
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              type="email"
            />
          </div>
          <div className="mb-6">
            Phone Number
            <InputField
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="phone number"
              type="number"
            />
          </div>
          <div className="mb-6">
            Address
            <InputField
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="address"
              type="text"
            />
          </div>
          <hr className="p-2"></hr>
          <div className="mb-6 relative">
            Password
            <div className="relative">
              <InputField
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                type={showPassword ? "text" : "password"}
              />
              <div
                className="absolute top-3	 right-2 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <FaLockOpen /> : <FaLock />}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-12">
            <ReusableButton
              onClick={handleCancel}
              label="Clear"
              color="CancelButton"
            />
            <ReusableButton
              onClick={handleSubmit}
              label="Submit"
              color="SubmitButton"
              src={submitIcon}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContractorProfile;
