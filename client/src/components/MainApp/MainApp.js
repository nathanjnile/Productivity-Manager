import React from "react";
import classes from "./MainApp.module.css";

import Todolist from "../Todolist/Todolist";


const MainApp = () => {

    return(
        <div className={classes.mainStyles}>
           <div className={classes.divStyle}>
                <Todolist/>
           </div>
            <div className={classes.divStyle1}>
                {/* <Timer/> */}
            </div>
            <div className={classes.divStyle2}>
                {/* <MealPlan/> */}
            </div>
        </div>
    );
}


export default MainApp;