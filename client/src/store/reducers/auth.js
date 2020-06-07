import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

const userLoading = (state, action) => {
    return updateObject(state, {isLoading: true});
};

const userLoaded = (state, action) => {
    return updateObject(state, {isAuthenticated: true, isLoading: false, user: action.payload});
};

const registerSuccess = (state, action) => {
    localStorage.setItem("token", action.payload.token);
    return {...state, ...action.payload, isAuthenticated: true, isLoading: false};
};

const authError = (state, action) => {
    localStorage.removeItem("token");
    return updateObject(state, {token: null, isAuthenticated: false, isLoading: false, user: null});
};

const reducer =(state = initialState, action) => {
    switch (action.type) {
        case actionType.USER_LOADING: return userLoading(state, action);
        case actionType.USER_LOADED: return userLoaded(state, action);
        case actionType.LOGIN_SUCCESS:
        case actionType.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionType.AUTH_ERROR:
        case actionType.LOGIN_FAIL:
        case actionType.LOGOUT_SUCCESS:
        case actionType.REGISTER_FAIL: return authError(state, action);
        default:
            return state;
    }
};

export default reducer;
