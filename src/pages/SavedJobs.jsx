import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import Toast from '../components/Toast';
import { getSavedJobs } from '../utils/storage';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = () => {
    setSavedJobs(getSavedJobs());
  };

  const handleStatusChange = (job, newStatus) => {
    setToast(`Status updated: ${newStatus}`);
    // Refresh saved jobs to reflect any changes
    loadSavedJobs();
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  // Refresh saved jobs when component gains focus
  useEffect(() => {
    const handleFocus = () => loadSavedJobs();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Saved Jobs</h2>
      
      <div className="jobs-grid">
        {savedJobs.length > 0 ? (
          savedJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>No saved jobs</h3>
            <p>Save jobs from the dashboard to see them here</p>
          </div>
        )}
      </div>

      {toast && <Toast message={toast} onClose={handleCloseToast} />}
    </div>
  );
};

export default SavedJobs;
