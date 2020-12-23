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
		const credentials = btoa(email + ':' + password);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};
		try {
			const response = await axios.get('http://localhost:5000/api/users', config);

			if (response.status === 200) {
				setAuthUser(response.data);
				setUserPassword(password);
				localStorage.setItem('user', JSON.stringify(response.data));
				localStorage.setItem('password', JSON.stringify(password));
			}
		} catch (error) {
			return error.response;
		}
	};

	const signOut = () => {
		setAuthUser(null);
		setUserPassword('');
		localStorage.removeItem('user');
		localStorage.removeItem('password');
	};

	const createUser = async body => {
		try {
			await axios.post('http://localhost:5000/api/users', body);
		} catch (error) {
			if (error.response.status === 400) {
				return (
					error.response.data.errors || [ error.response.data.message ] || [
						error.message
					]
				);
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
