const router = require("express").Router();
const Goal = require("../../models/Goal");
const util = require('util')
var ObjectId = require('mongodb').ObjectID;
const auth = require("../../middleware/auth");


// @route GET api/goals
// @desc get All Goals
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const goals = await Goal.find({owner: req.user._id});
        res.status(200).json(goals);
    }catch (error) {
        res.status(400).json("Error: " + error);
    }
});

// @route POST api/goals/add
// @desc Create a post
// @access Private
router.post("/add", auth, async (req, res) => {
    const content = req.body.content;
    const date = req.body.date;
    const order = req.body.order;
    const owner = req.body.owner;

    const newGoal = new Goal({content, date, order, owner});

    try {
        const goal = await newGoal.save();
        res.status(201).json(goal);
    }catch (error) {
        res.status(400).json("Error: " + error);
    }
});

// @route POST api/goals/deleteAndUpdate
// @desc Delete the selected goal and update the order of the others
// @access Private
router.post("/deleteAndUpdate", auth, (req, res) => {
    const {itemToDelete, itemsToReorder} = req.body;
    var callback = function(error, r){
        if(error) {
            res.status(400).json(error);
            console.log(error)
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
    
    try {
        Goal.collection.bulkWrite(ops, callback);
    } catch (error) {
        console.log(error);
    }

    });

// @route POST api/goal/update/:id
// @desc Update single item
// @access Private
router.post("/update", auth, async (req, res) => {
    try {
        const goal = await Goal.findOne({_id: req.body._id, owner: req.user._id});
        goal.content = req.body.content;
        goal.date = req.body.date;
        try{
            await goal.save();
        }catch (error) {
            res.status(400).send({msg: "Unable to save updated goal"})
        }
        res.status(200).json("Task updated!");
    } catch (error) {
        res.status(400).send({msg: "Unable to update goal"});
    }
});

// @route POST api/updateMove
// @desc Reorder the goals when moved
// @access Private
router.post("/updateMove", auth, (req, res) => {
    const {newItems} = req.body;
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
    let ops = newItems.map(function (goal) { 
        return { 
            "updateOne": { "filter": { _id: new ObjectId(goal._id), owner: req.user._id}, "update": { "$set": { "order": goal.order } } 
            }         
        }    
    });
    
    // Execute bulkwrite
    try {
        Goal.collection.bulkWrite(ops, callback);
    } catch (error) {
        console.log(error);
    }

    });

module.exports = router;