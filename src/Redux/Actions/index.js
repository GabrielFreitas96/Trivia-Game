import { PLAYER_INFO, TOKEN_INFO, TIMER,
  ADD_SCORE, RIGHT_QUESTIONS, RESET_SCORE } from './ActionConst';

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

export const ScoreAction = (score) => ({
  type: ADD_SCORE,
  payload: {
    score,
  },
});

export const RightQuestionsAction = () => ({
  type: RIGHT_QUESTIONS,
});

export const ResetAction = () => ({
  type: RESET_SCORE,
});
