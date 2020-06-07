import React from "react";
import classes from "./MainApp.module.css";
import { connect } from "react-redux";

import Todolist from "../Todolist/Todolist";
import Timer from "../Timer/Timer";
import LongTermGoals from "../LongTermGoals/LongTermGoals";
import Typography from '@material-ui/core/Typography';


const MainApp = (props) => {
    const {isAuthenticated} = props;

    return(
        <div className={classes.mainStyles}>
           <div className={classes.divStyle}>
                {isAuthenticated ? <Todolist/> : <Typography variant="h5" gutterBottom style={{color: "#2c2f35"}}>
                Please login!
            </Typography>}
           </div>
            <div className={classes.divStyle1}>
                <Timer/>
            </div>
            <div className={classes.divStyle2}>
                <LongTermGoals/>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
    isAuthenticated: state.auth.isAuthenticated,
    // error: state.error
    }
}

export default connect(mapStateToProps)(MainApp);