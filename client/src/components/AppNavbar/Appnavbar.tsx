import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { LoginModal } from "./auth/LoginModal";
import { Logout } from "./auth/Logout";
import { RegisterModal } from "./auth/RegisterModal";

import * as actions from "../../store/actions/index";
import { RootState } from "../..";

export const Appnavbar = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, userSelect: "none" }}>
          Productivity Manager
        </Typography>
        {!isAuthenticated && (
          <Button
            onClick={() => dispatch(actions.addGuest())}
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
