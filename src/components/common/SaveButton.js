import React from "react";

const ReusableButton = ({
  label,
  color,
  src,
  onClick ,
  className,
}) => {
  const getButtonStyle = () => {
    switch (color) {
      case "SubmitButton":
        return "text-white bg-TerraCotta hover:bg-TerraCotta focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center me-2";
      case "CancelButton":
        return "text-black border-2 border-TerraCotta focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm px-10 py-4 text-center inline-flex items-center me-2";
      case "AddButton":
        return "text-white bg-TerraCotta active:bg-TerraCottaLight hover:bg-TerraCottaDark hover:bg-TerraCotta focus:ring-0 focus:outline-none font-medium rounded-lg text-sm py-4 px-8 text-center inline-flex items-center";
      case "DeleteButton":
        return "text-black border-2 border-TerraCotta focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm px-8 py-4 text-center inline-flex items-center";
      default:
        return "";
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${getButtonStyle()} ${className || ""}`}
    >
      {label}
      {src && <img className="ml-2 w-3.5 h-3.5" src={src} alt="Submit Icon" />}
    </button>
  );
};

export default ReusableButton;
