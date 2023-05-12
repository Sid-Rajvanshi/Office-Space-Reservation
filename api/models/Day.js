const mongoose = require('mongoose');

const officeSchema = require("./Office").schema;

let daySchema = new mongoose.Schema({
    date: Date,
    offices: [officeSchema]
});

let Day = mongoose.model("Day", daySchema);

module.exports.model = Day;
module.exports.schema = daySchema; 

