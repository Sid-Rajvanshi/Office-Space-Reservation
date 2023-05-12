const mongoose = require("mongoose");
const Office = require("../models/Office").model;
const fs = require("fs");

mongoose.connect(
  "mongodb+srv://Sid-Rajvanshi:Siddhussj2711@cluster0.1v3ujgf.mongodb.net/?retryWrites=true&w=majority"
);

let officeData = fs.readFileSync(__dirname + "/allOffices.json");
officeData = JSON.parse(officeData).offices;

let allOffices = [];

officeData.forEach(office => {
    allOffices.push(new Office(office));
})

// Office.find()
//   .then((offices) => {
//     offices.forEach((office) => {
//       allOffices.push(office);
//     });
//     console.log(allOffices);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = allOffices;
