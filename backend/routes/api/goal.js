const router = require("express").Router();
const Goal = require("../../models/Goal");
// const auth = require("../../middleware/auth");

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



module.exports = router;