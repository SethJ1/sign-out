import React from 'react';

function JobDescription({ handleChange, jobInfo }) {
  return (
    <div>
      <div className="section-title">Describe your job</div>
      <div>
        <p>Title/Position</p>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={jobInfo.title}
        />
      </div>
      <div>
        <p>Job description</p>
        <textarea
          name="description"
          onChange={handleChange}
          value={jobInfo.description}
        />
      </div>
      <div>
        <p>Skills</p>
        <input
          type="text"
          name="skills"
          onChange={handleChange}
          value={jobInfo.skills}
        />
        <p>Developers will find your job based on the skills you added here.</p>
      </div>
      <br />
    </div>
  );
}

export default JobDescription;
