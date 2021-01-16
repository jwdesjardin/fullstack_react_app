import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = ({ history }) => {
	const [ courses, setCourses ] = useState([]);

	useEffect(
		() => {
			(async () => {
				try {
					// get all courses data from api/courses; setCourses with data
					const { data } = await axios.get('/api/courses');
					setCourses(data);
					// this should always work; any error coming back is handled as a server error
				} catch (error) {
					history.push('/error');
				}
			})();
		},
		// repeat on history change
		[ history ]
	);

	return (
		<div className='bounds'>
			{/* course list */}
			{courses &&
				courses.map(course => (
					<div key={course.id} className='grid-33'>
						<Link className='course--module course--link' to={`/courses/${course.id}`}>
							<h4 className='course--label'>Course</h4>
							<h3 className='course--title'>{course.title}</h3>
							<h4 className='course--label'>
								by:{' '}
								{course.user && `${course.user.firstName} ${course.user.lastName}`}
							</h4>
						</Link>
					</div>
				))}
			{/* new course button */}
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
