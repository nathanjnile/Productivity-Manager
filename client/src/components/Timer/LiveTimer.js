import React from "react";

import Typography from '@material-ui/core/Typography';


const LiveTimer = (props) => {
    const {mins, seconds} = props;

    return(
        <div>
          <Typography variant="h3" style={{userSelect: "none", display: "flex", alignItems: "center", justifyContent:"center"}}>
                {mins}:{seconds}
          </Typography>
        </div>
    );
}

// test git push

export default LiveTimer;