import React, { useState } from 'react';
import { connect } from 'react-redux';

import ImageUpload from '../../components/ImageUpload/ImageUpload';

import profileImage from '../../images/questionMark.png';
import './Profile.scss';

const Profile = () => {
  const [showProfileImageEdit, setShowProfileImageEdit] = useState(false);

  return (
    <div className='profile-card'>
      <p className='main-text'>Profile</p>
      <img src={profileImage} className='profile-image' alt='' onClick={() => setShowProfileImageEdit(true)} />
      {showProfileImageEdit && <ImageUpload />}
      <form className='profile-form'>
        <div className='profile-row'>
          <p className='profile-field'>First Name</p>
          <input className='profile-input' value='Aidar' />
        </div>
        <div className='profile-row'>
          <p>Last Name</p>
          <input className='profile-input' value='Nuriev' />
        </div>
        <div className='profile-row'>
          <p>Username</p>
          <input className='profile-input' value='LimePeach' />
        </div>
        <div className='profile-row'>
          <p>Email</p>
          <input className='profile-input' value='aidar142536@gmail.com' />
        </div>
        <button className='btn btn-block btn-info'>Save</button>
      </form>

    </div>
  )
}

const mapStateToProps = (state) => ({
  loginError: state.loginError,
  accessToken: state.accessToken,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
