import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as errorActions from "./error";

// Check token & load user

export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.USER_LOADING});
        axios.get("/api/user/users/me", tokenConfig(getState))
            .then(res => dispatch({
                type: actionTypes.USER_LOADED,
                payload: res.data
            }))
            .catch(err => {
                dispatch(errorActions.returnErrors(err.response.data, err.response.status, "AUTH_ERROR"));
                dispatch({
                    type: actionTypes.AUTH_ERROR
                })
            })
    }
}

// Setup config/headers and token
export const tokenConfig = getState => {
        // Get token from localstorage
        const token = getState().auth.token;

        // Headers 
        const config = {
            headers : {
                "Content-type": "application/json"
            }
        }

        // If token, add to headers
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
}

// Register user
export const register = ({name, email, password}) => {
    return (dispatch) => {
        dispatch({type: actionTypes.USER_LOADING});
        // headers
        const config = {
            headers : {
                "Content-type": "application/json"
            }
        }

        // Request body

        const body = JSON.stringify({name, email, password});

        axios.post("/api/user/users", body, config)
            .then(res => {
                dispatch({
                    type: actionTypes.REGISTER_SUCCESS,
                    payload: res.data
                })
            }).catch(err => {
                dispatch(errorActions.returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
                dispatch({
                    type: actionTypes.REGISTER_FAIL
                })
            })


    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOGOUT_SUCCESS});
        dispatch({type: actionTypes.CLEAR_GOALS});
        dispatch({type: actionTypes.CLEAR_TASKS});
    }
}

export const login = ({email, password}) => {
    return (dispatch) => {
        dispatch({type: actionTypes.USER_LOADING});
        // headers
        const config = {
            headers : {
                "Content-type": "application/json"
            }
        }

        // Request body

        const body = JSON.stringify({email, password});

        axios.post("/api/user/users/login", body, config)
            .then(res => {
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    payload: res.data
                })
            }).catch(err => {
                dispatch(errorActions.returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
                dispatch({
                    type: actionTypes.LOGIN_FAIL
                })
            })


    }
}