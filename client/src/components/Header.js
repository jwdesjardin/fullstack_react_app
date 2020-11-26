import { NavLink, Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="bounds">
                <Link to='/'><h1 className="header--logo">Courses</h1></Link>
                <nav><NavLink className="signup" to="/signup">Sign Up</NavLink><NavLink className="signin" to="/signin">Sign In</NavLink></nav>
            </div>
        </div>
    );
}

export default Header;