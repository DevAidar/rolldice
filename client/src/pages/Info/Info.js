import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, clearOpponents, selectOpponent } from '../../actions';

import './Info.scss';

const Info = ({ opponents, selectedOpponents, fetchUsers, clearOpponents, selectOpponent }) => {
  const [page, setPage] = useState(0);
  const [amountPerPage, setAmountPerPage] = useState(10);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!cleared) {
      clearOpponents();
      setCleared(true);
    }
    if (cleared && opponents && !opponents.length) {
      fetchUsers(page * amountPerPage, amountPerPage);
    }
  }, [cleared, opponents, amountPerPage, clearOpponents, fetchUsers, page])

  return (
    <>
      <div className='container'>
        <div className='card mt-4'>
          <div className='card-header text-center bg-info text-white'>
            Choose your opponents
					</div>
          <form>
            <div className='card-body py-0'>
              {opponents && opponents.length ? opponents.map((opponent) => (
                <label
                  className='card-profile'
                  key={`${opponent.username}-${opponent._id}`}
                  onClick={() => selectOpponent(opponent._id)}
                >
                  <img src={`${process.env.REACT_APP_BACKEND_URL}/${opponent.profileImage}`} alt='' className='card-profile-img' />
                  <p className='attendee-name'>
                    {`${opponent.firstName}`}
                    <span className='attendee-username'>@{opponent.username}</span>
                  </p>
                  <div className="custom-control custom-checkbox my-auto">
                    <input checked={selectedOpponents.length && selectedOpponents.some((elem) => elem._id === opponent._id)} onChange={() => null} type="checkbox" className="custom-control-input" />
                    <label className="custom-control-label" />
                  </div>
                </label>
              )) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  opponents: state.opponents,
  selectedOpponents: state.dice,
});

const mapDispatchToProps = {
  fetchUsers,
  clearOpponents,
  selectOpponent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
