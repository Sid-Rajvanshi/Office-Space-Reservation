const mongoose = require('mongoose');

const reservationSchema =  require("./Reservation").schema;

let officeSchema = new mongoose.Schema({
    name: String,
    capacity: Number,
    isAvailable: Boolean,
    location: String,
    reservation: {
        required: false,
        type: reservationSchema
    }
});

let Office = mongoose.model("Office", officeSchema);

module.exports.model = Office;
module.exports.schema = officeSchema; 

