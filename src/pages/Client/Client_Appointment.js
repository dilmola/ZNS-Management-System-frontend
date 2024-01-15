import React, { useState, useEffect } from "react";
import submitIcon from "../../img/icon/submit-icon.png";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "../../components/common/DatePicker";
import Selector from "../../components/common/Selector";
import Input from "../../components/common/InputField";
import Button from "../../components/common/SaveButton";
import ApiService from "../../API/ApiService.js";
import { useParams } from "react-router-dom";
import showToast from "../../components/common/Toast.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientAppointment = () => {
  const { userId } = useParams();
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    date_appointment: "",
    appointment_type: "",
    location_appointment: "",
    address: "",
    remark: "",
    // addressDisabled: false,
    users_id: userId || "",
    users_id_contractor: "",
  });

  const handleToggle1 = () => {
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log("Form data updated:", { ...formData, [name]: value });
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));

  //   if (name === "location_appointment" && value === "2") {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       // addressDisabled: false,
  //     }));
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       // addressDisabled: true,
  //     }));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Submit button clicked");
    try {
      const response = await ApiService.post("createappointment", formData);
      //console.log("Form data submitted successfully:", response.data);

      showToast("👍 Successful Submit!");
    } catch (error) {
      console.error("Error submitting form data:", error.message);

      showToast("Failed to create appointment. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const getProfileData = `get/data/my-profile/${userId}`;
      const responseProfileData = await ApiService.get(getProfileData);
      const userProfile = responseProfileData.user || {};
      //console.log(userProfile);
      setFullname(userProfile.fullname);
      setEmail(userProfile.email);
      setPhone(userProfile.phone);
      setAddress(userProfile.address);

      setFormData((prevData) => ({
        ...prevData,
        fullname: userProfile.fullname,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="text-2xl	mb-6">Make an appointment</h2>
      <form onSubmit={handleSubmit}>
        <div class="grid grid-cols-2 gap-4">
          <label className="block mb-8">
            Fullname:
            <Input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter Your Full Name"
            />
          </label>
          <label className="block mb-8">
            Email:
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Select an option"
            />
          </label>
          <label className="block mb-8">
            Phone Number:
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone Number"
            />
          </label>
          <label className="block mb-8">
            Date:
            <DatePicker setFormData={setFormData} formData={formData} />
          </label>
          <label className="block mb-8">
            Type of an appointment:
            <Selector
              selectedItem={selectedItem1}
              setSelectedItem={setSelectedItem1}
              value={formData.appointment_type}
              options={[
                { label: "Pick a product", value: "1" },
                { label: "Inpection", value: "2" },
              ]}
              isOpen={isOpen1}
              onToggle={handleToggle1}
              onChange={(selectedValue) =>
                setFormData((prevData) => ({
                  ...prevData,
                  appointment_type: selectedValue,
                }))
              }
            />
          </label>
          <label className="block mb-8">
            Location appointment:
            <Selector
              selectedItem={selectedItem2}
              setSelectedItem={setSelectedItem2}
              options={[
                {
                  label:
                    "Office: Sub Lot 2, Tingkat 3, Block F, Demak Laut Commercial Centre, Kuching, Malaysia",
                  value: "1",
                },
                { label: "Others", value: "2" },
              ]}
              value={formData.location_appointment}
              isOpen={isOpen2}
              onToggle={handleToggle2}
              onChange={(selectedValue) => {
                // Update the form data based on the selected option
                setFormData((prevData) => ({
                  ...prevData,
                  location_appointment: selectedValue,
                  address:
                    selectedValue === "1"
                      ? "Office: Sub Lot 2, Tingkat 3, Block F, Demak Laut Commercial Centre, Kuching, Malaysia"
                      : "", // Set the address based on the selected option
                }));
              }}
            />
          </label>
        </div>
        <div>
          <label className="block mb-4">
            Address:
            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  address: e.target.value,
                }))
              }
              className={`focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta border-solid border border-1 border-gray-300 w-full rounded bg-gray-50 mt-2 ${
                formData.addressDisabled ? "disabled" : ""
              }`}
              readOnly={formData.addressDisabled}
            />
          </label>

          <label className="block mb-4">
            Remark:
            <textarea
              rows={4}
              name="remark"
              value={formData.remark}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  remark: e.target.value,
                }))
              }
              className="focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta border-solid border border-1 border-gray-300 w-full rounded bg-gray-50 mt-2"
            />
          </label>
        </div>
        <div className="flex flex-row-reverse mt-12">
          <Button
            label="Submit"
            color="SubmitButton"
            src={submitIcon}
            onClick={handleSubmit}
          />
          <Button label="Cancel" color="CancelButton" />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ClientAppointment;
