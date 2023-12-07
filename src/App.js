import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams  } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Registration from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContractorDashboard from './pages/ContractorDashboard';

function App() {
  return (
    <div className="text-sm ">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/dashboard/contractor/:userId" element={<ContractorDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

