import React, { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ApiService from "../../API/ApiService";

import PrintQuotation from "../../components/common/PrintQuotation";

const Quotation = () => {
  const [formFields, setFormFields] = useState([]);
  const componentRef = useRef();
  const navigate = useNavigate();
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(""); // Step 1: State for dropdown
  const [options, setOptions] = useState([]);

  const handleDropdownChange = (value) => {
    setSelectedDropdownValue(value); // Step 2: Handle dropdown change
  };

  const fetchData = async () => {
    try {
      const response = await fetch("your_api_endpoint");
    

      const data = await response.json();
      console.log("Fetched data:", data);

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error or rethrow it
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

    if (field === "Kuantiti" || field === "Harga") {
      const kuantiti = parseFloat(updatedFields[index]["Kuantiti"]) || 0;
      const harga = parseFloat(updatedFields[index]["Harga"]) || 0;
      updatedFields[index]["Jumlah"] = (kuantiti * harga).toFixed(2);
    }

    setFormFields(updatedFields);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSaveQuotation = async () => {
    try {
      const updateProfileData = `new/appointment/payment/item/`;
      const response = await ApiService.update(updateProfileData, {
        fields: formFields,
      });
      console.log("Quotation saved successfully", response.data);
    } catch (error) {
      console.error("Error saving quotation", error);
    }
  };

  return (
    <div className="p-12 mt-8.6m">
      <div className="p-4">
        <div className="mb-4">
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
        </div>
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
            {/* <img className="ml-12 w-3.5 h-3.5" alt="Submit Icon" /> */}
          </button>
        </div>
        {isTableVisible && (
          <div className="rounded-lg border-2 border-black">
            <table className="table-auto w-full ">
              <thead className="border-b-2 border-gray-600 border-opacity-60 text-center ">
                <tr>
                  <th className="font-medium w-8 p-2">Bil</th>
                  <th className="font-medium p-2">Perkara</th>
                  <th className="font-medium p-2 w-20">Kuantiti</th>
                  <th className="font-medium p-2 w-20">Harga</th>
                  <th className="font-medium p-2 w-20">Jumlah</th>
                  <th className="font-medium p-2 w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formFields.map((field, index) => (
                  <tr key={index} className="px-5 py-3 ">
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
                        name="details_appointment_items"
                        type="text"
                        value={field.price_quotation_items}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "price_quotation_items",
                            e.target.value
                          )
                        }
                        className="w-full bg-transparent border-none rounded p-2 text-left focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td>
                      <input
                        name="quantity_appointment_items"
                        type="number"
                        value={field.price_quotation_items}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "price_quotation_items",
                            e.target.value
                          )
                        }
                        className="w-full bg-transparent border-none rounded p-2 text-center focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td>
                      <input
                        name="price_appointment_items"
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
                        type="text"
                        value={field.Jumlah}
                        onChange={(e) =>
                          handleFieldChange(index, "Jumlah", e.target.value)
                        }
                        className="w-full bg-transparent border-none rounded p-2 text-center focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td className="flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteRow(index)}
                        className="bg-red-500 text-white p-2 rounded w-max	  "
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
    </div>
  );
};

export default Quotation;
