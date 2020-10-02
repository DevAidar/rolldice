import React, { useState } from 'react';
import { connect } from 'react-redux';

import DiceTable from '../../components/DiceTable/DiceTable';

const Game = ({ dice }) => {
  const [state, setState] = useState({ started: false, diceThrown: false });

  console.log(dice);

  return (
    <DiceTable state={state} throwDice={() => setState({ ...state, diceThrown: true })} dice={dice} />
  );
};

const mapStateToProps = (state) => ({
  dice: state.dice,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
