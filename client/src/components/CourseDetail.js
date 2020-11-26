import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';





const ActionBar = (props) => {
    
    const onDeleteClick = () => {
        axios.delete(`http://localhost:5000/api/courses/${props.id}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
    }

    return (
        <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100"><span><Link className="button" to={`/courses/${props.id}/update`}>Update Course</Link><Link className="button" onClick={onDeleteClick} to="/">Delete Course</Link></span><Link
                    className="button button-secondary" to="/">Return to List</Link></div>
            </div>
        </div>
    );
}

const CourseDetail = (props) => {
    const [course, setCourse] = useState({});
    const id = props.match.params.id;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(data => {
          setCourse(data.data);
          console.log(data.data)
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
    },[id]);

    
    const materialDisplay = course.materialsNeeded ? course.materialsNeeded.forEach(material => <li>{material}</li>) : '';
    const estimatedTimeDisplay = course.estimatedTime || '';
    


    return (
        <div>
            <ActionBar id={course.id} />
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        {/* <p>By {course.user.firstName + ' ' + course.user.lastName}</p> */}
                    </div>
                    <div className="course--description">
                        {course.description}
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{estimatedTimeDisplay}</h3>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ul>
                                    {materialDisplay}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </div>
    );
}

export default CourseDetail;