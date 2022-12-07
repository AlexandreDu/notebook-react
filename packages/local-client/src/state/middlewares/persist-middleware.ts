import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionTypes } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";
// this middleware stands for intercepting action types that modifies cell. When it's the case, we call the saveCells action creators
export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
      if (
        [
          ActionTypes.MOVE_CELL,
          ActionTypes.UPDATE_CELL,
          ActionTypes.INSERT_CELL_AFTER,
          ActionTypes.DELETE_CELL,
        ].includes(action.type)
      ) {
        // debounce logic
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
