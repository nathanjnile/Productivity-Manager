import * as actionType from "../actions/actionTypes";

const initialState = {
    items:[]
}

const goalMoved = (state, action) => {
    return {
      ...state,
      items: action.copiedItems
    }; 
  }

  const getGoals = (state, action) => {
    const orderedGoals = action.payload.sort((a, b) => {
      return a.order - b.order;
    });
    return {
      ...state,
      items: orderedGoals
    }; 
  }

  const addGoal = (state, action) => {
    return {
      ...state,
      items : [...state.items, {_id: action.payload._id, content: action.payload.content, date: action.payload.date, order: action.payload.order}]
    }; 
  }

  const editGoal = (state, action) => {
    const { cardId, newContent, newDate, cardIndex} = action.payload;
    const copiedItems = [...state.items];
    copiedItems.splice(cardIndex, 1);
    copiedItems.splice(cardIndex, 0, {_id: cardId, content: newContent, date: newDate, order: state.items[cardIndex].order})
    return {
      ...state,
      items : copiedItems
    }; 
  }

  const deleteGoal = (state, action) => {
    return {
      ...state,
      items: action.payload
    }; 
  }


const reducer =(state = initialState, action) => {
    switch (action.type) {
        case actionType.GOAL_MOVED: return goalMoved(state, action);
        case actionType.GET_GOALS: return getGoals(state, action);
        case actionType.ADD_GOAL: return addGoal(state, action);
        case actionType.EDIT_GOAL: return editGoal(state, action);
        case actionType.DELETE_GOAL: return deleteGoal(state, action);
        default:
            return state;
    }
};

export default reducer;
