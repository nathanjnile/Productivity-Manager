import React, { useState, useEffect } from "react";
import { Appnavbar } from "./components/AppNavbar/Appnavbar";
import { MainApp } from "./components/MainApp/MainApp";
import * as actions from "./store/actions/index";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from ".";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useAppDispatch();
  const authLoading = useSelector((state: RootState) => state.auth.isLoading);
  const goalLoading = useSelector((state: RootState) => state.goals.isLoading);
  const tasksLoading = useSelector((state: RootState) => state.tasks.isLoading);

  useEffect(() => dispatch(actions.loadUser()), [dispatch]);

  useEffect(() => {
    if (authLoading || tasksLoading || goalLoading) setLoading(true);
    if (!authLoading && !tasksLoading && !goalLoading) setLoading(false);
  }, [authLoading, tasksLoading, goalLoading]);

  return (
    <div>
      <Appnavbar />
      <MainApp />
    </div>
  );
};
