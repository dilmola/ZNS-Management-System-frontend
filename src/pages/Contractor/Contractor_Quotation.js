import React, { useState, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import PrintQuotation from "../../components/common/PrintQuotation";

const Quotation = () => {
  const [formFields, setFormFields] = useState([]);
  const componentRef = useRef();
  const navigate = useNavigate();
  const [isTableVisible, setIsTableVisible] = useState(false);

  const handleAddField = () => {
    setFormFields([
      ...formFields,
      { Bil: "", Perkara: "", Kuantiti: "", Harga: "", Jumlah: "" },
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

  const handleSaveQuotation = () => {
    axios
      .post("your_quotation_api_endpoint", { fields: formFields })
      .then((response) => {
        console.log("Quotation saved successfully", response.data);
        navigate("/success");
      })
      .catch((error) => {
        console.error("Error saving quotation", error);
      });
  };

  return (
    <div className="p-12 mt-8.6m">
      <div className="p-4">
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
        </div>{" "}
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
                        type="text"
                        value={field.Perkara}
                        onChange={(e) =>
                          handleFieldChange(index, "Perkara", e.target.value)
                        }
                        className="w-full bg-transparent border-none rounded p-2 text-left focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={field.Kuantiti}
                        onChange={(e) =>
                          handleFieldChange(index, "Kuantiti", e.target.value)
                        }
                        className="w-full bg-transparent border-none rounded p-2 text-center focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={
                          isNaN(parseFloat(field.Harga))
                            ? "0.00"
                            : parseFloat(field.Harga).toFixed(2)
                        }
                        onChange={(e) =>
                          handleFieldChange(index, "Harga", e.target.value)
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
        <div className="hidden">
          <PrintQuotation fields={formFields} ref={componentRef} />
        </div>
      </div>
    </div>
  );
};

export default Quotation;
