const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    content: {type:String, required: true},
    date: {type:String, required: true},
});

const Goal = mongoose.model("goal", goalSchema);

module.exports = Goal;