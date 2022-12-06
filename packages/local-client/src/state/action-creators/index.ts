import { Dispatch } from "redux";
import axios from "axios";
import { Cell, CellTypes } from "../cell";
import { ActionTypes } from "../action-types";
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
} from "../actions";
import { v4 as uuidv4 } from "uuid";
import bundle from "../../bundler";
import { RootState } from "../reducers/index";

interface UpdateCellArgs {
  id: string;
  content: string;
}

interface DeleteCellArg {
  id: string;
}

interface MoveCellArgs {
  id: string;
  direction: Direction;
}

interface CellAfterArgs {
  cellType: CellTypes;
  id: string | null;
}

interface CreateBundleArgs {
  cellId: string;
  input: string;
}

export const updateCell = (args: UpdateCellArgs): UpdateCellAction => {
  const { id, content } = args;
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (args: DeleteCellArg): DeleteCellAction => {
  const { id } = args;
  return {
    type: ActionTypes.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (args: MoveCellArgs): MoveCellAction => {
  const { id, direction } = args;
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (args: CellAfterArgs): InsertCellAfterAction => {
  const { id, cellType } = args;
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      generatedId: uuidv4(),
      type: cellType,
    },
  };
};

export const createBundle = (args: CreateBundleArgs) => {
  const { cellId, input } = args;
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);
    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({ type: ActionTypes.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionTypes.FETCH_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();
    const cells = order.map((id) => {
      return data[id];
    });
    try {
      await axios.post("/cells", { cells });
    } catch (err) {
      console.log("savecell err", err);
      if (err instanceof Error) {
        dispatch({
          type: ActionTypes.SAVE_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};
