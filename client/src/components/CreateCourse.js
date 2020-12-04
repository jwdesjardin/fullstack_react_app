
import { useRef, useContext, useState } from 'react';
import { AuthContext } from '../context/auth';


const CreateCourse = (props) => {

    const { authUser, userPassword, actions } = useContext(AuthContext);

    const [ errors, setErrors ] = useState([]);

    const titleInput = useRef('');
    const descInput = useRef('');
    const estTimeInput = useRef('');
    const materialsInput = useRef('');

    //ValidateInputs
    const validateInputs = () => { 
        setErrors([]);
        if (titleInput.current.value === ''){
            //trigger show the li message
            setErrors(currentErrors => [...currentErrors, "Please include a title"]);
        } 
        if (descInput.current.value === ''){
            //trigger show the li message
            setErrors(currentErrors => [...currentErrors, "Please include a description"]);
        }
    }

    const cancelHandler = (event) => {
        event.preventDefault();
        props.history.goBack();
    }

    const createCourseHandler = async (event) => {
        event.preventDefault();
        const body = {
            "title": titleInput.current.value,
            "description": descInput.current.value,
            "userId": authUser.id
        };
        validateInputs();

        estTimeInput.current.value !== '' ? body.estimatedTime = estTimeInput.current.value : body.estimatedTime = null;
        materialsInput.current.value !== '' ? body.materialsNeeded = materialsInput.current.value : body.materialsNeeded = null;
         // body.estimatedTime = estTimeInput.current.value !== '' ? estTimeInput.current.value : null;
        // body.materialsNeeded = materialsInput.current.value !== '' ? materialsInput.current.value : null;

        try {
            const response = await actions.createCourse(body, authUser.emailAddress, userPassword);
            if (response === 'success'){
                props.history.push('/');
            } 
        } catch (error) {
            console.log(error);
        }
        
       
    }


const displayErrors = errors.length > 0 ? 
        <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
                <ul>
                    {errors.map(error => <li>{error}</li>)}
                </ul>
            </div>
        </div>
        : "";



    return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
            {displayErrors}
            <form>
                <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." ref={titleInput}  /></div>
                    <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                    <div><textarea id="description" name="description"  placeholder="Course description..." ref={descInput}  /></div>
                </div>
                </div>
                <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" ref={estTimeInput}  /></div>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded"  placeholder="List materials..." ref={materialsInput}  /></div>
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