import React from 'react';

function Experience({ handleChange, jobInfo }) {
  return (
    <div>
      <div className="section-title">Experience</div>
      <div>
        <p>Experienced in</p>
        <input
          type="text"
          name="experiencedIn"
          onChange={handleChange}
          value={jobInfo.experiencedIn}
        />
        <p>For at least</p>
        <input
          type="text"
          name="forAtLeast"
          onChange={handleChange}
          value={jobInfo.forAtLeast}
        />
      </div>
    </div>
  );
}

export default Experience;
