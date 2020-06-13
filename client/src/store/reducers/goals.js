import * as actionType from "../actions/actionTypes";

const initialState = {
    goals:[]
}

const goalMoved = (state, action) => {
    return {
      ...state,
      goals: action.copiedItems
    }; 
  }

  const getGoals = (state, action) => {
    const orderedGoals = action.payload.sort((a, b) => {
      return a.order - b.order;
    });
    return {
      ...state,
      goals: orderedGoals
    }; 
  }

  const addGoal = (state, action) => {
    const { _id, content, date, order, owner } = action.payload;
    return {
      ...state,
      goals : [...state.goals, {_id, content, date, order, owner}]
    }
  }

  const editGoal = (state, action) => {
    const { cardId, newContent, newDate, cardIndex} = action.payload;
    const copiedItems = [...state.goals];
    copiedItems.splice(cardIndex, 1);
    copiedItems.splice(cardIndex, 0, {_id: cardId, content: newContent, date: newDate, order: state.goals[cardIndex].order})
    return {
      ...state,
      goals : copiedItems
    }; 
  }

  const deleteGoal = (state, action) => {
    return {
      ...state,
      goals: action.payload
    }; 
  }

  const clearGoals = (state, action) => {
    return {
      ...state,
      goals: []
    }; 
  }

const reducer =(state = initialState, action) => {
    switch (action.type) {
        case actionType.GOAL_MOVED: return goalMoved(state, action);
        case actionType.GET_GOALS: return getGoals(state, action);
        case actionType.ADD_GOAL: return addGoal(state, action);
        case actionType.EDIT_GOAL: return editGoal(state, action);
        case actionType.DELETE_GOAL: return deleteGoal(state, action);
        case actionType.CLEAR_GOALS: return clearGoals(state, action);
        default:
            return state;
    }
};

export default reducer;
