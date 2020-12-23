import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { authUser } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={props =>
				authUser !== null ? (
					<Component {...props} {...rest} />
				) : (
					<Redirect
						to={{
							pathname: '/signin',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
};

export default PrivateRoute;
