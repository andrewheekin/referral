import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Dashboard = ({ data }) => (
  <div className="container">
    <h2>Welcome, {data.name}!</h2>
    <p>Your email is {data.email}</p>
    <p>You were referred by {data.referrer}</p>
    { data.referrals_count > 0 ? (<p>You have {data.referrals_count} registered referrals: {data.referrals}</p>) :
                           (<p>You have no registered referrals.</p>)}    

  </div>
);

export default Dashboard;

    // <form action="/" onSubmit={onSubmit}>
    //   <div className="field-line">
    //     <TextField
    //       floatingLabelText="Refer an email"
    //       name="referralEmail"
    //       onChange={onChange}
    //       errorText={errors.password}
    //       value={user.refferalEmail}
    //     />
    //   </div>

    //   <div className="button-line">
    //     <RaisedButton type="submit" label="Create New Account" primary />
    //   </div>
    // </form>