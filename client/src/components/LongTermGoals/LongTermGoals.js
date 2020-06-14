import React, {useEffect} from "react";
import PropTypes from "prop-types";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import classes from "./LongTermGoals.module.css";
import Card from '@material-ui/core/Card';
import * as actions from "../../store/actions/index";
import GoalModal from "./GoalModal";
import EditDeleteGoalModal from "./EditDeleteGoalModal";

import Typography from '@material-ui/core/Typography';


const LongTermGoals = (props) => {
    const {onGoalMoved, goals, onGetGoals} = props;

    const onDragEnd = (result) => {
        if(!result.destination) return;
        const { source, destination } = result;
        onGoalMoved(source, destination, goals);
    }

    useEffect(() => {
        onGetGoals();
    }, [onGetGoals])

    return(
        <div>
          <Typography variant="h5" style={{userSelect: "none", display: "flex", alignItems: "center", justifyContent:"center"}}>
              Long Term Goals
          </Typography>
          <div className={classes.outerDragdropCon}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <div className={classes.columnDiv}> 
             <Droppable droppableId={"column"}>
               {(provided, snapshot) => {
                 return(
                    <div {...provided.droppableProps} ref={provided.innerRef} className={classes.columnMain}
                     style={{background: snapshot.isDraggingOver ? "darkgrey" : "lightgrey"}}>
                        {goals.map((goal, index) => {
                            return(
                             <Draggable key={goal._id} draggableId={goal._id} index={index}>
                                {(provided, snapshot) => {
                                    return(
                                     <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                     className={classes.cardMain}
                                     style={{backgroundColor: snapshot.isDragging ? "#263B4A" : "#3F51B5",
                                     ...provided.draggableProps.style}}
                                     >
                                        <Typography variant="subtitle2" align="left" style={{color: "white"}}>
                                        {goal.content} 
                                        </Typography>
                                        <Typography variant="subtitle2" align="right" style={{color: "white"}}>
                                        {new Date(goal.date).getDate() + "/" + (new Date(goal.date).getMonth() + 1)+ "/" + new Date(goal.date).getFullYear()}
                                        </Typography>
                                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 5}}>
                                        <EditDeleteGoalModal cardId={goal._id} cardIndex={index} />
                                     </div>
                                     </Card>
                                     );
                                     }}
                             </Draggable>
                             );
                          })}
                {provided.placeholder}
            </div>
            );
        }}
        </Droppable>
        <GoalModal/>
    </div>
</DragDropContext>
</div>
</div>
);
}

LongTermGoals.propTypes = {
    goals: PropTypes.array.isRequired,
    onGoalMoved: PropTypes.func.isRequired,
    onGetGoals: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        goals: state.goals.goals
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGoalMoved: (source, destination, goals) => dispatch(actions.goalMoved(source, destination, goals)),
        onGetGoals: () => dispatch(actions.getGoals())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(LongTermGoals);