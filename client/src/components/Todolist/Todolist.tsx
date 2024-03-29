import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classes from "./Todolist.module.css";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import { ListColumn } from "./ListColumn/ListColumn";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import * as actions from "../../store/actions/index";
import { RootState } from "../..";
import { Column } from "../../store/types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const Todolist: React.FC = () => {
  const [enterAddList, setEnterAddList] = useState(true);
  const [listFieldInput, setListFieldInput] = useState("");
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const columns: Column[] = useSelector(
    (state: RootState) => state.tasks.columns
  );

  useEffect(() => dispatch(actions.getTasks()), [dispatch]);

  const submitForm = (
    event:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (listFieldInput !== "") {
      const columnsLength = Object.entries({ ...columns }).length;
      dispatch(actions.addList(listFieldInput, columnsLength));
    }
    clearAddList();
  };

  const clearAddList = () => {
    setEnterAddList(true);
    setListFieldInput("");
  };

  const listField = (
    <ClickAwayListener onClickAway={clearAddList}>
      <form onSubmit={(event) => submitForm(event)} style={{ width: 200 }}>
        <TextField
          id="Task-field"
          label="Add List"
          size="small"
          value={listFieldInput}
          onChange={(event) => setListFieldInput(event.target.value)}
          variant="outlined"
          style={{ width: "100%", userSelect: "none" }}
          autoFocus
        />
        <div className={classes.addListIcons}>
          <CheckIcon
            type="submit"
            onClick={(event) => submitForm(event)}
            fontSize="large"
            className={classes.addListIconCheck}
          />
          <CancelIcon
            onClick={() => clearAddList()}
            fontSize="large"
            className={classes.addListIconCancel}
          />
        </div>
      </form>
    </ClickAwayListener>
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    if (type === "column") {
      if (source.index !== destination.index) {
        dispatch(actions.columnMoved(source, destination, columns));
      } else return;
    } else {
      if (source.droppableId !== destination.droppableId) {
        dispatch(actions.taskMovedColumn(source, destination, columns));
      } else {
        if (source.index !== destination.index) {
          dispatch(actions.taskMoved(source, destination, columns));
        } else return;
      }
    }
  };

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        style={{
          userSelect: "none",
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          marginBottom: 10,
          marginLeft: 10,
        }}
      >
        Task Tracker
      </Typography>
      <div className={classes.outerDragdropCon}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable
            droppableId="all-column"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className={classes.columnDrop}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Object.entries(columns).map(([_id, column], index) => {
                  return (
                    <Draggable key={_id} draggableId={_id} index={index}>
                      {(provided) => (
                        <ListColumn
                          provided={provided}
                          column={column}
                          _id={_id}
                          columnIndex={index}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div style={{ width: 200 }}>
          {enterAddList ? (
            <Button
              onClick={() => setEnterAddList(false)}
              className={classes.addListButton}
              style={{
                backgroundColor: "#3F51B5",
                color: "#ffffff",
                textTransform: "none",
              }}
            >
              {" "}
              Add List{" "}
            </Button>
          ) : (
            listField
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
