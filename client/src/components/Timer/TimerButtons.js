import React from "react";

import Button from '@material-ui/core/Button';


const TimerButtons = (props) => {
    const {setDisplayTime} = props;

    const addTime = (time) => {
        setDisplayTime(time);
    }

    return(
        <React.Fragment>
            <div style={{marginTop: 10, display: "flex", alignItems: "center", justifyContent:"center"}}>
                <Button onClick={() => addTime(25*60)} style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>25 minutes work</Button>
            </div>
            <div style={{marginTop: 10, display: "flex", alignItems: "center", justifyContent:"center"}}>
                <Button onClick={() => addTime(5*60)} style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>5 minutes break</Button>
            </div>
        </React.Fragment>
    );
}


export default TimerButtons;