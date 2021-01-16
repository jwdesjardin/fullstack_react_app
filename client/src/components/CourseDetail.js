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
					// get data from api/courses/id; setCourse with data
					const { data } = await axios.get(`/api/courses/${id}`);
					if (data) {
						setCourse(data);
					}
					//handle 404 error passed back from api
				} catch (error) {
					if (error.response.status === 404) {
						props.history.push('/notfound');
					} else {
						props.history.push('/error');
					}
				}
			})();
		},
		// reapeat if id from props changes
		[ id, props.history ]
	);

	return (
		<div>
			<ActionBar course={course} history={props.history} />
			{/* only display the details if we have a course and user in state */}
			{course &&
			course.user && (
				<div className='bounds course--detail'>
					<div className='grid-66'>
						<div className='course--header'>
							<h4 className='course--label'>Course</h4>
							<h3 className='course--title'>{course.title}</h3>
							<p>By {course.user.firstName + ' ' + course.user.lastName}</p>
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
									<h3>{course.estimatedTime}</h3>
								</li>
								<li className='course--stats--list--item'>
									<h4>Materials Needed</h4>
									<ReactMarkdown source={course.materialsNeeded} />
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CourseDetail;
