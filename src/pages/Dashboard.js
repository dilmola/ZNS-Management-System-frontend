import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Body from '../components/Body';
import Profile from '../components/Profile';
import Appointment from '../components/Appointment';
import Quotation from '../components/Quotation';

import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeContent, setActiveContent] = useState('body');

  // Use the useParams hook to get the userId from the URL
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
          setUserData(response.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Include userId as a dependency

  return (
    <div className="h-screen bg-PlatinumColor">
      <div className="bg-PlatinumColor bg-contain m-0 p-0">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="relative md:ml-64 flex flex-col">
          <Navbar userData={userData} />
          <>          
            {activeContent === 'profile' && <Profile userData={userData} />}
            {activeContent === 'body' && <Body userData={userData} />}
            {activeContent === 'appointment' && <Appointment userData={userData} />}
          </>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
