import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { fetchUsers, clearOpponents, selectOpponent } from '../../actions';

import './Info.scss';

const Info = ({ accessToken, profileImage, opponents, selectedOpponents, fetchUsers, clearOpponents, selectOpponent }) => {
  const [page, setPage] = useState(0);
  const [amountPerPage, setAmountPerPage] = useState(10);
  const [cleared, setCleared] = useState(false);
  const { location } = useHistory();

  useEffect(() => {
    if (!cleared) {
      clearOpponents();
      setCleared(true);
    }
    if (cleared && opponents && !opponents.length) {
      fetchUsers(page * amountPerPage, amountPerPage, accessToken);
    }
  }, [cleared, opponents, amountPerPage, clearOpponents, fetchUsers, page])

  return accessToken 
    ? profileImage
      ? (
      <div className='container'>
        <div className='card mt-4'>
          <div className='card-header text-center bg-info text-white'>
            Choose your opponents
          </div>
          <form>
            <div className='card-body py-0'>
              {opponents && opponents.length ? opponents.map((opponent) => (
                <div
                  className='card-profile'
                  key={`${opponent.username}-${opponent._id}`}
                  onClick={() => selectOpponent(opponent._id)}
                >
                  <img src={'https://dice-profile-image-store.herokuapp.com/' + opponent.profileImage} alt='' className='card-profile-img' />
                  <p className='attendee-name'>
                    {`${opponent.firstName}`}
                    <span className='attendee-username'>@{opponent.username}</span>
                  </p>
                  <div className="custom-control custom-checkbox my-auto">
                    <input checked={selectedOpponents.length && selectedOpponents.some((elem) => elem._id === opponent._id)} onChange={() => null} type="checkbox" className="custom-control-input" />
                    <label className="custom-control-label" />
                  </div>
                </div>
              )) : null}
            </div>
          </form>
        </div>
      </div>
    )
    : <Redirect to={{
      pathname: '/profile/image-upload',
      state: location.pathname,
    }} />
  : <Redirect to={{
    pathname: '/accounts/login',
    state: location.pathname,
  }} />
};

const mapStateToProps = (state) => ({
  profileImage: state.profileImage,
  accessToken: state.accessToken,
  opponents: state.opponents,
  selectedOpponents: state.dice,
});

const mapDispatchToProps = {
  fetchUsers,
  clearOpponents,
  selectOpponent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
