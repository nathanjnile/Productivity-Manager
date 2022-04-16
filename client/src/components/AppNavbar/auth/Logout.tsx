import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import * as actions from "../../../store/actions/index";

export const Logout: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(actions.logout())}
      style={{ backgroundColor: "#3F51B5", color: "#FFFFFF" }}
    >
      Logout
    </Button>
  );
};
