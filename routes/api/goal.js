const router = require("express").Router();
const Goal = require("../../models/Goal");
const util = require('util')
var ObjectId = require('mongodb').ObjectID;
const auth = require("../../middleware/auth");


// @route GET api/goals
// @desc get All Items
// @access Private
router.get("/", auth, (req, res) => {
    Goal.find({owner: req.user._id})
    .then(goals => res.json(goals))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/goals/add
// @desc Create a post
// @access Private
router.post("/add", auth, (req, res) => {
    const content = req.body.content;
    const date = req.body.date;
    const order = req.body.order;
    const owner = req.body.owner;

    const newGoal = new Goal({
        content,
        date,
        order,
        owner   
    });

    newGoal.save()
        .then((goal) => res.json(goal))
        .catch(err => res.status(400).json("2Error: " + err));
});

// @route POST api/goals/deleteAndUpdate
// @desc Delete the selected goal and update the order of the others
// @access Private
router.post("/deleteAndUpdate", auth, (req, res) => {
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

    let ops = [];
    
    if(itemsToReorder) {
        ops = itemsToReorder.map(function (goal) { 
            return { 
                "updateOne": { "filter": { _id: new ObjectId(goal._id), owner: req.user._id}, "update": { "$set": { "order": goal.order } } 
                }         
            }    
        });
    }

    ops.push({ "deleteOne": { "filter": { _id: new ObjectId(itemToDelete._id), owner: req.user._id }}});
    
    // Get the underlying collection via the native node.js driver collection object
    try {
        Goal.collection.bulkWrite(ops, callback);
    } catch (err) {
        console.log(error);
    }

    });

// @route POST api/goal/update/:id
// @desc Update single item
// @access Private
router.post("/update", auth, (req, res) => {
    Goal.findOne({_id: req.body._id, owner: req.user._id})
    .then(goal => {
        goal.content = req.body.content;
        goal.date = req.body.date;

        goal.save()
        .then(() => res.json("Goal updated!"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/updateMove
// @desc Reorder the goals when moved
// @access Private
router.post("/updateMove", auth, (req, res) => {
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
    let ops = newItems.map(function (goal) { 
        return { 
            "updateOne": { "filter": { _id: new ObjectId(goal._id), owner: req.user._id}, "update": { "$set": { "order": goal.order } } 
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