import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./TimerButtons.module.css";
import Button from '@material-ui/core/Button';


const TimerButtons = (props) => {
    const {setDisplayTime, setTimerOn, setSound} = props;
    const [timerType, setTimerType] = useState("25work");

    const addTime = (time, lengthType) => {
        setDisplayTime(time);
        setTimerType(lengthType);
    }

    const resetTime = () => {
        setTimerOn(false);
        if (timerType ===  "25work") {
            setDisplayTime(25*60);
        } else if (timerType === "5break") {
            setDisplayTime(5*60);
        }
    }

    const handleStop = () => {
        setTimerOn(false);
        setSound(false);
    }

    return(
        <React.Fragment>
            <div className={classes.ButtonWorkBreak}>
                <Button onClick={() => addTime(25*60, "25work")} style={{backgroundColor: "#3F51B5", color:"#FFFFFF", width: 180, textTransform: "none"}}>25 minutes work</Button>
            </div>
            <div className={classes.ButtonWorkBreak}>
                <Button onClick={() => addTime(5*60, "5break")} style={{backgroundColor: "#3F51B5", color:"#FFFFFF", width: 180, textTransform: "none"}}>5 minutes break</Button>
            </div>
            <div className={classes.Button}>
            <div className={classes.Button}>
                <Button onClick={() => setTimerOn(true)} style={{backgroundColor: "green", color:"#FFFFFF", width: 70, opacity: 0.8, textTransform: "none"}}>Start</Button>
            </div>
            <div className={classes.Button}>
                <Button onClick={() => handleStop()} style={{backgroundColor: "red", color:"#FFFFFF", width: 70, opacity: 0.8, textTransform: "none"}}>Stop</Button>
            </div>
            <div className={classes.Button}>
                <Button onClick={() => resetTime()} style={{backgroundColor: "#3F51B5", color:"#FFFFFF", width: 70, textTransform: "none"}}>Reset</Button>
            </div>
            </div>
        </React.Fragment>
    );
}


TimerButtons.propTypes = {
    setDisplayTime: PropTypes.func.isRequired,
    setTimerOn: PropTypes.func.isRequired,
    setSound: PropTypes.func.isRequired
}


export default TimerButtons;