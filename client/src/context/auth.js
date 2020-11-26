import React, { Component,  setState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export class Provider extends Component {

  state = {
    authorizedUser: {}
  };

  signIn = (email, password) => {
    const credentials = btoa(email + ':' + password);
    const basicAuth = 'Basic ' + credentials;
    axios.get('http://localhost:5000/api/users',  {
      headers: {
        Authorization: basicAuth
      }
    })
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1){
          setState( {authorizedUser: res.data});
          console.log('Authenticated');
          this.props.history.push('/courses');
        } else {
          console.log('auth failed');
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <AuthContext.Provider value={{
        authorizedUser: this.state.authorizedUser,
        actions: {
          signIn: this.SignIn
        }
      }}>
        { this.props.children }
      </AuthContext.Provider>
    );
  }  
}

export const Consumer = AuthContext.Consumer;

