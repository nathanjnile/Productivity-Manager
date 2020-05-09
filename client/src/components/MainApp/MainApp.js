import React from "react";
import classes from "./MainApp.module.css";

import Todolist from "../Todolist/Todolist";
import Timer from "../Timer/Timer";
import LongTermGoals from "../LongTermGoals/LongTermGoals";


const MainApp = () => {

    return(
        <div className={classes.mainStyles}>
           <div className={classes.divStyle}>
                <Todolist/>
           </div>
            <div className={classes.divStyle1}>
                <Timer/>
            </div>
            <div className={classes.divStyle2}>
                <LongTermGoals/>
            </div>
        </div>
    );
}


export default MainApp;