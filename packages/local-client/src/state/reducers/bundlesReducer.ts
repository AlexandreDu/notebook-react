import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import produce from "immer";

export interface BundleState {
  [key: string]:
    | {
        code: string;
        err: string;
        loading: boolean;
      }
    | undefined;
}
const initialState: BundleState = {};

const reducer = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
      case ActionTypes.BUNDLE_START:
        const { cellId } = action.payload;
        state[cellId] = {
          code: "",
          err: "",
          loading: true,
        };
        return state;
      case ActionTypes.BUNDLE_COMPLETE:
        const {
          cellId: idCell,
          bundle: { code, err },
        } = action.payload;
        state[idCell] = {
          loading: false,
          code,
          err,
        };
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
