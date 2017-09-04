import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Dashboard = ({ data }) => (
  <div className="container">
    <h2>Welcome, {data.name}!</h2>
    <p>Your email is {data.email}</p>
    { data.referrer ? (<p>You were referred by {data.referrer}</p>) :
                           (<p>You weren't referred by another user.</p>)}    
    { data.referrals_count > 0 ? (<p>You have {data.referrals_count} registered referrals: {data.referrals}</p>) :
                           (<p>You have no registered referrals.</p>)}

  </div>
);

export default Dashboard;