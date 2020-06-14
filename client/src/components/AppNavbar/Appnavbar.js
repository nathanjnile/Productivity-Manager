import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
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
          {/* {isAuthenticated ? <Typography variant="subtitle1" style={{flexGrow: 1}}>
            Welcome {user.name}
          </Typography> : null} */}
          {!isAuthenticated ? <LoginModal/> : null}
          {isAuthenticated ? <Logout/> : null}
          {!isAuthenticated ? <RegisterModal/> : null}
          {/* <Button href="https://github.com/nn5g14" color="inherit">Github</Button> */}
        </Toolbar>
      </AppBar>
    );
}

const mapStateToProps = state => {
  return {
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
  // error: state.error
  }
}

export default connect(mapStateToProps)(Appnavbar);