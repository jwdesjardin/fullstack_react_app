import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';

const UserSignIn = props => {
	const { actions } = useContext(AuthContext);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errors, setErrors ] = useState([]);

	const signInHandler = async event => {
		event.preventDefault();

		try {
			const response = await actions.signIn(email, password);
			if (response) {
				console.log(response.data);
				setErrors([ ...response.data ]);
			} else {
				const loc = props.location.state ? props.location.state.from : '/';
				props.history.push(loc);
			}
		} catch (error) {
			props.history.push('/error');
		}
	};

	const cancelHandler = event => {
		event.preventDefault();
		props.history.goBack();
	};

	return (
		<div className='bounds'>
			<div className='grid-33 centered signin'>
				<h1>Sign In</h1>
				<div>
					{errors.length > 0 && (
						<div>
							<h2 className='validation--errors--label'>{errors}</h2>
						</div>
					)}
					<form>
						<div>
							<input
								id='emailAddress'
								name='emailAddress'
								type='text'
								placeholder='Email Address'
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<input
								id='password'
								name='password'
								type='password'
								placeholder='Password'
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div className='grid-100 pad-bottom'>
							<button className='button' type='submit' onClick={signInHandler}>
								Sign In
							</button>
							<button className='button button-secondary' onClick={cancelHandler}>
								Cancel
							</button>
						</div>
					</form>
				</div>
				<p>&nbsp;</p>
				<p>
					Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!
				</p>
			</div>
		</div>
	);
};

export default UserSignIn;
