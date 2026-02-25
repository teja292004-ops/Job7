import React, { useState, useEffect } from 'react';
import { getJobStatus, setJobStatus, saveJob, unsaveJob, isJobSaved } from '../utils/storage';

const STATUS_OPTIONS = ['Not Applied', 'Applied', 'Rejected', 'Selected'];

const JobCard = ({ job, onStatusChange }) => {
  const [status, setStatus] = useState('Not Applied');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setStatus(getJobStatus(job.id));
    setSaved(isJobSaved(job.id));
  }, [job.id]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setJobStatus(job.id, newStatus);
    if (onStatusChange) {
      onStatusChange(job, newStatus);
    }
  };

  const handleSaveToggle = () => {
    if (saved) {
      unsaveJob(job.id);
      setSaved(false);
    } else {
      saveJob(job);
      setSaved(true);
    }
  };

  const getStatusClass = (statusOption) => {
    const baseClass = statusOption.toLowerCase().replace(' ', '-');
    return `status-btn ${baseClass} ${status === statusOption ? 'active' : ''}`;
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-company">{job.company}</p>
      </div>
      
      <div className="job-details">
        <div className="job-detail">
          <strong>Location:</strong>
          <span>{job.location}</span>
        </div>
        <div className="job-detail">
          <strong>Match Score:</strong>
          <span>{job.matchScore}%</span>
        </div>
        <div className="job-detail">
          <strong>Salary:</strong>
          <span>{job.salary}</span>
        </div>
        <div className="job-detail">
          <strong>Posted:</strong>
          <span>{job.postedDate}</span>
        </div>
      </div>

      <div className="status-section">
        <span className="status-label">Application Status:</span>
        <div className="status-buttons">
          {STATUS_OPTIONS.map((statusOption) => (
            <button
              key={statusOption}
              className={getStatusClass(statusOption)}
              onClick={() => handleStatusChange(statusOption)}
            >
              {statusOption}
            </button>
          ))}
        </div>
      </div>

      <div className="job-actions">
        <button className="btn btn-primary" onClick={handleSaveToggle}>
          {saved ? 'Unsave' : 'Save Job'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
