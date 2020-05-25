import React, {useEffect} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import classes from "./LongTermGoals.module.css";
import uuid from "uuid/v4";
import Card from '@material-ui/core/Card';
import * as actions from "../../store/actions/index";
import GoalModal from "./GoalModal";
import EditDeleteGoalModal from "./EditDeleteGoalModal";

import Typography from '@material-ui/core/Typography';


const LongTermGoals = (props) => {

    const onDragEnd = (result) => {
        if(!result.destination) return;
        const { source, destination } = result;
        props.onGoalMoved(source, destination);
    }

    const {items, onGetGoals } = props;

    useEffect(() => {
        onGetGoals();
        // console.log(items);
    }, [onGetGoals])

    return(
        <div>
          <Typography variant="h5" style={{userSelect: "none", display: "flex", alignItems: "center", justifyContent:"center"}}>
              Long Term Goals
          </Typography>
          <div className={classes.outerDragdropCon}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <div className={classes.columnDiv}> 
             <Droppable droppableId={uuid()} key={uuid()}>
               {(provided, snapshot) => {
                 return(
                    <div {...provided.droppableProps} ref={provided.innerRef} className={classes.columnMain}
                     style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"}}>
                        {items.map((item, index) => {
                            return(
                             <Draggable key={item._id} draggableId={item._id} index={index}>
                                {(provided, snapshot) => {
                                    return(
                                     <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                     className={classes.cardMain}
                                     style={{backgroundColor: snapshot.isDragging ? "#263B4A" : "#3F51B5",
                                     ...provided.draggableProps.style}}
                                     >
                                     <Typography variant="subtitle2" align="left" style={{color: "white"}}>
                                     {item.content} 
                                     </Typography>
                                     <Typography variant="subtitle2" align="right" style={{color: "white"}}>
                                     {item.date} 
                                     </Typography>
                                     <EditDeleteGoalModal cardId={item._id} cardIndex={index} />
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

const mapStateToProps = state => {
    return {
        items: state.goals.items
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGoalAdded: () => dispatch(actions.addGoal()),
        onGoalMoved: (source, destination) => dispatch(actions.goalMoved(source, destination)),
        onDeleteGoal: (newList) => dispatch(actions.deleteGoal(newList)),
        onGetGoals: () => dispatch(actions.getGoals())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(LongTermGoals);