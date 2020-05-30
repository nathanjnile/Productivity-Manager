const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    content: {type:String, required: true},
    order: {type: Number, required: true},
    column: { type: Schema.Types.ObjectId, ref: 'column' }
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;