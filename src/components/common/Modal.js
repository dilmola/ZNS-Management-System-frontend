import React from 'react';

const CustomModal = ({ isOpen, closeModal, content }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto z-50	${isOpen ? 'block' : 'hidden'}`} onClick={closeModal}>
      <div className="flex items-center justify-center min-h-screen w-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity " aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle h-full"
          onClick={handleContentClick}
        >
          <div className="bg-white px-4 pt-5 pb-4 h-full">
            <span className="close absolute top-0 right-0 p-4 cursor-pointer" onClick={closeModal}>&times;</span>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
