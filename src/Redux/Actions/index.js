import { PLAYER_INFO, TOKEN_INFO, TIMER } from './ActionConst';

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

export const TimerAction = (number) => ({
  type: TIMER,
  payload: number,
});
