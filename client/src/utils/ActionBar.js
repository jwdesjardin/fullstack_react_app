import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import axios from 'axios';

const ActionBar = ({ course, history }) => {
	const { authUser, userPassword } = useContext(AuthContext);

	const onDeleteClick = async e => {
		const credentials = btoa(authUser.emailAddress + ':' + userPassword);
		const basicAuth = 'Basic ' + credentials;

		try {
			const response = await axios.delete(`http://localhost:5000/api/courses/${course.id}`, {
				headers: {
					Authorization: basicAuth
				}
			});

			if (response.status === 204) {
				history.push('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='actions--bar'>
			<div className='bounds'>
				<div className='grid-100'>
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
