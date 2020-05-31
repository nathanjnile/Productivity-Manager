const router = require("express").Router();
const Task = require("../../models/Task");
const Column = require("../../models/Column");
var ObjectId = require('mongodb').ObjectID;


// @route GET api/items
// @desc get All Items
// @access Public
router.route("/").get((req, res) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json("Error: " + err));
});

// // @route POST api/items/add
// // @desc Create a post
// // @access Private
router.route("/add").post((req, res) => {
    const content = req.body.content;
    const order = req.body.order;
    const column = req.body.columnId;
    const _id = new ObjectId();
    console.log(_id);
    

    const newTask = new Task({
        _id,
        content,
        order,
        column
    });

    const newTaskSavePromise = newTask.save();
    const ColumnArrayPromise =  Column.findByIdAndUpdate(column, {$push: {tasks: _id}});

    Promise.all([newTaskSavePromise, ColumnArrayPromise]).then((result) => {
        return res.status(200).json(result);
    }).catch(err => {{
        return res.status(400).json(err);
    }})
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

// // @route GET api/items/:id
// // @desc Get single item
// // @access Public
// router.route("/:id").get((req, res) => {
//     Item.findById(req.params.id)
//     .then(item => res.json(item))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// // @route Delete api/items/:id
// // @desc Delete single item
// // @access Public
// router.route("/:id").delete(auth, (req, res) => {
//     Item.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Item deleted."))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// // @route POST api/items/update/:id
// // @desc Update single item
// // @access Private
// router.route("/update/:id").post((req, res) => {
//     Item.findById(req.params.id)
//     .then(item => {
//         item.name = req.body.name;

//         item.save()
//         .then(() => res.json("Item updated!"))
//         .catch(err => res.status(400).json("Error: " + err))
//     })
//     .catch(err => res.status(400).json("Error: " + err));
// });


module.exports = router;