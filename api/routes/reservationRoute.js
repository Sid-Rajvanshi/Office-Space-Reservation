var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/Day").model;
const Reservation = require("../models/Reservation").model;

router.post("/", function (req, res, next) {
  Day.findOne({ date: req.body.date })
    .then((day) => {
      if (day) {
        let office = day.offices.find((office) => office._id == req.body.office);
        if (office) {
          office.reservation = new Reservation({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
          });
          office.isAvailable = false;

          const reser = new Reservation({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
          });

          Promise.all([day.save(), reser.save()])
            .then(() => {
              console.log("Reservation and details added");
              res.status(200).send("Reservation and details added");
            })
            .catch((err) => {
              console.log(err);
            });

          // day
          //   .save()
          //   .then(() => {
          //     console.log("Reserved");
          //     res.status(200).send("Added Reservation");
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //     res.status(400).send("Error adding reservation");
          //   });
        } else {
          console.log("Office not found");
        }
      } else {
        console.log("Day not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
