import { PLAYER_INFO } from './ActionConst';

const PlayerAction = (playerObject) => ({
  type: PLAYER_INFO,
  payload: {
    ...playerObject,
  },
});

export default PlayerAction;
