class Auth {
  // set token on login
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  // check logged in state true or false
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  // logout
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  // get the login token
  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;
