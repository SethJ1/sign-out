import React from 'react';

function ProjectConditions({ handleChange, jobInfo }) {
  return (
    <div>
      <div className="section-title">Project Conditions</div>
      <div>
        <p>Project length</p>
        <input
          type="text"
          name="projectLength"
          onChange={handleChange}
          value={jobInfo.projectLength}
        />
      </div>
      <div>
        <p>Payment</p>
        <input
          type="text"
          placeholder="Min"
          name="paymentMin"
          onChange={handleChange}
          value={jobInfo.paymentMin}
        />
        <input
          type="text"
          placeholder="Max"
          name="paymentMax"
          onChange={handleChange}
          value={jobInfo.paymentMax}
        />
      </div>
      <div>
        <p>Working hours</p>
        <input
          type="text"
          name="workingHours"
          onChange={handleChange}
          value={jobInfo.workingHours}
        />
      </div>
    </div>
  );
}

export default ProjectConditions;
