const router = require("express").Router();
const Task = require("../../models/Task");
const Column = require("../../models/Column");
var ObjectId = require('mongodb').ObjectID;
const util = require('util')


// @route GET api/tasks
// @desc get All Items
// @access Public
router.route("/").get((req, res) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json("Error: " + err));
});

// // @route POST api/tasks/add
// // @desc Create a post
// // @access Public
router.route("/add").post((req, res) => {
    const content = req.body.content;
    const order = req.body.order;
    const column = req.body.column;
    
    const newTask = new Task({
        content,
        order,
        column
    });

    newTask.save().then((task) => res.json(task))
    .catch(err => res.status(400).json("Error: " + err));
});

// // @route POST api/task/updateMove
// // @desc Updates the tasks which changed order within the same column
// // @access Public
router.route("/updateMove").post((req, res) => {
    const {newTasks} = req.body;
    var callback = function(err, r){
        if(err) {
            res.status(400).json(err);
            console.log(err)
        } else {
            res.json("Success!");
            console.log(r)
        }
    }
    // Initialise the bulk operations array
    var ops = newTasks.map(function (item) { 
        return { 
            "updateOne": { "filter": { _id: new ObjectId(item._id) }, "update": { "$set": { "order": item.order } } 
            }         
        }    
    });
    
    // Execute bulkwrite
    try {
        Task.collection.bulkWrite(ops, callback);
    } catch (err) {
        console.log(err);
    }

    });

// // @route POST api/task/updateMove
// // @desc Route for updating tasks if it moves to a different column
// // @access Public
router.route("/updateMoveColumn").post((req, res) => {
    const {newTasks} = req.body;
    var callback = function(err, r){
        if(err) {
            res.status(400).json(err);
            console.log(err)
        } else {
            res.json("Success!");
            console.log(r)
        }
    }
    // Initialise the bulk operations array
    var ops = newTasks.map(function (item) {
            return { 
                "updateOne": { "filter": 
                { _id: new ObjectId(item._id) }, 
                "update": 
                {"$set": {"order": item.order, "column": item.column}} 
                }
            }
    });

    try {
        Task.collection.bulkWrite(ops, callback);
    } catch (err) {
        console.log(err);
    }
});

// // @route POST api/task/deleteAndUpdate
// // @desc Route for deleting a task and reordering tasks in the same column
// // @access Public
router.route("/deleteAndUpdate").post((req, res) => {
    const {taskToDelete, tasksToReorder} = req.body;
    var callback = function(err, r){
        if(err) {
            res.status(400).json(err);
            console.log(err)
        } else {
            res.json("Success!");
            console.log(r)
        }
    }
    // Initialise the bulk operations array
    let ops = tasksToReorder.map(function (item) { 
        return { 
            "updateOne": { "filter": { _id: new ObjectId(item._id) }, "update": { "$set": { "order": item.order } } 
            }         
        }    
    });

    ops.push({ "deleteOne": { "filter": { _id: new ObjectId(taskToDelete) }}});
    
    try {
        Task.collection.bulkWrite(ops, callback);
    } catch (err) {
        console.log(error);
    }
    });

// // @route POST api/tasks/update/:id
// // @desc Update single tasks
// // @access Public
router.route("/update/:id").post((req, res) => {
    Task.findByIdAndUpdate(req.params.id)
    .then(task => {
        task.content = req.body.content;

        task.save()
        .then(() => res.json("Task updated!"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;