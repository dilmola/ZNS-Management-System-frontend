import React from "react";
import { FaAngleDown } from "react-icons/fa";

const Selector = ({
  selectedItem,
  setSelectedItem,
  options,
  isOpen,
  onToggle,
  onChange,
}) => {
  const handleItemClick = (item) => {
    setSelectedItem(item.label); // Set the label as the selected item
    onChange && onChange(item.value); // Pass the value property to onChange
    onToggle && onToggle();
  };

  return (
    <div className="w-full relative">
      <div
        onClick={onToggle}
        className={`w-full focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset border border-1 bg-gray-50 border-gray-300 flex justify-between p-3 rounded whitespace-nowrap overflow-hidden overflow-ellipsis`}
        style={{ overflow: "hidden" }}
      >
        <span className={`text-${selectedItem ? "black" : "black/25"}`}>
          {selectedItem || "SELECT AN OPTION"}
        </span>
        <FaAngleDown />
      </div>
      <ul
        className={`border-solid border-2 border-gray-500 z-10 absolute w-full bg-white mt-2 rounded-lg overflow-y-auto ${
          isOpen ? "max-h-60 " : "max-h-0 hidden"
        }`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            className="z-40 w-full p-2 bg-PlatinumColorCalendar hover:bg-TerraCotta hover:text-white"
            onClick={() => handleItemClick(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
