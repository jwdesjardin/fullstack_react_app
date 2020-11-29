// import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import { useContext } from 'react';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import { AuthContext } from './context/auth';

import './global.css';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import Authenticated from './components/Authenticated';


const App = () => {

  const { authUser } = useContext(AuthContext);

  const PrivateRoute = ({ component: Component , ...rest }) => {
    
    return (
      <Route
        {...rest}
        render={(props) =>
          authUser !== null ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Courses} />
        <PrivateRoute exact path='/courses/create' component={CreateCourse} />
        <Route exact path='/courses/:id' component={CourseDetail} />
        <PrivateRoute exact path='/courses/:id/update' component={UpdateCourse} />
        <Route exact path='/signin' component={UserSignIn}  />
        <Route exact path='/signup' component={UserSignUp} />
        <Route exact path='/signout' component={UserSignOut} />
        <Route exact path='/authenticated' component={Authenticated} />
        <Route component={NotFound} />
      </Switch>
    </Router>
    );
}

export default App;
