import React, { useState } from 'react';
import JobDescription from '../components/JobDescription';
import ProjectConditions from '../components/ProjectConditions';
import Experience from '../components/Experience';
import { createJobInFirebase, uploadImageAndGetURL } from '../Utils/firebase';

import '../components/FindJob.css';

const FindJobPage = () => {
  const [jobType, setJobType] = useState('');
  const [selectedJobImage, setSelectedJobImage] = useState(null);
  const [jobInfo, setJobInfo] = useState({
    jobType: '',
    title: '',
    description: '',
    skills: '',
    projectLength: '',
    paymentMin: '',
    paymentMax: '',
    workingHours: '',
    experiencedIn: '',
    forAtLeast: '',
  });
  const [setJobImageURL] = useState('');

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setSelectedJobImage(file);

    try {
      const downloadURL = await uploadImageAndGetURL(file);
      setJobImageURL(downloadURL);
      console.log('Image uploaded successfully. Download URL:', downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let jobImage = '';
      if (selectedJobImage) {
        jobImage = await uploadImageAndGetURL(selectedJobImage);
      }

      const job = {
        jobType,
        title: jobInfo.title,
        description: jobInfo.description,
        skills: jobInfo.skills,
        projectLength: jobInfo.projectLength,
        paymentMin: jobInfo.paymentMin,
        paymentMax: jobInfo.paymentMax,
        workingHours: jobInfo.workingHours,
        experiencedIn: jobInfo.experiencedIn,
        forAtLeast: jobInfo.forAtLeast,
        jobImageURL: jobImage,
      };

      await createJobInFirebase(job);

      setJobType('');
      setJobInfo({ ...jobInfo, jobType: '' });
      setSelectedJobImage(null);
      setJobImageURL('');

      console.log('Job created successfully');
    } catch (error) {
      console.log('Error creating job', error.message);
    }
  };

  return (
    <div className="App">
      <div className="section-title">New Job</div>
      <div>
        <p>Select Job Type:</p>
        <button onClick={() => setJobType('freelance')}>Freelance</button>
        <button onClick={() => setJobType('employment')}>Employment</button>
      </div>
      <br />
      <JobDescription handleChange={handleChange} jobInfo={jobInfo} />
      <ProjectConditions handleChange={handleChange} jobInfo={jobInfo} />
      {jobType === 'employment' ? <Experience handleChange={handleChange} jobInfo={jobInfo} /> : null}
      <div>
        <p>Upload Job Image:</p>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default FindJobPage;
