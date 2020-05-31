const router = require("express").Router();
const Goal = require("../../models/Goal");
// const auth = require("../../middleware/auth");
const util = require('util')
var ObjectId = require('mongodb').ObjectID;


// @route GET api/goals
// @desc get All Items
// @access Public
router.route("/").get((req, res) => {
    Goal.find()
    .then(goals => res.json(goals))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/goals/add
// @desc Create a post
// @access Private
router.route("/add").post((req, res) => {
    const content = req.body.content;
    const date = req.body.date;
    const order = req.body.order;

    const newGoal = new Goal({
        content,
        date,
        order   
    });

    newGoal.save()
        .then((goal) => res.json(goal))
        .catch(err => res.status(400).json("2Error: " + err));
});

// // @route GET api/items/:id
// // @desc Get single item
// // @access Public
// router.route("/:id").get((req, res) => {
//     Item.findById(req.params.id)
//     .then(item => res.json(item))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// @route Delete api/items/:id
// @desc Delete single item
// @access Public
router.route("/:id").delete((req, res) => {
    Goal.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/deleteAndUpdate").post((req, res) => {
    const {itemToDelete, itemsToReorder} = req.body;
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
    let ops = itemsToReorder.map(function (item) { 
        return { 
            "updateOne": { "filter": { _id: new ObjectId(item._id) }, "update": { "$set": { "order": item.order } } 
            }         
        }    
    });

    ops.push({ "deleteOne": { "filter": { _id: new ObjectId(itemToDelete._id) }}});
    
    // Get the underlying collection via the native node.js driver collection object
    try {
        Goal.collection.bulkWrite(ops, callback);
    } catch (err) {
        console.log(error);
    }

    });

// @route POST api/items/update/:id
// @desc Update single item
// @access Private
router.route("/update/:id").post((req, res) => {
    Goal.findByIdAndUpdate(req.params.id)
    .then(goal => {
        goal.content = req.body.newContent;
        goal.date = req.body.newDate;

        goal.save()
        .then(() => res.json("Goal updated!"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/updateMove").post((req, res) => {
    const {newItems} = req.body;
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
    var ops = newItems.map(function (item) { 
        return { 
            "updateOne": { "filter": { _id: new ObjectId(item._id) }, "update": { "$set": { "order": item.order } } 
            }         
        }    
    });
    
    // Execute bulkwrite
    try {
        Goal.collection.bulkWrite(ops, callback);
    } catch (err) {
        console.log(err);
    }

    });

module.exports = router;