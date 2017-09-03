import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const ReferForm = ({ onSubmit, onChange, user }) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Refer a user:</h2>

      <div className="field-line">
        <TextField
          floatingLabelText="Referral Email"
          name="referralEmail"
          onChange={onChange}
          value={user.referralEmail}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Refer user" primary />
      </div>
    </form>
  </div>
);

export default ReferForm;

