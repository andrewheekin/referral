import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard';
import ReferForm from '../components/ReferForm';


class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      errors: {},
      successMessage: '',
      user: {
        referralEmail: ''
      }      
    };
    this.processForm = this.processForm.bind(this);  
    this.changeUser = this.changeUser.bind(this);      
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          data: xhr.response // change what is passed here to include the html template...
        });
      }
    });
    xhr.send();
  }

  processForm(event) {
    event.preventDefault();

    const referralEmail = encodeURIComponent(this.state.user.referralEmail);    
    const formData = `referralEmail=${referralEmail}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/refer');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);    
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          successMessage: xhr.response.successMessage
        });

        this.setState({
          errors: {}
        });

      } else {

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }  


  render() {
    return (
      <div>
        <Dashboard data={this.state.data} />
        <ReferForm
          onSubmit={this.processForm}
          onChange={this.changeUser} 
          errors={this.state.errors}
          successMessage={this.state.successMessage}                         
          user={this.state.user}
        />
      </div>
    );
  }
}

export default DashboardPage;
