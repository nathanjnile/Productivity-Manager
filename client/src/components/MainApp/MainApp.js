import React, {useState, useEffect} from "react";
import classes from "./MainApp.module.css";
import { connect } from "react-redux";

import Todolist from "../Todolist/Todolist";
import Timer from "../Timer/Timer";
import LongTermGoals from "../LongTermGoals/LongTermGoals";
import Typography from '@material-ui/core/Typography';
import * as actions from "../../store/actions/index";


const MainApp = (props) => {
    const {isAuthenticated, error, onClearErrors} = props;
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        if(props.error.id === "AUTH_ERROR") {
        setMsg(error.msg.msg);
        };
    
        if(isAuthenticated) {
          onClearErrors();
        }
      }, [error, msg, isAuthenticated]);

    return(
        <div className={classes.mainStyles}>
           <div className={classes.divStyle}>
                {isAuthenticated ? <Todolist/> : <Typography variant="h5" gutterBottom style={{color: "#2c2f35"}}>
                {msg}
            </Typography>}
           </div>
            <div className={classes.divStyle1}>
                <Timer/>
            </div>
            <div className={classes.divStyle2}>
            {isAuthenticated ? <LongTermGoals/> : <Typography variant="h5" gutterBottom style={{color: "#2c2f35"}}>
                {msg}
            </Typography>}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearErrors: () => dispatch(actions.clearErrors())
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(MainApp);