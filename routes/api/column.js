const router = require("express").Router();
const Column = require("../../models/Column");
const Task = require("../../models/Task");
const ObjectId = require('mongodb').ObjectID;

// @route GET api/columns
// @desc get All columns
// @access Public
router.route("/").get((req, res) => {
    Column.find()
    .then(columns => res.json(columns))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route GET api/columns/tasks
// @desc get All columns and tasks together
// @access Public
router.route("/tasks").get((req, res) => {
    const TaskPromise = Task.find();
    const ColumnPromise = Column.find();

    Promise.all([TaskPromise, ColumnPromise]).then((result) => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(400).json(err);
    })
});

// // @route POST api/columns/add
// // @desc Create a column
// // @access Public
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const columnOrder = req.body.columnOrder;

    const newColumn = new Column({
        name,  
        columnOrder,
    });

    newColumn.save()
        .then((column) => res.json(column))
        .catch(err => res.status(400).json("2Error: " + err));
});

// // @route POST api/column/moveColumn
// // @desc Update column order
// // @access Private
router.route("/moveColumn").post((req, res) => {
    const {columnsUpdate} = req.body;
    var callback = function(err, r){
        if(err) {
            res.status(400).json(err);
            console.log(err)
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
    } catch (err) {
        console.log(err);
    }
});



module.exports = router;