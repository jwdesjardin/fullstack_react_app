import React, { useState } from 'react';
import axios from 'axios';



export const AuthContext = React.createContext();

export const Provider = (props) => {

  const [authUser, setAuthUser] = useState(null);
  const [userPassword, setUserPassword] = useState('');


  const [courses, setCourses] = useState([]);

  
  const signInUser = async (email, password) => {

    const credentials = btoa(email + ':' + password);
    const basicAuth = 'Basic ' + credentials;

    try{
      const response = await axios.get('http://localhost:5000/api/users',  {
        headers: {
          Authorization: basicAuth
        }});
      
      if (response.status === 200) {
        setAuthUser(response.data);
        setUserPassword(password);
        return 'success';
      }
    }
    catch(error) {
        console.log(error);
    }
      
 }


  const signOutUser = () => {
    setAuthUser(null);
    setUserPassword('');
  }


  const createUser = async (body) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', body);
      if (response.status === 201) {
        return null;
      }
      
    } catch (error) {
        return (error.response.data.errors);
      }
  }



  //COURSES


  const getCourses = async () => {
    try {
      const data = await axios.get('http://localhost:5000/api/courses')
      setCourses(data.data);
      return 'success';
    } catch (error) {
      console.log(error);
    }

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
        await getCourses();
        return 'success';
      } 

    } catch (error) {
      console.log(error);
    }
    
  }

  const deleteCourse = async (course, email, password) => {
      const credentials = btoa(email + ':' + password);
      const basicAuth = 'Basic ' + credentials;

      try {
        const response = await axios.delete(`http://localhost:5000/api/courses/${course.id}`, {
          headers: {
            Authorization: basicAuth
          }})

          if (response.status === 204){
            await getCourses();
            return 'success';
          }
      } catch (error) {
        console.log(error);
      }
      
  }

  const updateCourse = async (course, body, email, password) => {
    
      const credentials = btoa(email + ':' + password);
      const basicAuth = 'Basic ' + credentials;

      try {
        const response = await axios.put(`http://localhost:5000/api/courses/${course.id}`, body, {
        headers: {
          Authorization: basicAuth
        }});

        console.log(response.status);

        if (response.status === 204){
          await getCourses();
          return 'success';
        }
      } catch (error) {
        console.log(error);
      }
    
  }

  const value = {
    authUser,
    userPassword,
    courses,
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



