import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Utils/firebase';

import '../components/JobListPage.css';

const JobListPage = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [skillFilter, setSkillFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [deletedJobs, setDeletedJobs] = useState([]);

  // Define the fetchJobs function separately
  const fetchJobs = async () => {
    try {
      const jobsCollection = collection(db, 'jobs');
      const snapshot = await getDocs(jobsCollection);

      const jobList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        expanded: false,
      }));

      setJobs(jobList);
    } catch (error) {
      console.error('Error fetching job listings:', error.message);
    }
  };

  useEffect(() => {
    // Fetch job listings from Firebase Firestore
    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      // Add the job ID to the user's list of deleted jobs
      setDeletedJobs((prevDeletedJobs) => [...prevDeletedJobs, jobId]);

      // Update the job list by removing the deleted job
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));

      // Update the user's deleted jobs list in Firestore (assuming you have a "deletedJobs" field in the user document)
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        deletedJobs: [...deletedJobs, jobId],
      });
    } catch (error) {
      console.error('Error deleting job:', error.message);
    }
  };

  const toggleExpandJob = (jobId) => {
    // Toggle the 'expanded' state for the selected job
    setJobs((prevJobs) =>
      prevJobs.map((job) => ({
        ...job,
        expanded: job.id === jobId ? !job.expanded : job.expanded,
      }))
    );
  };

  const applyFilter = () => {
    // Filter jobs based on skill and title input separately
    const skillFilteredJobs = skillFilter
      ? jobs.filter(
          (job) =>
            !deletedJobs.includes(job.id) &&
            job.skills.toLowerCase().includes(skillFilter.toLowerCase())
        )
      : jobs;

    const titleFilteredJobs = titleFilter
      ? skillFilteredJobs.filter(
          (job) =>
            job.title.toLowerCase().includes(titleFilter.toLowerCase())
        )
      : skillFilteredJobs;

    // Update the jobs state with the filtered jobs
    setJobs(titleFilteredJobs);
  };

  const resetFilter = () => {
    // Reset both filters and show all jobs
    setSkillFilter('');
    setTitleFilter('');
    // Fetch jobs again from Firebase and reset the jobs state
    fetchJobs();
  };

  return (
    <div className="job-list-page">
      <h1>Job Listings</h1>
      <div>
        <input
          type="text"
          placeholder="Filter by Skill"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Job Title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <button onClick={applyFilter}>Apply Filter</button>
        <button onClick={resetFilter}>Reset Filter</button>
      </div>
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h2>{job.title}</h2>
          <p>Position: {job.position}</p>
          <p>Skills: {job.skills}</p>
          <button onClick={() => toggleExpandJob(job.id)}>
            {job.expanded ? 'Collapse' : 'Expand'}
          </button>
          <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
          {job.expanded && (
            <div className="expanded-details">
              <p>Job Type: {job.jobType}</p>
              <p>Description: {job.description}</p>
              <p>Project Length: {job.projectLength}</p>
              <p>Payment Min: {job.paymentMin}</p>
              <p>Payment Max: {job.paymentMax}</p>
              <p>Working Hours: {job.workingHours}</p>
              <p>Experienced In: {job.experiencedIn}</p>
              <p>For At Least: {job.forAtLeast}</p>
              {/* Display the job image if available */}
              {job.jobImageURL && (
                <img src={job.jobImageURL} alt="Job" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobListPage;
