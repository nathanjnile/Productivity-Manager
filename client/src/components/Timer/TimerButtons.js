import React, { useState } from "react";

import classes from "./TimerButtons.module.css";
import Button from '@material-ui/core/Button';


const TimerButtons = (props) => {
    const {setDisplayTime, setTimerOn} = props;
    const [timerType, setTimerType] = useState("25work");

    const addTime = (time, lengthType) => {
        // setTimerOn(true);
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

    return(
        <React.Fragment>
            <div className={classes.ButtonWorkBreak}>
                <Button onClick={() => addTime(25*60, "25work")} style={{backgroundColor: "#3F51B5", color:"#FFFFFF", width: 180}}>25 minutes work</Button>
            </div>
            <div className={classes.ButtonWorkBreak}>
                <Button onClick={() => addTime(5*60, "5break")} style={{backgroundColor: "#3F51B5", color:"#FFFFFF", width: 180}}>5 minutes break</Button>
            </div>
            <div className={classes.Button}>
            <div className={classes.Button}>
                <Button onClick={() => setTimerOn(true)} style={{backgroundColor: "green", color:"#FFFFFF", width: 70}}>Start</Button>
            </div>
            <div className={classes.Button}>
                <Button onClick={() => setTimerOn(false)} style={{backgroundColor: "red", color:"#FFFFFF", width: 70}}>Stop</Button>
            </div>
            <div className={classes.Button}>
                <Button onClick={() => resetTime()} style={{backgroundColor: "#3F51B5", color:"#FFFFFF", width: 70}}>Reset</Button>
            </div>
            </div>
        </React.Fragment>
    );
}


export default TimerButtons;