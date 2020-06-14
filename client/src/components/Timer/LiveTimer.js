import React from "react";
import PropTypes from "prop-types";

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

LiveTimer.propTypes = {
  mins: PropTypes.number.isRequired,
  seconds: PropTypes.string.isRequired,
}

export default LiveTimer;