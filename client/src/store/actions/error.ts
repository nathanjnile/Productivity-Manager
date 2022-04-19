import * as actionTypes from "./actionTypes";
// import axios from "axios";

// Return Errors
export const returnErrors = (
  msg: string,
  status: string,
  id: string | null = null
) => {
  return {
    type: actionTypes.GET_ERRORS,
    payload: { msg, status, id },
  };
};

// Clear Errors

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};
