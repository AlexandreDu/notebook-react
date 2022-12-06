import produce from "immer";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

export interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

// NB: for each case, we return the state in order to tell to typescript that the redux state is never undefined (but the app would work even without returning the state each time)
const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;
    case ActionTypes.FETCH_CELLS:
      state.error = null;
      state.loading = true;
      return state;
    case ActionTypes.FETCH_CELLS_COMPLETE:
      const cells = action.payload;
      const cellsOrder = cells.map((cell) => cell.id);
      state.order = cellsOrder;
      // transform array in object
      state.data = cells.reduce((acc, cell) => {
        return { ...acc, [cell.id]: cell };
      }, {} as CellsState["data"]);

      return state;
    case ActionTypes.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;
    case ActionTypes.UPDATE_CELL:
      const { id, content } = action.payload;
      // with immer, we don't have to return the value
      state.data[id].content = content;
      return state;

    case ActionTypes.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    case ActionTypes.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      // handle invalid
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return state;
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    case ActionTypes.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: action.payload.generatedId,
      };
      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );
      if (foundIndex < 0) state.order = [cell.id, ...state.order];
      if (foundIndex >= 0) state.order.splice(foundIndex + 1, 0, cell.id);

      return state;
    default:
      return state;
  }
  // we add the initialState as second argument of the immer produce function, so when we use the useTypeSelector in our component, ts will not complain that the state can be undefined
}, initialState);

export default reducer;
