import { Link } from 'react-router-dom';
import {useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/auth';

const UserSignUp = (props) => {
    const { actions } = useContext(AuthContext);
    const [ errors, setErrors ] = useState([]);
     
    const firstNameInput = useRef('');
    const lastNameInput = useRef('');
    const emailInput = useRef('');
    const passwordInput = useRef('');
    const confirmPasswordInput = useRef('');

    //ValidateInputs
    const validateInputs = () => { 
        setErrors([]);
        if (firstNameInput.current.value === ''){
            //trigger show the li message
            setErrors(currentErrors => [...currentErrors, "Please include your first name"]);
        } 
        if (lastNameInput.current.value === ''){
            //trigger show the li message
            setErrors(currentErrors => [...currentErrors, "Please include your last name"]);
        }
        if (emailInput.current.value === ''){
            //trigger show the li message
            setErrors(currentErrors => [...currentErrors, "Please include your email"]);
        }
        if (passwordInput.current.value === ''){
            //trigger show the li message
            setErrors(currentErrors => [...currentErrors, "Please include a password"]);
        }
        if (passwordInput.current.value !== confirmPasswordInput.current.value){
            //trigger show the li message
            setErrors(currentErrors => [...currentErrors, "Please make sure passwords match"]);
        }
    }



    const cancelHandler = (event) => {
        event.preventDefault();
        props.history.goBack();
    }

    const signUpHandler = async (event) => {
        event.preventDefault();
        const body = {
            "firstName": firstNameInput.current.value,
            "lastName": lastNameInput.current.value,
            "emailAddress": emailInput.current.value,
            "password": confirmPasswordInput.current.value
        };
        // validateInputs();

        try {
            const response =  await actions.createUser(body);
            if (response === null) {
                await actions.signIn(emailInput.current.value, confirmPasswordInput.current.value);
                props.history.push('/');
            } else {
                console.log(response);
                setErrors([...response])
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
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </div>
        </div>
        : "";

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                    {displayErrors}
                    <form>
                        <div><input id="firstName" name="firstName" type="text"  placeholder="First Name" ref={firstNameInput} /></div>
                        <div><input id="lastName" name="lastName" type="text"  placeholder="Last Name" ref={lastNameInput} /></div>
                        <div><input id="emailAddress" name="emailAddress" type="text"  placeholder="Email Address" ref={emailInput} /></div>
                        <div><input id="password" name="password" type="password"  placeholder="Password" ref={passwordInput} /></div>
                        <div><input id="confirmPassword" name="confirmPassword" type="password"  placeholder="Confirm Password" ref={confirmPasswordInput} /></div>
                        <div className="grid-100 pad-bottom"><button className="button" onClick={signUpHandler} type="submit">Sign Up</button><button className="button button-secondary" onClick={cancelHandler}>Cancel</button></div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
            </div>
        </div>
    );
}

export default UserSignUp;