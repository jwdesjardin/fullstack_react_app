import { Link } from 'react-router-dom';
import { useRef } from 'react';

const UserSignIn = (props) => {

    const emailInput = useRef();
    const passwordInput = useRef();

    const cancelHandler = (event) => {
        event.preventDefault();
        props.history.goBack();
    }

    const signInHandler = (event) => {
        //handle sign in user
        event.preventDefault();
        props.signIn(emailInput.value, passwordInput.value);

    }
    
    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <form>
                        <div><input id="emailAddress" name="emailAddress" type="text"  placeholder="Email Address" ref={emailInput} defaultValue /></div>
                        <div><input id="password" name="password" type="password"  placeholder="Password" ref={passwordInput} defaultValue /></div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={signInHandler}>Sign In</button><button className="button button-secondary" onClick={cancelHandler}>Cancel</button></div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
        </div>
    );
}

export default UserSignIn;