// localStorage utility functions for job status tracking

const STORAGE_KEYS = {
  JOB_STATUS: 'jobTrackerStatus',
  SAVED_JOBS: 'savedJobs',
  STATUS_HISTORY: 'statusHistory'
};

export const getJobStatus = (jobId) => {
  const statuses = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOB_STATUS) || '{}');
  return statuses[jobId] || 'Not Applied';
};

export const setJobStatus = (jobId, status) => {
  const statuses = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOB_STATUS) || '{}');
  statuses[jobId] = status;
  localStorage.setItem(STORAGE_KEYS.JOB_STATUS, JSON.stringify(statuses));
  
  // Add to status history
  addStatusHistory(jobId, status);
};

export const addStatusHistory = (jobId, status) => {
  const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATUS_HISTORY) || '[]');
  history.unshift({
    jobId,
    status,
    timestamp: new Date().toISOString()
  });
  // Keep only last 50 updates
  localStorage.setItem(STORAGE_KEYS.STATUS_HISTORY, JSON.stringify(history.slice(0, 50)));
};

export const getStatusHistory = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.STATUS_HISTORY) || '[]');
};

export const getSavedJobs = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_JOBS) || '[]');
};

export const saveJob = (job) => {
  const saved = getSavedJobs();
  if (!saved.find(j => j.id === job.id)) {
    saved.push(job);
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(saved));
  }
};

export const unsaveJob = (jobId) => {
  const saved = getSavedJobs();
  const filtered = saved.filter(j => j.id !== jobId);
  localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(filtered));
};

export const isJobSaved = (jobId) => {
  return getSavedJobs().some(j => j.id === jobId);
};
