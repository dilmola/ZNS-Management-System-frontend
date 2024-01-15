import React, { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ApiService from "../../API/ApiService";

import PrintQuotation from "../../components/common/PrintQuotation";
import { useParams } from "react-router-dom"; // Import useParams
import showToast from "../../components/common/Toast.js";
import { ToastContainer } from "react-toastify";
const Quotation = () => {
  const [formFields, setFormFields] = useState([]);
  const componentRef = useRef();
  const navigate = useNavigate();
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(""); // Step 1: State for dropdown
  const [options, setOptions] = useState([]);
  const { userId } = useParams(); // Get user_id from URL params

  const handleDropdownChange = (value) => {
    setSelectedDropdownValue(value); // Step 2: Handle dropdown change
  };

  const handleAddField = () => {
    setFormFields([
      ...formFields,
      {
        details_appointment_items: "",
        quantity_appointment_items: "",
        price_appointment_items: "",
        appointment_appointment_id: "",
      },
    ]);
    setIsTableVisible(true);
  };

  const handleDeleteRow = (index) => {
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(index, 1);
    setFormFields(updatedFormFields);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;

    if (
      field === "quantity_appointment_items" ||
      field === "price_appointment_items"
    ) {
      const quantity =
        parseFloat(updatedFields[index]["quantity_appointment_items"]) || 0;
      const price =
        parseFloat(updatedFields[index]["price_appointment_items"]) || 0;
      updatedFields[index]["Jumlah"] = (quantity * price).toFixed(2);
    }

    setFormFields(updatedFields);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSaveQuotation = async () => {
    try {
      const requestData = formFields.map(
        ({
          details_appointment_items,
          quantity_appointment_items,
          price_appointment_items,
        }) => ({
          details_appointment_items,
          quantity_appointment_items,
          price_appointment_items,
          Jumlah: (
            parseFloat(quantity_appointment_items) *
            parseFloat(price_appointment_items)
          ).toFixed(2),
        })
      );

      // Assuming 'new/appointment/payment/item/' is your correct endpoint
      const updateProfileData = `new/appointment/payment/item/${userId}`;

      const response = await ApiService.post(updateProfileData, requestData);
      showToast("👍 Successful Checkout!");

      //console.log("API Response:", response);

      //console.log("Quotation saved successfully");
    } catch (error) {
      console.error("Error saving quotation", error);
    }
  };

  return (
    <div className="p-12 mt-8.6m">
      <div className="p-4">
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select an option
          </label>
          <select
            value={selectedDropdownValue}
            onChange={(e) => handleDropdownChange(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div> */}
        <div className="flex justify-between mb-12">
          <button
            type="submit"
            className="text-black border-2 border-TerraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4 text-center inline-flex items-center me-2 "
            onClick={handleAddField}
          >
            Add Field
          </button>

          <button
            type="submit"
            className="text-white bg-TerraCotta hover:bg-TerraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center me-2"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
        {isTableVisible && (
          <div className="rounded-lg border-2 border-black">
            <table className="table-auto w-full ">
              <thead className="border-b-2 border-gray-600 border-opacity-60 text-center ">
                <tr>
                  <th className="font-medium w-8 p-2">Bil</th>
                  <th className="font-medium p-2">Perkara</th>
                  <th className="font-medium p-2 w-20">Quantity</th>
                  <th className="font-medium p-2 w-20">Price</th>
                  <th className="font-medium p-2 w-20">Total</th>
                  <th className="font-medium p-2 w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formFields.map((field, index) => (
                  <tr key={index} className="px-5 py-3">
                    <td>
                      <input
                        name=""
                        type="text"
                        value={index + 1}
                        readOnly
                        onChange={(e) =>
                          handleFieldChange(index, "Bil", e.target.value)
                        }
                        className="w-full bg-transparent border-none rounded p-2 text-left focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td>
                      <input
                        name="Perkara"
                        type="text"
                        value={field.details_appointment_items}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "details_appointment_items",
                            e.target.value
                          )
                        }
                        className="w-full bg-transparent border-none rounded p-2 text-left focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td>
                      <input
                        name="Quantity"
                        type="number"
                        value={field.quantity_appointment_items}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "quantity_appointment_items",
                            e.target.value
                          )
                        }
                        className="w-full bg-transparent border-none rounded p-2 text-center focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td>
                      <input
                        name="Price"
                        type="text"
                        value={
                          isNaN(parseFloat(field.price_appointment_items))
                            ? "0.00"
                            : parseFloat(field.price_appointment_items).toFixed(
                                2
                              )
                        }
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "price_appointment_items",
                            e.target.value
                          )
                        }
                        className="w-full bg-transparent border-none rounded p-2 text-center focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td>
                      <input
                        name="Total"
                        type="text"
                        value={field.Jumlah}
                        readOnly
                        className="w-full bg-transparent border-none rounded p-2 text-center focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td className="flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteRow(index)}
                        className="bg-red-500 text-white p-2 rounded w-max"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-TerraCotta hover:bg-TerraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center me-2"
          onClick={handleSaveQuotation}
        >
          Save Quotation
        </button>
        <div className="hidden">
          <PrintQuotation fields={formFields} ref={componentRef} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Quotation;
