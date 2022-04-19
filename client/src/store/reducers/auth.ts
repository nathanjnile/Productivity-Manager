import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { AuthState } from "../types";
import { AnyAction, Reducer } from "redux";

const initialState: AuthState = {
  token: sessionStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const userLoading = (state: AuthState) => {
  return updateObject(state, { isLoading: true });
};

const userLoaded = (state: AuthState, action: AnyAction) => {
  return updateObject(state, {
    isAuthenticated: true,
    isLoading: false,
    user: action.payload,
  });
};

const registerSuccess = (state: AuthState, action: AnyAction) => {
  sessionStorage.setItem("token", action.payload.token);
  return {
    ...state,
    ...action.payload,
    isAuthenticated: true,
    isLoading: false,
  };
};

const authError = (state: AuthState) => {
  sessionStorage.removeItem("token");
  return updateObject(state, {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
  });
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_LOADING:
      return userLoading(state);
    case actionType.USER_LOADED:
      return userLoaded(state, action);
    case actionType.LOGIN_SUCCESS:
    case actionType.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionType.AUTH_ERROR:
    case actionType.LOGIN_FAIL:
    case actionType.LOGOUT_SUCCESS:
    case actionType.REGISTER_FAIL:
      return authError(state);
    default:
      return state;
  }
};

export default reducer;
