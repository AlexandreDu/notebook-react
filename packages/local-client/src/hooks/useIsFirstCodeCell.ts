import { useTypedSelector } from "./useTypedSelector";

// hooks to determine if the cell is the first code cell
export const useIsFirstCodeCell = (id: string) => {
  return useTypedSelector(({ cells: { data, order } }) => {
    for (const cellId in data) {
      if (data[cellId].type === "code" && order[0] === id) return true;
    }
  });
};
