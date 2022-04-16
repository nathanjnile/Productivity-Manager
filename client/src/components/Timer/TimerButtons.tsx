import React, { useState } from "react";

import classes from "./TimerButtons.module.css";
import Button from "@material-ui/core/Button";

interface TimerButtonsProps {
  setDisplayTime: React.Dispatch<React.SetStateAction<number>>;
  setTimerOn: React.Dispatch<React.SetStateAction<boolean>>;
  setSound: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TimerButtons: React.FC<TimerButtonsProps> = ({
  setDisplayTime,
  setTimerOn,
  setSound,
}) => {
  const [timerType, setTimerType] = useState("25work");

  const addTime = (time: number, lengthType: string) => {
    setDisplayTime(time);
    setTimerType(lengthType);
  };

  const resetTime = () => {
    setTimerOn(false);
    if (timerType === "25work") setDisplayTime(25 * 60);
    if (timerType === "5break") setDisplayTime(5 * 60);
  };

  const handleStop = () => {
    setTimerOn(false);
    setSound(false);
  };

  return (
    <>
      <div className={classes.ButtonWorkBreak}>
        <Button
          onClick={() => addTime(25 * 60, "25work")}
          style={{
            backgroundColor: "#3F51B5",
            color: "#FFFFFF",
            width: 180,
            textTransform: "none",
          }}
        >
          25 minutes work
        </Button>
      </div>
      <div className={classes.ButtonWorkBreak}>
        <Button
          onClick={() => addTime(5 * 60, "5break")}
          style={{
            backgroundColor: "#3F51B5",
            color: "#FFFFFF",
            width: 180,
            textTransform: "none",
          }}
        >
          5 minutes break
        </Button>
      </div>
      <div className={classes.Button}>
        <div className={classes.Button}>
          <Button
            onClick={() => setTimerOn(true)}
            style={{
              backgroundColor: "green",
              color: "#FFFFFF",
              width: 70,
              opacity: 0.8,
              textTransform: "none",
            }}
          >
            Start
          </Button>
        </div>
        <div className={classes.Button}>
          <Button
            onClick={() => handleStop()}
            style={{
              backgroundColor: "red",
              color: "#FFFFFF",
              width: 70,
              opacity: 0.8,
              textTransform: "none",
            }}
          >
            Stop
          </Button>
        </div>
        <div className={classes.Button}>
          <Button
            onClick={() => resetTime()}
            style={{
              backgroundColor: "#3F51B5",
              color: "#FFFFFF",
              width: 70,
              textTransform: "none",
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
};
