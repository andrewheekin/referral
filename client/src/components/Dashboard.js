import React, { PropTypes } from 'react';


const Dashboard = ({ secretData }) => (
  <div className="container">
    <h1>An authenticated page</h1>
    {secretData && <p>{secretData}</p>}
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
