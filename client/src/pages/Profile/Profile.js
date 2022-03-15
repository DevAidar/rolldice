import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserData, updateUser } from '../../actions';

import ImageUpload from '../../components/ImageUpload/ImageUpload';

import profileImage from '../../images/questionMark.png';
import './Profile.scss';

const Profile = ({ loggedIn, initialFirstName, initialLastName, initialUsername, profileImage, images, accessToken, getUserData, updateUser }) => {
	const [showProfileImageEdit, setShowProfileImageEdit] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [badFirstName, setBadFirstName] = useState(false);
	const [lastName, setLastName] = useState('');
	const [badLastName, setBadLastName] = useState(false);
	const [username, setUsername] = useState('');
	const [badUsername, setBadUsername] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setDisabled] = useState(true);
	const { location, push: pushPathname } = useHistory();

	const onSubmit = e => {
		e.preventDefault();

		if (firstName.length) 
			setBadFirstName(false);
		else 
			setBadFirstName(true);

		if (lastName.length) 
			setBadLastName(false);
		else 
			setBadLastName(true);
      
		if (username.length) 
			setBadUsername(false);
		else 
			setBadUsername(true);

		setDisabled(true);

		if (firstName && lastName && username)
		  updateUser(accessToken, firstName, lastName, username);
	};

	useEffect(() => {
		if (!loggedIn) 
			pushPathname('/accounts/login');

		if (!profileImage || location.pathname.split('/')[2] === 'image-upload')
			setShowProfileImageEdit(true);

		if (!isLoading && !(initialFirstName && initialLastName && initialUsername)) {
			setIsLoading(true);
			getUserData(accessToken);
		}

		if (isLoading && initialFirstName && initialLastName && initialUsername) {
			setFirstName(initialFirstName);
			setLastName(initialLastName);
			setUsername(initialUsername);
			setIsLoading(false);
		}

		setDisabled(false);
	}, [accessToken, getUserData, initialFirstName, initialLastName, initialUsername, isDisabled, isLoading, location.pathname, loggedIn, profileImage, pushPathname]);

	return (
		<div className='profile-card'>
			<p className='main-text'>Profile</p>
			<img src={`https://dice-profile-image-store.herokuapp.com/${profileImage}`} className='profile-image' alt='' onClick={() => setShowProfileImageEdit(true)} />
			{ showProfileImageEdit && <ImageUpload /> }
			<form 
				className='profile-form'
				onSubmit={e => onSubmit(e)}
			>
				<div className='profile-row'>
					<p className='profile-field'>First Name</p>
					<p className='error-message'>{ badFirstName ? 'Cannot be empty' : null }</p>
					<input 
						className={`profile-input${badFirstName ? ' bad-input' : ''}`}
						value={firstName}
						placeholder={initialFirstName}
						onChange={e => setFirstName(e.target.value)}
					/>
				</div>
				<div className='profile-row'>
					<p>Last Name</p>
					<p className='error-message'>{ badLastName ? 'Cannot be empty' : null }</p>
					<input 
						className={`profile-input${badLastName ? ' bad-input' : ''}`}
						value={lastName}
						placeholder={initialLastName}
						onChange={e => setLastName(e.target.value)}
					/>
				</div>
				<div className='profile-row'>
					<p>Username</p>
					<p className='error-message'>{ badUsername ? 'Cannot be empty' : null }</p>
					<input 
						className={`profile-input${badUsername ? ' bad-input' : ''}`}
						value={username}
						placeholder={initialUsername}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<button 
					className='btn btn-block btn-info'
					disabled={isDisabled}
				>
          Save
				</button>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	loggedIn: state.loggedIn,
	initialFirstName: state.firstName,
	initialLastName: state.lastName,
	initialUsername: state.username,
	profileImage: state.profileImage,
	images: state.images,
	accessToken: state.accessToken,
});

const mapDispatchToProps = {
	getUserData,
	updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
