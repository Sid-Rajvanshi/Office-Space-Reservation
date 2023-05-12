var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const db = mongoose.connection;

const Day = require("../models/Day").model;

router.post("/", function (req, res) {
  console.log("Request Attempted");
  // console.log(req.body.date);

  const dateTime = new Date(req.body.date);

  Day.find({ date: req.body.date })
    .then((docs) => {
      if (docs.length > 0) {
        console.log("Record exists. Sent docs.");
        res.status(200).send(docs[0]);
      } else {
        const allOffices = require("../data/allOffices");
        const day = new Day({
          date: req.body.date,
          offices: allOffices,
        });


        db.collection("days").insertOne(day)
          .then(() => {
            console.log("Created new datetime. Here are default docs");
            return Day.findOne({ date: dateTime });
          })
          .then((doc) => {
            res.status(200).send(doc);
          })
          .catch((err) => {
            console.error(err);
            res.status(400).send("Error saving new data");
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;
