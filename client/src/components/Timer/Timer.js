import React, {useState, useEffect} from "react";

import LiveTimer from "./LiveTimer";
import TimerButtons from "./TimerButtons";

import Typography from '@material-ui/core/Typography';


const Timer = () => {
    const [displayTime, setDisplayTime] = useState(60*25); // in seconds
    const [timerOn, setTimerOn] = useState(false);
    useEffect(() => {
        if (timerOn) {
        const timer = displayTime > 0 && setInterval(() => setDisplayTime(displayTime - 1), 1000);
        return () => clearInterval(timer);
        }
    }, [displayTime, timerOn]);
    
    
    let mins = Math.floor(displayTime/60);
    let seconds = displayTime % 60;
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return(
        <div>
          <Typography variant="h5" style={{userSelect: "none", display: "flex", alignItems: "center", justifyContent:"center"}}>
              Productivity Timer
          </Typography>
          <LiveTimer mins={mins} seconds={seconds} />
          <TimerButtons setDisplayTime={setDisplayTime} setTimerOn={setTimerOn} />
        </div>
    );
}


export default Timer;