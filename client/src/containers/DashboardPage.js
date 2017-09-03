import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard';


class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
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
          data: xhr.response  // change what is passed here to include the html template...
        });
      }
    });
    xhr.send();
  }

  render() {
    return (<Dashboard data={this.state.data} />);
  }
}

export default DashboardPage;
