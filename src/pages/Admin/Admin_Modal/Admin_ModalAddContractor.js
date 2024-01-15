import React, { useState } from "react";
import CustomModal from "../../../components/common/Modal";
import Input from "../../../components/common/InputField";
import showToast from "../../../components/common/Toast.js";
import ApiService from "../../../API/ApiService.js";

const ModalAddContractor = ({ isOpen, closeModal }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Adjust the API endpoint according to your requirements
      const endpointAddContractor = "create/new/contractor";

      // Prepare data for the API call
      const contractorData = {
        fullname: fullname,
        email: email,
        password: password,
      };

      // Make an API call to add a new contractor
      const response = await ApiService.post(
        endpointAddContractor,
        contractorData
      );

      //console.log("Full API Response:", response); // Log the entire response

      // Check if contractorData exists in the response
      if (response && response.contractorData) {
        //console.log("Contractor Data:", response.contractorData);
        showToast("👍 Successful Submit!");
        closeModal();
      } else {
        console.error("Unexpected response structure:", response);
        showToast("❌ Unexpected Response Structure");
      }
    } catch (error) {
      console.error("Error adding contractor:", error);
      showToast("❌ Error Adding Contractor");
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      content={
        <div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold mb-10">Add new contractor</h2>

            <label className="font-semibold">Name Contractor:</label>
            <Input
              type="text"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />

            <label className="font-semibold">Email:</label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="font-semibold">Password:</label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      }
    />
  );
};

export default ModalAddContractor;
