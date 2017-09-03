import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const ReferForm = ({ onSubmit, onChange, errors, successMessage, user }) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Refer a user:</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}


      <div className="field-line">
        <TextField
          floatingLabelText="Referral Email"
          name="referralEmail"
          errorText={errors.email}
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

