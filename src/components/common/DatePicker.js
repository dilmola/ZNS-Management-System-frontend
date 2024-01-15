import Datepicker from "tailwind-datepicker-react";
import { useState } from "react";

const DatePicker = ({ setFormData, formData }) => {
  const options = {
    theme: {
      background:
        "bg-PlatinumColorCalendar border-solid border-2 border-gray-500",
      todayBtn: "bg-TerraCotta hover:bg-TerraCotta",
      clearBtn: "bg-orange-50",
      icons: "bg-transparent",
      text: "",
      disabledText: "text-gray-400",
      input:
        "focus:outline-none focus:border-TerraCotta focus:ring-TerraCotta focus:ring-inset border border-1 border-gray-300 rounded bg-gray-50 text-black w-full rounded placeholder-black/25",
      inputIcon: "",
      selected: "bg-orange-50 border-2 text-gray-950 ",
    },
  };

  const [show, setShow] = useState(false);

  const handleChange1 = (selectedDate) => {
    //console.log(selectedDate);
    const formattedDate = selectedDate.toISOString().slice(0, 10);

    setFormData((prevData) => ({
      ...prevData,
      date_appointment: formattedDate,
    }));
  };

  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div>
      <Datepicker
        options={options}
        onChange={handleChange1}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};

export default DatePicker;
