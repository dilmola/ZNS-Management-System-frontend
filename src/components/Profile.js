import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import DataTable from '../components/Datatable';

const staticColumns = [
  {
    Header: 'Name contractor',
    accessor: 'users_id',
  },
  {
    Header: 'Date',
    accessor: 'date_apointment',
  },
  {
    Header: 'Status',
    accessor: 'appointment_status_id',
  },
];

const Profile = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/appointment/1');
        setAppointments(response.data.appointment);  // Update here
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="m-2">Profile</h2>
      <div>
        <Cards />
      </div>

      <h2 className="m-2">Appointment</h2>
      <div className="rounded-lg rounded border-2 border-black  rounded-lg">    
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : Array.isArray(appointments) ? (
          <DataTable columns={staticColumns} data={appointments} />
        ) : (
          <p>Appointments data is not an array.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
