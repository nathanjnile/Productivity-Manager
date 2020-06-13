const router = require("express").Router();
const Column = require("../../models/Column");
const Task = require("../../models/Task");
const ObjectId = require('mongodb').ObjectID;
const auth = require("../../middleware/auth");

// @route GET api/columns
// @desc get All columns, for testing purposes only
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const columns = await Column.find({owner: req.user._id});
        res.status(200).json(columns);
    }catch (error) {
        res.status(400).json("Error: " + error);
    }
});

// @route GET api/columns/tasks
// @desc get All columns and tasks together
// @access Private
router.get("/tasks", auth, (req, res) => {
    const TaskPromise = Task.find({owner: req.user._id});
    const ColumnPromise = Column.find({owner: req.user._id});

    Promise.all([TaskPromise, ColumnPromise]).then((result) => {
        return res.status(200).json(result);
    }).catch(error => {
        return res.status(400).json(error);
    })
});

// // @route POST api/columns/add
// // @desc Create a column
// // @access Private
router.post("/add", auth, async (req, res) => {
    const {name, columnOrder, owner} = req.body;
    const newColumn = new Column({ name, columnOrder, owner});

    try {
        const column = await newColumn.save();
        res.status(201).json(column);
    }catch (error) {
        res.status(400).json("Error: " + error);
    }
});

// // @route POST api/column/moveColumn
// // @desc Update column order
// // @access Private
router.post("/moveColumn", auth, (req, res) => {
    const {columnsUpdate} = req.body;
    var callback = function(error, r){
        if(error) {
            res.status(400).json(error);
            console.log(error)
        } else {
            res.json("Success!");
            console.log(r)
        }
    }
    console.log(columnsUpdate);
    // Initialise the bulk operations array
    var ops = columnsUpdate.map(function (col) {
            return { 
                "updateOne": { "filter": 
                { _id: new ObjectId(col._id) }, 
                "update": 
                {"$set": {"columnOrder": col.columnOrder}} 
                }
            }
    });

    try {
        Column.collection.bulkWrite(ops, callback);
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;