import React from 'react';

const Modal = ({ onClose, data }) => {
  return (
    <div className="fixed inset-0 modal z-40">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg modal-content w-full">
        <button className="absolute top-0 right-0 p-4 close" onClick={onClose}>
          &times;
        </button>
        {data && (
          <>
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
              <p className="text-lg font-semibold">{data.appointment_status}</p>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
