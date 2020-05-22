const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalsSchema = new Schema({
    content: {type:String, required: true},
    date: {type:Date, default: Date.now, required: true},
});

const Goals = mongoose.model("goals", goalsSchema);

module.exports = Goals;