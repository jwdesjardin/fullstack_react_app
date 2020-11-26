// import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';

import './global.css';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';


function App(props) {
  
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Courses} />
        <Route exact path='/courses/create' component={CreateCourse} />
        <Route exact path='/courses/:id' component={CourseDetail} />
        <Route exact path='/courses/:id/update' component={UpdateCourse} />
        <Route exact path='/signin' component={UserSignIn}  />
        <Route exact path='/signup' component={UserSignUp} />
        <Route exact path='/signout' component={UserSignOut} />
        <Route component={NotFound} />
      </Switch>
    </Router>
    );
}

export default App;
