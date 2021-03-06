import React, { useState } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export const Provider = props => {
	const [ authUser, setAuthUser ] = useState(
		localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
	);

	const [ userPassword, setUserPassword ] = useState(
		localStorage.getItem('password') ? JSON.parse(localStorage.getItem('password')) : null
	);

	const signIn = async (email, password) => {
		// create the config object for authorization
		const credentials = btoa(email + ':' + password);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		try {
			// sumbit request with auth and get user data from api
			const response = await axios.get(
				'https://courses-final-react.herokuapp.com/api/users',
				config
			);

			// if we get a user set the user to state and localStorage
			if (response.status === 200) {
				setAuthUser(response.data);
				setUserPassword(password);
				localStorage.setItem('user', JSON.stringify(response.data));
				localStorage.setItem('password', JSON.stringify(password));
			}
			// if error is unauthorized respond with error data
		} catch (error) {
			if (error.response.status === 401) {
				return error.response;
			} else {
				throw error;
			}
		}
	};

	const signOut = () => {
		// removes user and password from localstorage and state
		setAuthUser(null);
		setUserPassword('');
		localStorage.removeItem('user');
		localStorage.removeItem('password');
	};

	const createUser = async body => {
		try {
			// post body to api
			await axios.post('/api/users', body);
		} catch (error) {
			// if error is bad request send errors; if reused email send message
			if (error.response.status === 400) {
				return (
					error.response.data.errors || [ error.response.data.message ] || [
						error.message
					]
				);
			} else {
				throw error;
			}
		}
	};

	const value = {
		authUser,
		userPassword,

		actions: {
			signIn,
			signOut,
			createUser
		}
	};

	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
