import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import ActionBar from '../utils/ActionBar';

const CourseDetail = props => {
	const [ course, setCourse ] = useState({});
	const id = props.match.params.id;

	useEffect(
		() => {
			(async () => {
				try {
					const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
					if (data) {
						setCourse(data);
					}
				} catch (error) {
					if (error.response.status === 404) {
						props.history.push('/notfound');
					} else {
						props.history.push('/error');
					}
				}
			})();
		},
		[ id ]
	);

	const estimatedTimeDisplay = course.estimatedTime || '';

	return (
		<div>
			<ActionBar course={course} />
			<div className='bounds course--detail'>
				<div className='grid-66'>
					<div className='course--header'>
						<h4 className='course--label'>Course</h4>
						<h3 className='course--title'>{course.title}</h3>
						{/* <p>By {course.user.firstName + ' ' + course.user.lastName}</p> */}
					</div>
					<div className='course--description'>
						<ReactMarkdown source={course.description} />
					</div>
				</div>
				<div className='grid-25 grid-right'>
					<div className='course--stats'>
						<ul className='course--stats--list'>
							<li className='course--stats--list--item'>
								<h4>Estimated Time</h4>
								<h3>{estimatedTimeDisplay}</h3>
							</li>
							<li className='course--stats--list--item'>
								<h4>Materials Needed</h4>
								<ReactMarkdown source={course.materialsNeeded} />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDetail;
