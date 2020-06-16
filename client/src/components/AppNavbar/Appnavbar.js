import React from "react";
import PropTypes from "prop-types";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import RegisterModal from "./auth/RegisterModal";

import * as actions from "../../store/actions/index";

const Appnavbar = (props) => {
  const {isAuthenticated, onAddGuest} = props;

    return(
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow : 1, userSelect: "none"}}>
            Productivity Tracker
          </Typography> 
          {!isAuthenticated ? <Button onClick={onAddGuest} style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>Guest Access</Button> : null}
          {!isAuthenticated ? <LoginModal/> : null}
          {isAuthenticated ? <Logout/> : null}
          {!isAuthenticated ? <RegisterModal/> : null}
        </Toolbar>
      </AppBar>
    );
}

Appnavbar.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => {
  return {
  isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onGoalAdded: (goal, date, goals) => dispatch(actions.addGoal(goal, date, goals)),
      onAddGuest: () => dispatch(actions.addGuest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appnavbar);