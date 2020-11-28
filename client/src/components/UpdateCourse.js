import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth';

const UpdateCourse = (props) => {

  const id = props.match.params.id;
  const [course, setCourse] = useState({});

  const { authUser, userPassword, actions } = useContext(AuthContext);
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
    .then(data => {
      setCourse(data.data);
      console.log('course successfully retrieved for update: ', data.data)
    })
    .catch(err => console.log(err));
  },[id]);

    

    const titleInput = useRef('');
    const descInput = useRef('');
    const estTimeInput = useRef('');
    const materialsInput = useRef('');


  const updateHandler = (event) => {
    event.preventDefault();
    const body = {
        "id": course.id,
        "title": titleInput.current.value,
        "description": descInput.current.value,
        "userId": authUser.id
    };
    estTimeInput.current.value !== '' ? body.estimatedTime = estTimeInput.current.value : body.estimatedTime = null;
    materialsInput.current.value !== '' ? body.materialsNeeded = materialsInput.current.value : body.materialsNeeded = null;
    console.log('prepped for update :', body);
    actions.updateCourse(course, body, authUser.id, authUser.emailAddress, userPassword);
  }

  const cancelHandler = (event) => {
    event.preventDefault();
    props.history.goBack();
  }

  

  return (
      <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <form>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." ref={titleInput} defaultValue={course.title} /></div>
              <p>By {authUser.firstName + ' ' + authUser.lastName}</p>
            </div>
            <div className="course--description">
              <div><textarea id="description" name="description"  placeholder="Course description..." ref={descInput} defaultValue={course.description} /></div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" ref={estTimeInput} defaultValue={course.estimatedTime} /></div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div><textarea id="materialsNeeded" name="materialsNeeded"  placeholder="List materials..." ref={materialsInput} defaultValue={course.materialsNeeded} /></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={updateHandler}>Update Course</button><button className="button button-secondary" onClick={cancelHandler}>Cancel</button></div>
        </form>
      </div>
    </div>

  );
}

export default UpdateCourse;