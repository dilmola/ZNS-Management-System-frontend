import React from "react";
import { toast } from "react-toastify";

const customToastStyle = {
  background: "#2C2C2C", // Black background
  color: "#fff", // White text

  
};

const showToast = (message) => {
  toast(message, {
    hideProgressBar: true,

    autoClose: 2000,
    position: "top-center",
    style: customToastStyle, // Apply the custom style directly to the toast
    onClose: () => {
      setTimeout(() => {
        window.location.reload(); // Reload the window after 5000 milliseconds (5 seconds)
      }, 2200);
    },
  });
};

export default showToast;
