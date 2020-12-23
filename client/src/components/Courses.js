import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = ({ history }) => {
	const [ courses, setCourses ] = useState([]);

	useEffect(
		() => {
			// get courses
			(async () => {
				try {
					const { data } = await axios.get('http://localhost:5000/api/courses');
					console.log(data);
					setCourses(data);
				} catch (error) {
					console.log(error);
					history.push('/error');
				}
			})();
		},
		[ history ]
	);

	return (
		<div className='bounds'>
			{courses &&
				courses.map(course => (
					<div key={course.id} className='grid-33'>
						<Link className='course--module course--link' to={`/courses/${course.id}`}>
							<h4 className='course--label'>Course</h4>
							<h3 className='course--title'>{course.title}</h3>
							<h4 className='course--label'>
								authored by: {`${course.user.firstName} ${course.user.lastName}`}
							</h4>
						</Link>
					</div>
				))}
			<div className='grid-33'>
				<Link className='course--module course--add--module' to='/courses/create'>
					<h3 className='course--add--title'>
						<svg
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
							x='0px'
							y='0px'
							viewBox='0 0 13 13'
							className='add'
						>
							<polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 ' />
						</svg>New Course
					</h3>
				</Link>
			</div>
		</div>
	);
};

export default Courses;
