// import React, { Component, useEffect, useState  } from 'react';
// import submitIcon from '../img/icon/submit-icon.png';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Datepicker } from 'flowbite-react';
// import { Flowbite } from 'flowbite-react';
// import { CustomFlowbiteTheme } from 'flowbite-react';


import React, { useState } from 'react';
import submitIcon from '../img/icon/submit-icon.png';
import 'react-datepicker/dist/react-datepicker.css';
import { Flowbite } from 'flowbite-react';
import DatePicker from '../components/Datepicker';
import Selector from '../components/Selector';
import InputField from '../components/Input';
import Modal from '../components/modals/Modal';





const Profile = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        // other form fields...
      });
    
      const [selectedItem1, setSelectedItem1] = useState(null);
      const [selectedItem2, setSelectedItem2] = useState(null);
      const [isOpen1, setIsOpen1] = useState(false);
      const [isOpen2, setIsOpen2] = useState(false);

      const handleToggle1 = () => {
        setIsOpen1(!isOpen1);
        setIsOpen2(false); // Close the other select
    };

    const handleToggle2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen1(false); // Close the other select
    };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server
        console.log('Form data submitted:', formData);
        // Add logic to save data to the database
      };


        return (
        <div className="p-12 mt-8.6m">
            <h2 className="text-2xl	mb-6">Make an appointment</h2>
                <form onSubmit={handleSubmit}>             
                <div class="grid grid-cols-2 gap-4"> 
                    <InputField
                        type="text"
                        label="Full Name:"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter Your Full Name"
                    />                         
                    <InputField
                            type="email"
                            label="Email:"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Select an option"
                        />                                             
                    {/* <Modal/> */}
                    <InputField
                            type="number"
                            label="Phone Number:"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter Your Phone Number"
                        />  
                    <label className="block text-gray-700 text-xs font-bold mb-8">  
                    Date: 
                        <DatePicker />
                    </label>                        
                    <label className="block text-gray-700 text-xs font-bold mb-8">  
                    Type of an appointment: 
                    <Selector
                            selectedItem={selectedItem1}
                            setSelectedItem={setSelectedItem1}
                            options={['Option 1', 'Option 2', 'Option 3']}
                            isOpen={isOpen1}
                            onToggle={handleToggle1}
                    />
                    </label>
                    <label className="block text-gray-700 text-xs font-bold mb-4">
                    Location appointment:                            
                        <Selector
                                selectedItem={selectedItem2}
                                setSelectedItem={setSelectedItem2}
                                options={['Item A', 'Item B', 'Item C']}
                                isOpen={isOpen2}
                                onToggle={handleToggle2}
                        />
                    </label>
                </div>
                <div>                        
                    <label className="block text-gray-700 text-xs font-bold mb-4">
                        Address:
                        <textarea
                            rows={4}
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border-solid border-2 border-gray-500 w-full border rounded bg-input-field mt-2 focus:ring focus:ring-TerraCotta focus:ring-offset-0 focus:border-TerraCotta"
                        />
                    </label>
                    <label className="block text-gray-700 text-xs font-bold mb-4">
                        Remark:
                        <textarea
                            rows={4}
                            name="remark"
                            value={formData.remark}
                            onChange={handleChange}
                            className="border-solid border-2 border-gray-500 w-full border rounded bg-input-field mt-2 focus:ring focus:ring-TerraCotta focus:ring-offset-0 focus:border-TerraCotta"
                        />
                    </label>
                </div>                  
                <div className='flex flex-row-reverse mt-12'>                      
                    <button type="button" class="text-white bg-TerraCotta hover:bg-TerraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center me-2">
                        Submit                
                        <img className="ml-12 w-3.5 h-3.5 " src={submitIcon} alt="Submit Icon"/>
                    </button>
                    <button type="button" class="text-black border-2 border-TerraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4 text-center inline-flex items-center me-2">
                        Cancel                
                    </button>   
                </div>    

                </form>
                
        </div>           

          
    )};




  

export default Profile;
