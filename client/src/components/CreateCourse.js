import axios from 'axios';

const ValidationErrors = () => {
    return (
        <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
            <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
            </ul>
            </div>
        </div>
    );
}
const CreateCourse = (props) => {

    const cancelHandler = (event) => {
        event.preventDefault();
        props.history.goBack();
    }

    const createCourseHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/courses', {
            "title": "Second Course",
            "description": "My course description",
            "userId": 1
        })
            .then(res => {
              console.log(res)
            })
            .catch(err => console.log(err));
        //handle sending post request to api/courses
    }

    return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
            <ValidationErrors />
            <form>
                <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue /></div>
                    <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                    <div><textarea id="description" name="description"  placeholder="Course description..." defaultValue={""} /></div>
                </div>
                </div>
                <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue /></div>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded"  placeholder="List materials..." defaultValue={""} /></div>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" onClick={createCourseHandler} type="submit">Create Course</button><button className="button button-secondary" onClick={cancelHandler}>Cancel</button></div>
            </form>
            </div>
        </div>
    );
}

export default CreateCourse;