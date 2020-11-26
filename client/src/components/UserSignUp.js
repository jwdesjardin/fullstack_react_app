import { Link } from 'react-router-dom';

const UserSignUp = (props) => {
    const cancelHandler = (event) => {
        event.preventDefault();
        // location.href='/';
    }

    const signUpHandler = () => {
        //handle post request to sign up user
    }


    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                    <form>
                        <div><input id="firstName" name="firstName" type="text"  placeholder="First Name" defaultValue /></div>
                        <div><input id="lastName" name="lastName" type="text"  placeholder="Last Name" defaultValue /></div>
                        <div><input id="emailAddress" name="emailAddress" type="text"  placeholder="Email Address" defaultValue /></div>
                        <div><input id="password" name="password" type="password"  placeholder="Password" defaultValue /></div>
                        <div><input id="confirmPassword" name="confirmPassword" type="password"  placeholder="Confirm Password" defaultValue /></div>
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