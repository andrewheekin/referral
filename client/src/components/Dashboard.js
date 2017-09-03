import React, { PropTypes } from 'react';

const Dashboard = ({ secretData }) => (
  <div className="container">
    <h1>An authenticated page</h1>
    <p>Yo, {secretData.message}</p>
  </div>
);

export default Dashboard;
