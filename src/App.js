import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Registration from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Client_MainContainer from "../src/pages/Client/Client_MainContainer";
import Admin_MainContainer from "../src/pages/Admin/Admin_MainContainer";
import Contractor_MainContainer from "../src/pages/Contractor/Contractor_MainContainer";

import NoMatch from "../src/pages/NoMatch";
import ImageUploadForm from "../src/pages/Contractor/test2";

function App() {
  return (
    <div className="text-sm font-custom selection:bg-gray-800 selection:text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/client/:userId" element={<Client_MainContainer />} />
          <Route path="/admin/:userId" element={<Admin_MainContainer />} />
          <Route
            path="/contractor/:userId"
            element={<Contractor_MainContainer />}
          />
          <Route path="*" element={<NoMatch />} />
          <Route path="/test" element={<ImageUploadForm />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
