import React, { useState, useEffect } from "react";
import classes from "./MainApp.module.css";
import { useDispatch, useSelector } from "react-redux";

import { Todolist } from "../Todolist/Todolist";
import { Timer } from "../Timer/Timer";
import { LongTermGoals } from "../LongTermGoals/LongTermGoals";
import Typography from "@material-ui/core/Typography";
import * as actions from "../../store/actions/index";
import { RootState } from "../..";

export const MainApp: React.FC = () => {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actions.clearErrors());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (error.id === "AUTH_ERROR") {
      setMsg(error.msg.msg);
    }
  }, [error]);

  return (
    <div className={classes.mainStyles}>
      <div className={classes.divStyle}>
        {isAuthenticated ? (
          <Todolist />
        ) : (
          <Typography variant="h5" gutterBottom style={{ color: "#2c2f35" }}>
            {msg}
          </Typography>
        )}
      </div>
      <div className={classes.divStyle1}>
        <Timer />
      </div>
      <div className={classes.divStyle2}>
        {isAuthenticated ? (
          <LongTermGoals />
        ) : (
          <Typography variant="h5" gutterBottom style={{ color: "#2c2f35" }}>
            {msg}
          </Typography>
        )}
      </div>
    </div>
  );
};
