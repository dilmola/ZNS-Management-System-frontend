import React, { useState, useRef } from 'react';
import submitIcon from '../img/icon/submit-icon.png';
import 'react-datepicker/dist/react-datepicker.css';
import { Flowbite } from 'flowbite-react';
import DatePicker from '../components/Datepicker';
import Selector from '../components/Selector';
import InputField from '../components/Input';
import Modal from '../components/modals/Modal';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { setUserId } from '../api/apiService';
import { useReactToPrint } from 'react-to-print';
const Quotation = () => {
  const [formFields, setFormFields] = useState([]);
  const componentRef = useRef();
  const navigate = useNavigate();

  const handleAddField = () => {
    setFormFields([...formFields, { Bil: '', Perkara: '', Kuantiti: '', Harga: '', Jumlah: '' }]);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;
    setFormFields(updatedFields);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSaveQuotation = () => {
    axios.post('your_quotation_api_endpoint', { fields: formFields })
      .then(response => {
        console.log('Quotation saved successfully', response.data);
        navigate('/success');
      })
      .catch(error => {
        console.error('Error saving quotation', error);
      });
  };

  return (
    <div className="p-12 mt-8.6m">
      <div className="  p-4">
        {/* ... Your existing components here, e.g., DatePicker, Selector, etc. ... */}

        {/* Dynamic Form */}
        {/* <button className="bg-blue-500 text-white p-2 mb-4" onClick={handleAddField}>
          Add Field
        </button> */}
        <button type="submit" className="text-black border-2 border-TerraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4 text-center inline-flex items-center me-2 mb-12" onClick={handleAddField} >
        Add Field
        </button>
    
        {formFields.map((field, index) => (
          <div key={index} className="mb-4 p-1">
            <label className="mr-2">Bil:</label>
            <input
              type="text"
              value={field.Bil}
              onChange={(e) => handleFieldChange(index, 'Bil', e.target.value)}
              className="border rounded p-2 w-20"
            />

            {/* Perkara field */}
            <label className="mr-2 ml-4">Perkara:</label>
            <input
              type="text"
              value={field.Perkara}
              onChange={(e) => handleFieldChange(index, 'Perkara', e.target.value)}
              className="border rounded p-2"
            />

            {/* Kuantiti field */}
            <label className="mr-2 ml-4">Kuantiti:</label>
            <input
              type="text"
              value={field.Kuantiti}
              onChange={(e) => handleFieldChange(index, 'Kuantiti', e.target.value)}
              className="border rounded p-2 w-20"
            />

            {/* Harga field */}
            <label className="mr-2 ml-4">Harga:</label>
            <input
              type="text"
              value={field.Harga}
              onChange={(e) => handleFieldChange(index, 'Harga', e.target.value)}
              className="border rounded p-2"
            />

            {/* Jumlah field */}
            <label className="mr-2 ml-4">Jumlah:</label>
            <input
              type="text"
              value={field.Jumlah}
              onChange={(e) => handleFieldChange(index, 'Jumlah', e.target.value)}
              className="border rounded p-2"
            />
          </div>
        ))}

     
        <button type="submit" className="text-white bg-TerraCotta hover:bg-TerraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center me-2" onClick={handlePrint}>
                        Print
                        <img className="ml-12 w-3.5 h-3.5" src={submitIcon} alt="Submit Icon" />
                    </button>
        {/* Print Component */}
        <div style={{ display: 'none' }}>
          <PrintComponent fields={formFields} ref={componentRef} />
        </div>
      </div>
    </div>
  );
};

const PrintComponent = React.forwardRef(({ fields }, ref) => (
  <div ref={ref}>
    <h1 className="text-2xl font-bold mb-4">Quotation Document</h1>
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border p-2">Bil</th>
          <th className="border p-2">Perkara</th>
          <th className="border p-2">Kuantiti</th>
          <th className="border p-2">Harga (per unit)</th>
          <th className="border p-2">Jumlah (RM)</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, index) => (
          <tr key={index}>
            <td className="border p-2">{field.Bil}</td>
            <td className="border p-2">{field.Perkara}</td>
            <td className="border p-2">{field.Kuantiti}</td>
            <td className="border p-2">{field.Harga}</td>
            <td className="border p-2">{field.Jumlah}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

export default Quotation;
