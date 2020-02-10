import { State, PlayerState, Action } from './types';

export const initState: State = {
  gameID: '',
  playerID: '',
  currentPlayer: null,
  phase: 'lobby',
  players: new Map(),
  playOrder: [],
  playOrderPos: 0,
  round: {
    id: 0,
    dealer: null,
    trump: null,
  },
  trick: {
    id: 0,
    cards: [],
    startingPlayer: null
  },
};

const initPlayer: PlayerState = {
  id: '', // Don't forget to set id
  bet: null,
  tricks: 0,
  hand: [],
  score: 0,
}

// Game flow
  // Show lobby
  // Invite players/add computers
  // Players join (x2-5)
  // Game start
  // Randomize player order and first dealer
  // Start round (loop)
    // Deal cards, including trump card or not (if last round)
    // (Conditional) Dealer chooses trump if trump card was wizard
    // Start betting
      // A player decides on bet (x3-6)
    // Start tricks
      // Player places a card (x3-6)
      // Winner is decided, becoming next lead
export default function reducer(state: State = initState, action: Action) {
  switch (action.type) {
    case 'PLAYER__CREATE_GAME': {
      const { playerID } = state
      return {
        ...state,
        currentPlayer: playerID,
        playerOrder: [playerID],
        players: new Map([[
          playerID,
          {
            ...initPlayer,
            id: playerID
          }
        ]])
      }
    }
    case 'PLAYER__JOIN_GAME': {}
    default:
      return state;
  }
}
