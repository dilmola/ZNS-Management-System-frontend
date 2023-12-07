import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import DataTable from '../components/Datatable';
import { useParams } from 'react-router-dom';

const staticColumns = [
  {
    Header: 'Name contractor',
    accessor: 'fullname',
    Cell: ({ value }) => value || 'pending',
  },
  {
    Header: 'Date',
    accessor: 'date_apointment',
    Cell: ({ value }) => value || 'error',
  },
  {
    Header: 'Status',
    accessor: 'appointment_status',
  },
];

const Body = () => {
  const { userId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          // Fetch appointments data
          const appointmentsResponse = await axios.get(`http://127.0.0.1:8000/api/viewappointment/${userId}`);
          setAppointments(appointmentsResponse.data.appointment);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="p-12 mt-8.6m">
      <h2 className="m-2">Profile</h2>
      <div>
        <Cards />
      </div>

      <h2 className="m-2">Appointment</h2>
      <div className="rounded-lg rounded border-2 border-black rounded-lg">
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

export default Body;
