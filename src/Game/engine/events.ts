import { Action, State } from './types';
import { Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const playerActionThunk = (action: Action) => (dispatch: ThunkDispatch<State, void, Action>, getState: Store<State>['getState']) => {
  return dispatch(action)
    .then(() => {
      const state = getState();
      // Player has made a move/action: player join | player left | chosen trump | placed bet | played card
      // Must now check for a change in: trick | round | phase | gameover
      // If a player left or
      // if (false) return dispatch({ type: 'GAME__GAMEOVER' });
      // if (false) return dispatch({ type: 'GAME__CHANGE_ROUND' });
      // if (false) return dispatch({ type: 'GAME__CHANGE_PHASE' });
      // if (false) return dispatch({ type: 'GAME__CHANGE_TRICK' });
      return true;
    });
};

export default playerActionThunk;
