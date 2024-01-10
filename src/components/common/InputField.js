import React from "react";

const InputField = ({
  name,
  value,
  onChange,
  placeholder,
  type,
  className,
}) => {
  return (
    <label className={`block text-gray-700 text-lg ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset w-full border border-1 border-gray-300 p-2 rounded bg-gray-50 text-black"
      />
    </label>
  );
};

export default InputField;
