import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { ErrorState } from "../types";
import { AnyAction, Reducer } from "redux";

const initialState: ErrorState = {
  msg: { msg: "" },
  status: null,
  id: null,
};

const getErrors = (state: ErrorState, action: AnyAction) => {
  return updateObject(state, {
    msg: action.payload.msg,
    status: action.payload.status,
    id: action.payload.id,
  });
};

const clearErrors = (state: ErrorState) => {
  return updateObject(state, { msg: { msg: "" }, status: null, id: null });
};

const reducer: Reducer<ErrorState> = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ERRORS:
      return getErrors(state, action);
    case actionType.CLEAR_ERRORS:
      return clearErrors(state);
    default:
      return state;
  }
};

export default reducer;
