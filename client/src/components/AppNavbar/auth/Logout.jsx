import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from '@material-ui/core/Button';

import * as actions from "../../../store/actions/index";
  
const Logout = (props) => {
    const {onLogout} = props;

    return (
        <Button onClick={onLogout} style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>
            Logout
        </Button>
      );
}

Logout.propTypes = {
    onLogout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout:  () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);