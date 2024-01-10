import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import DatatableContractor from '../components/DatatableContractor';
import DatatableContractor2 from '../components/DatatableContractor2';

import { useParams } from 'react-router-dom';

const staticColumns = [
  {
    Header: 'Name client',
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

const BodyContractor = () => {
  const { userId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [appointmentsaccept, setAppointmentsaccept] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          // Fetch appointments data
          const appointmentsContractorResponse = await axios.get(`http://127.0.0.1:8000/api/viewappointmentcontractor`);
          setAppointments(appointmentsContractorResponse.data.appointment);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          // Fetch appointments data
          const appointmentsContractorResponse = await axios.get(`http://127.0.0.1:8000/api/ViewAcceptAppointmentContractor/${userId}`);
          setAppointmentsaccept(appointmentsContractorResponse.data.appointment);
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
      <h2 className="m-2">Appointment</h2>
      <div className="rounded-lg rounded border-2 border-black rounded-lg">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : Array.isArray(appointments) ? (
          <DatatableContractor columns={staticColumns} data={appointments} />
        ) : (
          <p>Appointments data is not an array.</p>
        )}
      </div>
          <br/>
      <h2 className="m-2">Accept Appointment</h2>
      <div className="rounded-lg rounded border-2 border-black rounded-lg">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : Array.isArray(appointmentsaccept) ? (
          <DatatableContractor2 columns={staticColumns} data={appointmentsaccept} />
        ) : (
          <p>Appointments data is not an array.</p>
        )}
      </div>
    </div>
  );
};

export default BodyContractor;
