
import {useEffect, useContext } from 'react'; 
import { AuthContext } from '../context/auth';

const UserSignOut = (props) => {
    const {actions} = useContext(AuthContext);

    useEffect(() => {
        //log out user
        console.log('LOGGING OUT USER');
        actions.signOut();
        props.history.push('/');
        // eslint-disable-next-line
    }, [] )

    
    return(null);
}

export default UserSignOut;