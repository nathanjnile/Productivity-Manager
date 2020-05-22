const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    name: {type:String, required: true},
    date: {type:Date, default: Date.now, required: true},
});

const Tasks = mongoose.model("tasks", tasksSchema);

module.exports = Tasks;