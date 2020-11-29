import { Link } from 'react-router-dom';
import { useRef, useContext } from 'react';
import { AuthContext } from '../context/auth'

const UserSignIn = (props) => {

    const { actions } = useContext(AuthContext);

    const emailInput = useRef('');
    const passwordInput = useRef('');

    const signInHandler = async (event) => {
        event.preventDefault();
        const response = await actions.signIn(emailInput.current.value, passwordInput.current.value);
        if (response === 'success'){
            const loc = props.location.state ? props.location.state.from : '/';
            props.history.push(loc);
        } else {
            alert('Credentials not found');
        }
    }

    const cancelHandler = (event) => {
        event.preventDefault();
        props.history.goBack();
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