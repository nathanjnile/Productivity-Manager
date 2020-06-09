const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const columnSchema = new Schema({
    name: {type:String, required: true},
    columnOrder: {type: Number, required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, required: true}
    // tasks: [{ type: Schema.Types.ObjectId, ref: 'task'}]
});

const Column = mongoose.model("column", columnSchema);

module.exports = Column;