import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SavedJobs from './pages/SavedJobs';
import Digest from './pages/Digest';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/digest" element={<Digest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
