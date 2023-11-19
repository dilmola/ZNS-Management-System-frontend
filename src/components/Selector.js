import React, { useState, useEffect, useRef } from 'react';
import { FaAngleDown } from "react-icons/fa";

const Selector = ({ selectedItem, setSelectedItem, options, isOpen, onToggle }) => {
    const [open, setOpen] = useState(false);
    const ulRef = useRef(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setOpen(false);
    };

    const handleContainerClick = (e) => {
        e.stopPropagation();
        setOpen(!open);
        onToggle();
    };

    const handleClickOutside = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full relative ">
            <div
                onClick={handleContainerClick}
                // className="border-solid border-2  border-gray-500 w-full border rounded bg-transparent mt-2 p-3 focus:ring focus:ring-TerraCotta focus:ring-offset-0 focus:border-TerraCotta"
                className={`w-full border-solid border-2 border-gray-500 flex justify-between p-2 rounded bg-input-field mt-2 focus:ring focus:ring-TerraCotta focus:ring-offset-0 focus:border-TerraCotta text-xs`}
                style={{ overflow: 'hidden' }}
            >
                <span className={`text-${selectedItem ? 'black' : 'black/25'}`}>{selectedItem || 'Select an option'}</span>
                <FaAngleDown />                
            </div>
            <ul
                ref={ulRef}
                className={`border-solid border-2 border-gray-500 z-10 absolute w-full bg-white mt-2 rounded-lg overflow-y-auto ${open ? "max-h-60" : "max-h-0 hidden"}`}
                >
                {options.map((option, index) => (
                    <li
                        key={index}
                        className="z-40 w-full p-2 text-xs bg-PlatinumColorCalendar hover:bg-TerraCotta hover:text-white"
                        onClick={() => handleItemClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Selector;
