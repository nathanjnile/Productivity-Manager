const router = require("express").Router();
const Task = require("../../models/Task");
const Column = require("../../models/Column");
var ObjectId = require('mongodb').ObjectID;
const util = require('util')
const auth = require("../../middleware/auth");


// @route GET api/task
// @desc get All tasks, route not used in the app, testing only
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user._id});
        res.status(200).json(tasks);
    }catch (error) {
        res.status(400).send("Error: " + error);
    }
});

// // @route POST api/tasks/add
// // @desc Create a post
// // @access Private
router.post("/add", auth, async (req, res) => {
    const { content, order, column } = req.body;
    const owner = req.user._id;

    const newTask = new Task({content, order, column, owner});

    try {
        const task = await newTask.save();
        res.status(201).send({task});
    }catch (error) {
        res.status(400).send("Error: " + error);
    }
});

// // @route POST api/task/updateMove
// // @desc Updates the tasks which changed order within the same column
// // @access Private
router.post("/updateMove", auth, (req, res) => {
    const {newTasks} = req.body;
    var callback = function(error, r){
        if(error) {
            res.status(400).json(error);
            console.log(error)
        } else {
            res.json("Success!");
            console.log(r)
        }
    }
    // Initialise the bulk operations array
    var ops = newTasks.map(function (item) { 
        return { 
            "updateOne": { "filter": { _id: new ObjectId(item._id), owner: req.user._id }, "update": { "$set": { "order": item.order } } 
            }         
        }    
    });
    
    // Execute bulkwrite
    try {
        Task.collection.bulkWrite(ops, callback);
    } catch (error) {
        console.log(error);
    }

    });

// // @route POST api/task/updateMoveColumns
// // @desc Route for updating tasks if it moves to a different column
// // @access Private
router.post("/updateMoveColumn", auth, (req, res) => {
    const {newTasks} = req.body;
    var callback = function(error, r){
        if(error) {
            res.status(400).json(error);
            console.log(error)
        } else {
            res.json("Success!");
            console.log(r)
        }
    }
    // Initialise the bulk operations array
    var ops = newTasks.map(function (item) {
            return { 
                "updateOne": { "filter": 
                { _id: new ObjectId(item._id), owner: req.user._id }, 
                "update": 
                {"$set": {"order": item.order, "column": item.column}} 
                }
            }
    });

    try {
        Task.collection.bulkWrite(ops, callback);
    } catch (error) {
        console.log(error);
    }
});

// // @route POST api/task/deleteAndUpdate
// // @desc Route for deleting a task and reordering tasks in the same column
// // @access Private
router.post("/deleteAndUpdate", auth, (req, res) => {
    const {taskToDelete, tasksToReorder} = req.body;
    var callback = function(error, r){
        if(error) {
            res.status(400).json(error);
            console.log(error)
        } else {
            res.json("Success!");
            console.log(r)
        }
    }
    // Initialise the bulk operations array
    let ops = tasksToReorder.map(function (item) { 
        return { 
            "updateOne": { "filter": { _id: new ObjectId(item._id), owner: req.user._id }, "update": { "$set": { "order": item.order } } 
            }         
        }    
    });

    ops.push({ "deleteOne": { "filter": { _id: new ObjectId(taskToDelete) }}});
    
    try {
        Task.collection.bulkWrite(ops, callback);
    } catch (error) {
        console.log(error);
    }
    });

// // @route POST api/tasks/update/:id
// // @desc Update single tasks
// // @access Private
router.post("/update/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        task.content = req.body.content;
        try{
            await task.save();
        }catch (error) {
            res.status(400).send({msg: "Unable to save updated task"})
        }
        res.status(200).json("Task updated!");
    } catch (error) {
        res.status(400).send({msg: "Unable to update task"});
    }
});


module.exports = router;