import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ModalContractor = ({ onClose, data }) => {
  const { userId } = useParams();

  const [selectedStatus, setSelectedStatus] = useState('3'); // Default value

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };


  const handleSaveChanges = () => {
    console.log('Selected Status:', selectedStatus);

    // Make an Axios request to update the status
    axios.post(`http://127.0.0.1:8000/api/UpdateStatusAppointmentContractor/${userId}/${data.appointment_id}`, {
      appointment_status_id: selectedStatus,
    })
    .then(response => {
      // Handle success, maybe update the UI or show a notification
      console.log('Status updated successfully', response.data);
    })
    .catch(error => {
      // Handle error, show an error message
      console.error('Error updating status', error);
    });
  };

  return (
    <div className="fixed inset-0 modal z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg modal-content w-full">
        <button className="absolute top-0 right-0 p-4 close" onClick={onClose}>
          &times;
        </button>
        {data && (
          <>
            {/* Other fields... */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Name contractor:</label>
              <p className="text-lg font-semibold">{data.fullname || 'Pending'}</p>
            </div><br/>
            <div>
              <label className="block text-sm font-medium text-gray-600">Date:</label>
              <p className="text-lg font-semibold">{data.date_apointment || 'error'}</p>
            </div><br/>
            <div>
              <label className="block text-sm font-medium text-gray-600">Address:</label>
              <p className="text-lg font-semibold">{data.address}</p>
            </div><br/>
            <div>
              <label className="block text-sm font-medium text-gray-600">Remarks:</label>
              <p className="text-lg font-semibold">{data.remark}</p>
            </div><br/>
           
            <div>
              <label className="block text-sm font-medium text-gray-600">Status:</label>
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="text-lg font-semibold w-full p-2 border rounded bg-input-field"
              >
                <option value="3">Pending</option>
                <option value="1">Accepted</option>
                {/* Add other status options as needed */}
              </select>
            </div>

            {/* Save changes button */}
            <button onClick={handleSaveChanges} className="mt-4 p-2 bg-button-dark text-white rounded">
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalContractor;
