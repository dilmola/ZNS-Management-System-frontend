import Datepicker from "tailwind-datepicker-react"
import React, { useEffect, useState  } from 'react';
// import { Datepicker } from 'flowbite-react';

const DatePicker = () => {
    const options = {
        theme: {
          background: "bg-PlatinumColorCalendar border-solid border-2 border-gray-500",
          todayBtn: "bg-TerraCotta hover:bg-TerraCotta",
          clearBtn: "bg-orange-50",
          icons: "bg-transparent",
          text: "",
          disabledText: "text-gray-400",
          input: "w-full py-[8.2px] border-solid border-2 border-gray-500 w-full  rounded bg-input-field mt-2 focus:ring focus:ring-TerraCotta focus:ring-offset-0 focus:border-TerraCotta placeholder-black/25 text-black text-xs",
          inputIcon: "",
          selected: "bg-orange-50 border-2 text-gray-950 ",         
        },
      }
    
    const [show, setShow] = useState(false);

    const handleChange1 = (selectedDate) => {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
    
      const formattedDate = `${year}-${month}-${day}`;
    
      console.log(formattedDate);
    };
  
    const handleClose = (state) => {
      setShow(state);
    };

  return (
    <div>
        <Datepicker options={options} onChange={handleChange1} show={show} setShow={handleClose} />
    </div>
  );
};

export default DatePicker;