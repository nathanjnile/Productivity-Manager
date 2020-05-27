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

// @route POST api/items/update/:id
// @desc Update single item
// @access Private
router.route("/update/:id").patch((req, res) => {
    Goal.findByIdAndUpdate(req.params.id)
    .then(goal => {
        goal.content = req.body.content;
        goal.date = req.body.date;

        goal.save()
        .then(() => res.json("Goal updated!"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/updateMove").post((req, res) => {
    const {newItems} = req.body;
    console.log(newItems);
    // console.log(req.body.newItems[0]._id);
    // let bulkOp = Goal.collection.initializeUnorderedBulkOp();

    // for(let i = 0; i < newItems.length; i++) {
    // let bulkOp = Goal.collection.initializeUnorderedBulkOp();
    //     console.log(newItems[i]);
    //     bulkOp.find({_id : newItems[i]._id}).update({order: newItems[i].order});
    //     bulkOp.execute((res => {
    //         console.log(res)
    //     }));
    var callback = function(err, r){
        console.log(err)
        console.log(r)
        // console.log(r.matchedCount);
        // console.log(r.modifiedCount);
    }
    // Initialise the bulk operations array
    var ops = newItems.map(function (item) { 
        console.log(item._id)
        console.log(item.order)
        return { 
            "updateOne": { "filter": { _id: new ObjectId(item._id) }, "update": { "$set": { "order": item.order } } 
            }         
        }    
    });

    console.log(util.inspect(ops, {showHidden: false, depth: null}));
    
    // Get the underlying collection via the native node.js driver collection object
    try {
        Goal.collection.bulkWrite(ops, callback);
    } catch (err) {
        console.log(error);
    }

    });



    // Goal.findByIdAndUpdate(req.body.newItems[0]._id)
    // .then(goal => {
    //     goal.order = req.body.newItems[0].order
    //     // console.log("here")

    //     goal.save()
    //     .then(() => res.json("Goal updated!"))
    //     .catch(err => res.status(400).json("Error: " + err))
    // })
    // .catch(err => res.status(400).json("Error: " + err));


module.exports = router;