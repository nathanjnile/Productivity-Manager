import React from "react";
import Typography from "@material-ui/core/Typography";

interface LiveTimerProps {
  mins: string;
  seconds: string;
}

export const LiveTimer: React.FC<LiveTimerProps> = ({ mins, seconds }) => {
  return (
    <div>
      <Typography
        variant="h3"
        style={{
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {mins}:{seconds}
      </Typography>
    </div>
  );
};
