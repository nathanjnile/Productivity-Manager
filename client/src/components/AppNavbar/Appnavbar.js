import React from "react";
import PropTypes from "prop-types";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import RegisterModal from "./auth/RegisterModal";


const Appnavbar = (props) => {
  const {isAuthenticated} = props;

    return(
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow : 1, userSelect: "none"}}>
            Productivity Tracker
          </Typography>
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

export default connect(mapStateToProps)(Appnavbar);