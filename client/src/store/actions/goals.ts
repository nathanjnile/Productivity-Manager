import * as actionTypes from "./actionTypes";
import axios from "axios";
import changeOrder from "../../shared/reorder";
import { tokenConfig } from "./auth";
import { AppThunk } from "../types";

export const addGoal: AppThunk = (goal, date, goals) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GOAL_LOADING });
    axios
      .post(
        "/api/goal/add",
        {
          content: goal,
          date,
          order: goals.length,
          owner: getState().auth.user._id,
        },
        tokenConfig(getState)
      )
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_GOAL,
          payload: response.data,
        });
      })
      .catch((err) => {
        //  console.log(err)
      });
  };
};

export const goalMoved: AppThunk = (source, destination, goals) => {
  const copiedItems = [...goals];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  const copiedItems2 = changeOrder([...copiedItems], "goal");
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.GOAL_MOVED,
      copiedItems: copiedItems2,
    });
    // Compare old goals and new goals for updated items
    const updatedArray = [];
    for (let i = 0; i < copiedItems2.length; i++) {
      if (goals[i] !== copiedItems2[i]) {
        updatedArray.push(copiedItems2[i]);
      }
    }

    if (updatedArray.length > 0) {
      // axios call to send new order to backend
      axios
        .post(
          "/api/goal/updateMove",
          { newItems: updatedArray },
          tokenConfig(getState)
        )
        .then((res) => {
          // console.log(res);
        })
        .catch((error) => {
          // console.log(error.response);
        });
    }
  };
};

export const editGoal: AppThunk = (
  cardId,
  newGoalContent,
  newGoalDate,
  cardIndex
) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GOAL_LOADING });
    axios
      .post(
        "/api/goal/update",
        { _id: cardId, content: newGoalContent, date: newGoalDate },
        tokenConfig(getState)
      )
      .then((response) => {
        dispatch({
          type: actionTypes.EDIT_GOAL,
          payload: {
            cardId: cardId,
            newContent: newGoalContent,
            newDate: newGoalDate,
            cardIndex: cardIndex,
          },
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};

export const deleteGoal: AppThunk = (cardId, cardIndex, goals) => {
  const copiedGoals = [...goals];
  copiedGoals.splice(cardIndex, 1);
  const copiedGoals2 = changeOrder([...copiedGoals], "goal");

  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GOAL_LOADING });
    axios
      .post(
        "/api/goal/deleteAndUpdate",
        { itemToDelete: goals[cardIndex], itemsToReorder: copiedGoals2 },
        tokenConfig(getState)
      )
      .then((res) => {
        // console.log(res);
        dispatch({
          type: actionTypes.DELETE_GOAL,
          payload: copiedGoals2,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

export const getGoals: AppThunk = () => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GOAL_LOADING });
    axios
      .get("/api/goal", tokenConfig(getState))
      .then((response) => {
        // console.log(response.data);
        dispatch({
          type: actionTypes.GET_GOALS,
          payload: response.data,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};
