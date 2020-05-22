const router = require("express").Router();
const Goals = require("../../models/Goals");
// const auth = require("../../middleware/auth");

// @route GET api/items
// @desc get All Items
// @access Public
router.route("/").get((req, res) => {
    Goals.find()
    .sort({date: -1 }) 
    .then(goals => res.json(goals))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/goals/add
// @desc Create a post
// @access Private
router.route("/add").post((req, res) => {
    const content = req.body.content;
    const date = req.body.date;

    const newGoal = new Goals({
        content,
        date   
    });

    newGoal.save()
        .then((goals) => res.json(goals))
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