import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import axios from 'axios';

const ActionBar = ({ course, history }) => {
	const { authUser, userPassword } = useContext(AuthContext);

	const onDeleteClick = async e => {
		// create the config object for authorization
		const credentials = btoa(authUser.emailAddress + ':' + userPassword);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		try {
			// send delete request with auth to api
			const response = await axios.delete(
				`http://localhost:5000/api/courses/${course.id}`,
				config
			);

			// if response is 204 redirect to courses
			if (response.status === 204) {
				history.push('/');
			}
			// if any error then show server error
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='actions--bar'>
			<div className='bounds'>
				<div className='grid-100'>
					{/* if user is lgged in and they own this course show update and delete */}
					{authUser &&
					authUser.id === course.userId && (
						<span>
							<Link className='button' to={`/courses/${course.id}/update`}>
								Update Course
							</Link>
							<Link className='button' onClick={onDeleteClick} to='/'>
								Delete Course
							</Link>
						</span>
					)}
					<Link className='button button-secondary' to='/'>
						Return to List
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ActionBar;
