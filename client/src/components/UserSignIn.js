import { Link } from 'react-router-dom';
import { useRef, useContext } from 'react';
import { AuthContext } from '../context/auth'

const UserSignIn = (props) => {

    const { actions } = useContext(AuthContext);

    const emailInput = useRef('email');
    const passwordInput = useRef('password');

    console.log(emailInput.current.value, passwordInput.current.value);

    const cancelHandler = (event) => {
        event.preventDefault();
        props.history.goBack();
    }

    const signInHandler = async (event) => {
        //handle sign in user
        event.preventDefault();
        await actions.signIn(emailInput.current.value, passwordInput.current.value);
        const loc = props.location.state ? props.location.state.from : '/';
        props.history.push(loc);
    }
    
    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <form>
                        <div><input id="emailAddress" name="emailAddress" type="text"  placeholder="Email Address" ref={emailInput} /></div>
                        <div><input id="password" name="password" type="password"  placeholder="Password" ref={passwordInput} /></div>
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