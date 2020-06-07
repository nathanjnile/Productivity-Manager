import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    msg: {},
    status: null,
    id: null
}

const getErrors = (state, action) => {
    return updateObject(state, {msg: action.payload.msg, status:action.payload.status, id: action.payload.id});
};

const clearErrors = (state, action) => {
    return updateObject(state, {msg: {}, status:null, id: null});
};

const reducer =(state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_ERRORS: return getErrors(state, action);
        case actionType.CLEAR_ERRORS: return clearErrors(state, action);
        default:
            return state;
    }
};

export default reducer;
