import React from 'react';

const ModalTrigger = ({ onClick }) => {
  return (
    <button
      data-modal-target="crud-modal"
      data-modal-toggle="crud-modal"
      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
      onClick={onClick}
    >
      Toggle modal
    </button>
  );
};

export default ModalTrigger;