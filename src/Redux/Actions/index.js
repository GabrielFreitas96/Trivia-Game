import { PLAYER_INFO, TOKEN_INFO } from './ActionConst';

export const PlayerAction = (playerObject) => ({
  type: PLAYER_INFO,
  payload: {
    ...playerObject,
  },
});

export const TokenAction = (tokenString) => ({
  type: TOKEN_INFO,
  payload: `${tokenString}`,
});
