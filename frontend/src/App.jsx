import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import React from 'react';
import { Toaster } from "react-hot-toast"

import Encrypt from "./pages/Encrypt";
import Decrypt from "./pages/Decrypt";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-8">
          <Routes>
            <Route path="/encrypt" element={<Encrypt />}/>
            <Route path="/decrypt" element={<Decrypt />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </Router>
    
  );
}

export default App;
