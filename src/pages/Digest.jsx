import React, { useState, useEffect } from 'react';
import { getStatusHistory } from '../utils/storage';
import { mockJobs } from '../data/mockJobs';

const Digest = () => {
  const [statusUpdates, setStatusUpdates] = useState([]);

  useEffect(() => {
    loadStatusUpdates();
  }, []);

  const loadStatusUpdates = () => {
    const history = getStatusHistory();
    
    // Enrich history with job details
    const enrichedHistory = history.map(update => {
      const job = mockJobs.find(j => j.id === update.jobId);
      return {
        ...update,
        jobTitle: job?.title || 'Unknown Job',
        company: job?.company || 'Unknown Company'
      };
    });

    setStatusUpdates(enrichedHistory);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    return `status-badge ${status.toLowerCase().replace(' ', '-')}`;
  };

  return (
    <div className="container">
      <div className="digest-section">
        <h2>Recent Status Updates</h2>
        
        {statusUpdates.length > 0 ? (
          <div className="status-updates-list">
            {statusUpdates.map((update, index) => (
              <div key={index} className="status-update-item">
                <div>
                  <strong>{update.jobTitle}</strong>
                </div>
                <div>{update.company}</div>
                <div>
                  <span className={getStatusBadgeClass(update.status)}>
                    {update.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                  {formatDate(update.timestamp)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No status updates yet</h3>
            <p>Status changes will appear here</p>
          </div>
        )}
      </div>

      <div className="digest-section">
        <h2>Application Summary</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {['Not Applied', 'Applied', 'Rejected', 'Selected'].map(status => {
            const count = statusUpdates.filter(u => u.status === status).length;
            return (
              <div key={status} style={{ 
                padding: '1.5rem', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                  {count}
                </div>
                <div style={{ marginTop: '0.5rem', color: '#7f8c8d' }}>
                  {status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Digest;
