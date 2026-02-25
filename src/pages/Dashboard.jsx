import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import Toast from '../components/Toast';
import { mockJobs } from '../data/mockJobs';
import { getJobStatus } from '../utils/storage';

const Dashboard = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [statusFilter, setStatusFilter] = useState('All');
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [locationFilter, setLocationFilter] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    applyFilters();
  }, [statusFilter, minMatchScore, locationFilter, jobs]);

  const applyFilters = () => {
    let filtered = [...jobs];

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(job => getJobStatus(job.id) === statusFilter);
    }

    // Match score filter
    if (minMatchScore > 0) {
      filtered = filtered.filter(job => job.matchScore >= minMatchScore);
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const handleStatusChange = (job, newStatus) => {
    setToast(`Status updated: ${newStatus}`);
    // Trigger re-filter by updating jobs state
    setJobs([...jobs]);
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <div className="container">
      <div className="filters">
        <div className="filter-row">
          <div className="filter-group">
            <label>Status Filter:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Not Applied">Not Applied</option>
              <option value="Applied">Applied</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min Match Score:</label>
            <input
              type="number"
              min="0"
              max="100"
              value={minMatchScore}
              onChange={(e) => setMinMatchScore(Number(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="filter-group">
            <label>Location:</label>
            <input
              type="text"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Filter by location"
            />
          </div>
        </div>
      </div>

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>No jobs found</h3>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>

      {toast && <Toast message={toast} onClose={handleCloseToast} />}
    </div>
  );
};

export default Dashboard;
