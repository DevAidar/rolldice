import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import DiceTable from '../../components/DiceTable/DiceTable';

const Game = ({ dice }) => {
  const [state, setState] = useState({ started: false, diceThrown: false });
  const history = useHistory();

  console.log(dice);

  return (
    <DiceTable state={state} throwDice={() => setState({ ...state, diceThrown: true })} dice={dice} history={history}/>
  );
};

const mapStateToProps = (state) => ({
  dice: state.dice,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
