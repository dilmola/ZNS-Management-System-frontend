import React from 'react';

const InputField = ({ label, name, value, onChange, placeholder, type }) => {
  return (
    <label className="block text-gray-700 text-xs font-bold mb-4">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // autocomplete="off"
        className="w-full border-solid border-2 border-gray-500 p-2 rounded bg-input-field mt-2 focus:ring focus:ring-TerraCotta focus:ring-offset-0 focus:border-TerraCotta placeholder-black/25 font-medium	text-black text-xs"
      />
    </label>
  );
};

export default InputField;