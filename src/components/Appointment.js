import React, { useState, useEffect } from 'react';
import submitIcon from '../img/icon/submit-icon.png';
import 'react-datepicker/dist/react-datepicker.css';
import { Flowbite } from 'flowbite-react';
import DatePicker from '../components/Datepicker';
import Selector from '../components/Selector';
import InputField from '../components/Input';
import Modal from '../components/modals/Modal';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { setUserId } from '../api/apiService';


const locationOptions = [
    { id: 1, value: 'Home' },
    { id: 2, value: 'Office' },
    { id: 3, value: 'Other' },
  ];
  
  // Modify it to be an array of strings or numbers
const modifiedLocationOptions = locationOptions.map(option => option.value);

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: '',
        date_apointment: '',
        appointment_type: '',
        location_appointment: '',
        address: '',
        remark: '',
      });
      console.log(formData);
      const { userId } = useParams();

      const [selectedItem1, setSelectedItem1] = useState(null);
      const [selectedItem2, setSelectedItem2] = useState(null);
      const [isOpen1, setIsOpen1] = useState(false);
      const [isOpen2, setIsOpen2] = useState(false);
      const [userDataFetched, setUserDataFetched] = useState(false);

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
      const handleDropdownChange = (name, selectedOption) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: selectedOption.value,
          [`${name}_id`]: selectedOption.id,
        }));
      };
      
      const handleDateChange = (name, date) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: date,
        }));
      };
    //   const handleSubmit = async (e) => {
        // e.preventDefault();
        // const {   
        //     fullname,
        //     email,
        //     phone,
        //     date_apointment,
        //     appointment_type,
        //     location_appointment,
        //     address,
        //     remark,
        // } = this.state;
    
        const handleSubmit = async (e) => {
            e.preventDefault();
        
            try {
                if (userId) {
              // Make an HTTP POST request to your Laravel API endpoint
              const response = await axios.post('http://127.0.0.1:8000/api/createappointment', formData);
        
              console.log('Appointment created:', response.data);
              // Add any additional logic based on the API response
            

              window.location.reload();
            }
    
            } catch (error) {
              console.error('Error creating appointment:', error);
              // Handle error, show error message, etc.
            }
          };
    //   };

    useEffect(() => {
        // Fetch user data only if it hasn't been fetched before
        if (!userDataFetched) {
          const fetchUserData = async () => {
            try {
              if (userId) {
                // Fetch user data
                const userResponse = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
                const userData = userResponse.data.user;    
                setFormData((prevData) => ({
                  ...prevData,
                  user_id: userData.user_id,
                  fullname: userData.fullname,
                  email: userData.email,
                  phone: userData.phone,
                }));
              }
    
              setUserDataFetched(true);
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
    
          fetchUserData();
        }
      }, [userDataFetched, userId]);

        return (
        <div className="p-12 mt-8.6m">
            <h2 className="text-2xl	mb-6">Make an appointment</h2>
                <form onSubmit={handleSubmit}>
                <div class="grid grid-cols-2 gap-4"> 
                
        
                    <input type="hidden" name="user_id"  value={formData.user_id}/>

                <InputField
                    type="text"
                    label="Full Name:"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    readOnly={userDataFetched}
                />   
                <InputField
                        type="email"
                        label="Email:"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Select an option"
                        readOnly={userDataFetched}

                    />                                             
                <InputField
                        type="number"
                        label="Phone Number:"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Your Phone Number"
                        readOnly={userDataFetched}

                    />  
                <label className="block text-gray-700 text-xs font-bold mb-8">  
                Date: 
                    <DatePicker 
                        name="date_apointment"
                        value={formData.date_apointment}
                        handleDateChange={(date) => handleDateChange('date_apointment', date)}
                    />
                </label>                        
                    {/* <label className="block text-gray-700 text-xs font-bold mb-8">  
                    Type of an appointment: 
                    <Selector
                            selectedItem={selectedItem1}
                            setSelectedItem={setSelectedItem1}
                            options={['Option 1', 'Option 2', 'Option 3']}
                            isOpen={isOpen1}
                            onToggle={handleToggle1}
                    />
                    </label> */}
                      <InputField
                            type="text"
                            label="Type of an appointment:"
                            name="appointment_type"
                            value={formData.appointment_type}
                            onChange={handleChange}
                            placeholder="Select an option"
                            
                        /> 
                    <label className="block text-gray-700 text-xs font-bold mb-4">
                    Location appointment:                            
                    <Selector
                        selectedItem={selectedItem2}
                        setSelectedItem={setSelectedItem2}
                        options={modifiedLocationOptions}
                        isOpen={isOpen2}
                        onToggle={handleToggle2}
                        name="location_appointment"
                        value={formData.location_appointment}
                        onChange={(selectedOption) => {
                            console.log("Selector onChange - Selected Option:", selectedOption);
                            handleDropdownChange("location_appointment", selectedOption);
                        }}
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
                    <button type="submit" className="text-white bg-TerraCotta hover:bg-TerraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center me-2">
                        Submit
                        <img className="ml-12 w-3.5 h-3.5" src={submitIcon} alt="Submit Icon" />
                    </button>
                    <button type="button" class="text-black border-2 border-TerraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4 text-center inline-flex items-center me-2">
                        Cancel                
                    </button>   
                </div>    

                </form>
                
        </div>           

          
    )};
export default Profile;
