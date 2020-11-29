import React, { useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
import { Redirect, Route } from 'react-router-dom';



export const AuthContext = React.createContext();

export const Provider = (props) => {

  const [authUser, setAuthUser] = useState(null);
  const [userPassword, setUserPassword] = useState('');
  const [courses, setCourses] = useState([]);

  function PrivateRoute({ component: Component , ...rest }) {
    
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

  const signInUser = async (email, password) => {
  
    const user = await getUser(email, password);
    
    if (user !== null) {
       setAuthUser(user);
       setUserPassword(password);
    }
    
    return user;
 }

  const signOutUser = () => {
    setAuthUser(null);
    setUserPassword('');
  }

  const getUser = async (email, password) => {
    const credentials = btoa(email + ':' + password);
    const basicAuth = 'Basic ' + credentials;

    try{
      const response = await axios.get('http://localhost:5000/api/users',  {
        headers: {
          Authorization: basicAuth
        }});
      
      if (response.status === 200) {
          return response.data;
      }
      else if (response.status === 401) {
        const error = new Error('User Not Found');
        error.status = 401;
        throw error;
      }
    }
    catch(error) {
        throw error;
    }

    // axios.get('http://localhost:5000/api/users',  {
    //   headers: {
    //     Authorization: basicAuth
    //   }
    // }).then(response => {
    //     if (response.status === 200) {
    //         return response.data;
    //       }
    //       else if (response.status === 401) {
    //         return null;
    //       }
    //       else {
    //         throw new Error();
    //       }
    // })
    // .catch(error => {
    //     throw error;
    // })



    // return user;
  }

  const createUser = async (body) => {
    
    axios.post('http://localhost:5000/api/users', body)
    .then(response => {
      if (response.status === 201) {
        return response.text;
      }
      else if (response.status === 400) {
        return null;
      }
      else {
        throw new Error();
      }
    })
    .catch(err => console.log(err));
  }



  //COURSES


  const getCourses = () => {
    axios.get('http://localhost:5000/api/courses')
    .then(data => {
      setCourses(data.data);
      return (data.data)
    })
    .catch(err => console.log(err));
  }


  const createCourse = async (body, email, password) => {
    
      const credentials = btoa(email + ':' + password);
      const basicAuth = 'Basic ' + credentials;
      try {
      const res = await axios.post('http://localhost:5000/api/courses', body, {
        headers: {
          Authorization: basicAuth
        }});
      if(res.status === 201){
        return res.data;
      } else {
        throw new Error('Unable to create course');
      }
    } catch (error) {
      throw error;
    }
    
  }





  const deleteCourse = (course, email, password) => {
      const credentials = btoa(email + ':' + password);
      const basicAuth = 'Basic ' + credentials;
      axios.delete(`http://localhost:5000/api/courses/${course.id}`, {
        headers: {
          Authorization: basicAuth
        }})
      .then(res => {
        console.log('response: ', res.status);
      })
      .catch(err => console.log(err));
    
    
  }

  const updateCourse = (course, body, userId, email, password) => {
    if (course.userId === userId) {
      console.log('course.userId === userId ', course.userId, userId);
      const credentials = btoa(email + ':' + password);
      const basicAuth = 'Basic ' + credentials;
      axios.put(`http://localhost:5000/api/courses/${course.id}`, body, {
        headers: {
          Authorization: basicAuth
        }})
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err));
    }
    console.log('course.userId !== userId ', course.userId, userId);
  }

  

  const value = {
    authUser,
    userPassword,
    courses,
    PrivateRoute,
    actions: {
      signIn: signInUser,
      signOut: signOutUser,
      createCourse,
      createUser,
      updateCourse,
      deleteCourse,
      getCourses
    }
  }
  
    return (
      <AuthContext.Provider value={value}>
        { props.children }
      </AuthContext.Provider>
    ); 
}



