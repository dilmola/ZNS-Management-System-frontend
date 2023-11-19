import Cards from '../components/Cards';
import React, { Component, useEffect } from 'react';
import DataTable from '../components/Datatable';

const columns = [
    {
      Header: 'Name contractor',
      accessor: 'Name_contractor',
    },
    {
      Header: 'Date',
      accessor: 'Date',
    },
    {
        Header: 'Status',
        accessor: 'Status',
      },
  ];
  
  const data = [
    {
        Name_contractor: 'John Doe',
        Date: 30,
        Status: 30,
    },
    {
        Name_contractor: 'Jane Smith',
        Date: 25,
        Status: 30,
    },
  ];
  
class Profile extends Component {
    
    render() {
        return (
        <div className="p-12 mt-8.6m">
            <h2 className="m-2">Profile</h2>
            <div>
                <Cards />               
            </div>

            <h2 className="m-2">Appointmentsssssssssssssss</h2>  
                <div className="rounded-lg rounded border-2 border-black  rounded-lg">    
                <DataTable columns={columns} data={data} /></div>
            </div>
    )} 
};



  

export default Profile;
