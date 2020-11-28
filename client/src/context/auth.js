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

  const getUser = async (email, password) => {
    const credentials = btoa(email + ':' + password);
    const basicAuth = 'Basic ' + credentials;
    const user = await axios.get('http://localhost:5000/api/users',  {
      headers: {
        Authorization: basicAuth
      }
    }).then(response => {
        if (response.status === 200) {
            console.log('successful response', response.data);
            return response.data;
          }
          else if (response.status === 401) {
            return null;
          }
          else {
            throw new Error();
          }
    })
    .catch(error => {
        throw error;
    })
    return user;
  }
  // const getCourse = async (id) => {
    
  //   const course = await axios.get(`http://localhost:5000/api/courses/${id}`)
  //   .then(response => {
  //       if (response.status === 200) {
  //           console.log(`SUCCESSFULLY got course ${id}:`, response.data);
  //           return response.data;
  //         }
  //         else if (response.status === 404) {
  //           return null;
  //         }
  //         else {
  //           throw new Error();
  //         }
  //   })
  //   .catch(error => {
  //       throw error;
  //   })
  //   return course;
  // }


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

  const signInUser = async (email, password) => {
     // GET REQUEST /USERS
     console.log('Sign in initiated.....');
     const user = await getUser(email, password);
     
    
     console.log('SIGN ING USER', user);
     if (user !== null) {
       console.log('SETTING USER');
       //SET STATE
        setAuthUser(user);
        setUserPassword(password);

    //    //SET A COOKIE 
    //    const cookieOptions = {
    //      expires: 1 // 1 day
    //    };
    //    Cookies.set('authenticatedUser', JSON.stringify(user), {cookieOptions});
 
     }
     
     return user;
  
  }

  const signOutUser = () => {
    setAuthUser(null);
    setUserPassword('');
    // Cookies.remove('authenticatedUser');
  }

  const getCourses = () => {
    axios.get('http://localhost:5000/api/courses')
    .then(data => {
      setCourses(data.data);
      return (data.data)
    })
    .catch(err => console.log(err));
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



