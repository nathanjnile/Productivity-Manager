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

// // @route POST api/column/update/:id
// // @desc Update single tasks
// // @access Private
router.post("/update/:id", auth, async (req, res) => {
    try {
        const column = await Column.findOne({_id: req.params.id, owner: req.user._id});
        column.name = req.body.name;
        try{
            await column.save();
        }catch (error) {
            res.status(400).send({msg: "Unable to save updated column"})
        }
        res.status(200).json("Column updated!");
    } catch (error) {
        res.status(400).send({msg: "Unable to update column"});
    }
});

// // @route POST api/column/deleteAndUpdate
// // @desc Route for deleting a column and reordering columns
// // @access Private
router.post("/deleteAndUpdate", auth, (req, res) => {
    const {columnToDelete, columnsToReorder} = req.body;
    console.log(columnsToReorder)
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
    let ops = columnsToReorder.map(function (col) { 
        return { 
            "updateOne": { "filter": { _id: new ObjectId(col[0]), owner: req.user._id }, "update": { "$set": { "columnOrder": col[1].columnOrder } } 
            }         
        }    
    });

    ops.push({ "deleteOne": { "filter": { _id: new ObjectId(columnToDelete), owner: req.user._id }}});
    
    const bulkPromise = Column.collection.bulkWrite(ops);
    const TaskPromise = Task.deleteMany({ column: new ObjectId(columnToDelete), owner: req.user._id})

    Promise.all([bulkPromise, TaskPromise]).then((result) => {
        return res.status(200).json(result);
    }).catch(error => {
        return res.status(400).json(error);
    })

})



module.exports = router;