import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { connect, useSelector } from "react-redux";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import RegisterModal from "./auth/RegisterModal";

import * as actions from "../../store/actions/index";
import { RootState } from "../..";

interface AppnavbarProps {
  onAddGuest: () => void;
}

const Appnavbar = ({ onAddGuest }: AppnavbarProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, userSelect: "none" }}>
          Productivity Manager
        </Typography>
        {!isAuthenticated && (
          <Button
            onClick={onAddGuest}
            style={{ backgroundColor: "#3F51B5", color: "#FFFFFF" }}
          >
            Guest Access
          </Button>
        )}
        {!isAuthenticated && <LoginModal />}
        {isAuthenticated && <Logout />}
        {!isAuthenticated && <RegisterModal />}
      </Toolbar>
    </AppBar>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGoalAdded: (goal: any, date: any, goals: any) =>
      dispatch(actions.addGoal(goal, date, goals)),
    onAddGuest: () => dispatch(actions.addGuest()),
  };
};

export default connect(null, mapDispatchToProps)(Appnavbar);
