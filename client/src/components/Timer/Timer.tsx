import React, { useState, useEffect } from "react";

import { LiveTimer } from "./LiveTimer";
import { TimerButtons } from "./TimerButtons";
import ReactHowler from "react-howler";
// @ts-ignore
import alarmSound from "./sounds/soundbible_alarm.mp3";

import Typography from "@material-ui/core/Typography";

export const Timer: React.FC = () => {
  const [displayTime, setDisplayTime] = useState(25 * 60); // in seconds
  const [timerOn, setTimerOn] = useState(false);
  const [sound, setSound] = useState(false);
  useEffect(() => {
    if (displayTime === 0) setSound(true);
    if (timerOn && displayTime > 0) {
      const timer = setInterval(() => setDisplayTime(displayTime - 1), 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [displayTime, timerOn]);

  const mins = Math.floor(displayTime / 60);
  const seconds = displayTime % 60;
  const minsString = mins < 10 ? "0" + mins.toString() : mins.toString();
  const secondsString =
    seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  return (
    <div>
      <Typography
        variant="h5"
        style={{
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Productivity Timer
      </Typography>
      <LiveTimer mins={minsString} seconds={secondsString} />
      {sound && <ReactHowler src={alarmSound} playing={sound} />}
      <TimerButtons
        setDisplayTime={setDisplayTime}
        setTimerOn={setTimerOn}
        setSound={setSound}
      />
    </div>
  );
};
