import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Course = (props) => {
    return (
        <div className="grid-33">
            <Link className="course--module course--link" to={`/courses/${props.id}`} >
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{props.title}</h3>
            </Link>
        </div>
    );
}

const CreateCourse = () => {
    return (
    <div className="grid-33">
        <Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course</h3>
        </Link>
    </div>
    );
}

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
        .then(data => {
          setCourses(data.data);
          console.log(data.data)
        })
        .catch(err => console.log(err));
    },[]);

    let display;
    if(courses.length > 0) {
        display = courses.map(course => <Course title={course.title} key={course.id} id={course.id} />);
    }
    

    return (
        <div className="bounds">
            {courses.length > 0 ? display : '' }
            <CreateCourse />
        </div>
    );
}


export default Courses;