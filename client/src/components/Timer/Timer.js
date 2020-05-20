import React, {useState, useEffect} from "react";

import LiveTimer from "./LiveTimer";
import TimerButtons from "./TimerButtons";
import ReactHowler from 'react-howler'
import alarmSound from "./sounds/soundbible_alarm.mp3";

import Typography from '@material-ui/core/Typography';

const Timer = () => {

    const [displayTime, setDisplayTime] = useState(25*60); // in seconds
    const [timerOn, setTimerOn] = useState(false);
    const [sound, setSound] = useState(false);
    useEffect(() => {
        if (timerOn) {
        const timer = displayTime > 0 && setInterval(() => setDisplayTime(displayTime - 1), 1000);
        if(displayTime === 0) {
            setSound(true);
        }
        return () => {
            clearInterval(timer);
        };
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
          {sound ? <ReactHowler src={alarmSound} playing={sound} /> : null}
          <TimerButtons setDisplayTime={setDisplayTime} setTimerOn={setTimerOn} setSound={setSound}/>
        </div>
    );
}


export default Timer;