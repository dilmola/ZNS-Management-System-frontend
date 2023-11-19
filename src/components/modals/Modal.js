import React, { useState } from 'react';
import ModalTrigger from './ModalTrigger';
import ModalContent from './ModalContent';

const Modal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData));
  };

  return (
    <>
      <ModalTrigger onClick={toggleModal} />
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <ModalContent onClose={toggleModal} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
