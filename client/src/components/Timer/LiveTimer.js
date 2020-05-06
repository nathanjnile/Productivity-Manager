import React from "react";

import Typography from '@material-ui/core/Typography';


const LiveTimer = (props) => {
    const {mins, seconds} = props;
    // const [displayTime, setDisplayTime] = useState(20); // in seconds
    
    // useEffect(() => {
    //     const timer = displayTime > 0 && setInterval(() => setDisplayTime(displayTime - 1), 1000);
    //     return () => clearInterval(timer);
    // }, [displayTime]);
    
    
    // let mins = Math.floor(displayTime/60);
    // let seconds = displayTime % 60;
    // if (mins < 10) {
    //     mins = "0" + mins;
    // }
    // if (seconds < 10) {
    //     seconds = "0" + seconds;
    // }

    return(
        <div>
          <Typography variant="h6" style={{userSelect: "none", display: "flex", alignItems: "center", justifyContent:"center"}}>
                {mins}:{seconds}
          </Typography>
        </div>
    );
}


export default LiveTimer;