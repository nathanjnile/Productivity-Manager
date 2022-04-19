import { AnyAction, Reducer } from "redux";
import * as actionType from "../actions/actionTypes";
import { Goal, GoalsState } from "../types";

const initialState: GoalsState = {
  goals: [],
  isLoading: false,
};

const goalLoading = (state: GoalsState) => {
  return {
    ...state,
    isLoading: true,
  };
};

const goalMoved = (state: GoalsState, action: AnyAction) => {
  return {
    ...state,
    goals: action.copiedItems,
  };
};

const getGoals = (state: GoalsState, action: AnyAction) => {
  const orderedGoals = action.payload.sort((a: Goal, b: Goal) => {
    return a.order - b.order;
  });
  return {
    ...state,
    isLoading: false,
    goals: orderedGoals,
  };
};

const addGoal = (state: GoalsState, action: AnyAction) => {
  const { _id, content, date, order, owner } = action.payload;
  return {
    ...state,
    isLoading: false,
    goals: [...state.goals, { _id, content, date, order, owner }],
  };
};

const editGoal = (state: GoalsState, action: AnyAction) => {
  const { cardId, newContent, newDate, cardIndex, owner } = action.payload;
  const copiedItems = [...state.goals];
  copiedItems.splice(cardIndex, 1);
  copiedItems.splice(cardIndex, 0, {
    _id: cardId,
    content: newContent,
    date: newDate,
    order: state.goals[cardIndex].order,
    owner: owner,
  });
  return {
    ...state,
    isLoading: false,
    goals: copiedItems,
  };
};

const deleteGoal = (state: GoalsState, action: AnyAction) => {
  return {
    ...state,
    isLoading: false,
    goals: action.payload,
  };
};

const clearGoals = (state: GoalsState) => {
  return {
    ...state,
    isLoading: false,
    goals: [],
  };
};

const reducer: Reducer<GoalsState> = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GOAL_MOVED:
      return goalMoved(state, action);
    case actionType.GET_GOALS:
      return getGoals(state, action);
    case actionType.ADD_GOAL:
      return addGoal(state, action);
    case actionType.EDIT_GOAL:
      return editGoal(state, action);
    case actionType.DELETE_GOAL:
      return deleteGoal(state, action);
    case actionType.CLEAR_GOALS:
      return clearGoals(state);
    case actionType.GOAL_LOADING:
      return goalLoading(state);
    default:
      return state;
  }
};

export default reducer;
