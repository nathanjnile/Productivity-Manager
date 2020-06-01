const router = require("express").Router();
const Column = require("../../models/Column");
const Task = require("../../models/Task");
const ObjectId = require('mongodb').ObjectID;

// @route GET api/items
// @desc get All Items
// @access Public
router.route("/").get((req, res) => {
    Column.find()
    .then(columns => res.json(columns))
    .catch(err => res.status(400).json("Error: " + err));
});


router.route("/tasks").get((req, res) => {
    const TaskPromise = Task.find();
    const ColumnPromise = Column.find();

    Promise.all([TaskPromise, ColumnPromise]).then((result) => {
        return res.status(200).json(result);
    }).catch(err => {{
        return res.status(400).json(err);
    }})

    // Column.find()
    // .populate("tasks")
    // .exec((err, cols) => {
    //     if(err) {
    //         res.json(err);
    //     }else {
    //         res.json(cols);
    //     }

    // })
    // .then(columns => res.json(columns))
    // .catch(err => res.status(400).json("Error: " + err));
});



// // @route POST api/items/add
// // @desc Create a post
// // @access Private
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

    // console.log(util.inspect(ops, false, null, true));
    // console.log("-------------------------")
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