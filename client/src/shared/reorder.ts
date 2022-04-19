import { Goal, Task } from "../store/types";

export const changeOrderGoals = (copiedGoals: Goal[]) => {
  for (let i = 0; i < copiedGoals.length; i++) {
    copiedGoals[i].order = i;
  }
  return copiedGoals;
};

export const changeOrderOwnColumn = (copiedTasks: Task[]) => {
  for (let i = 0; i < copiedTasks.length; i++) {
    copiedTasks[i].order = i;
  }
  return copiedTasks;
};

export const changeOrderOfColumns = ({ columns }: any) => {
  for (let i = 0; i < columns.length; i++) {
    columns[i][1].columnOrder = i;
  }
  return columns;
};
