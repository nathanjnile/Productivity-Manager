import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { connect } from "react-redux";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import RegisterModal from "./auth/RegisterModal";


const Appnavbar = () => {

    return(
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow : 1, userSelect: "none"}}>
            Productivity Tracker
          </Typography>
          <LoginModal/>
          <Logout/>
          <RegisterModal/>
          <Button href="https://github.com/nn5g14" color="inherit">Github</Button>
        </Toolbar>
      </AppBar>
    );
}


export default Appnavbar;