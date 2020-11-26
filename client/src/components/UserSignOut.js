import {Redirect} from 'react-router-dom';
import {useEffect} from 'react'; 

const UserSignOut = () => {
    useEffect(() => {
        //log out user
    }, [] )

    return (
        <Redirect to="/courses" />
    );
}

export default UserSignOut;