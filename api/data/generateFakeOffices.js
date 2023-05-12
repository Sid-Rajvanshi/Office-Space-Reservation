const mongoose = require("mongoose");
const Office = require("../models/Office").model;

const fs = require("fs");

mongoose.connect(
  "mongodb+srv://Sid-Rajvanshi:Siddhussj2711@cluster0.1v3ujgf.mongodb.net/?retryWrites=true&w=majority"
);

const numOffices = Math.floor(Math.random() * 10 + 16);

let fakeOffices = [];

for (i = 1; i < numOffices; i++) {
  const workStations = Math.floor(Math.random() * 6) + 2;
  const name = `Office ${i}`;
  const location = ["Jaipur", "Udaipur", "Banglore", "Chennai", "Delhi"][Math.floor(Math.random() * 5)];

  const newOffice = new Office({
    name: name,
    capacity: workStations,
    isAvailable: true,
    location: location,
  });

//   newOffice.save();
  fakeOffices.push(newOffice);
}

let data = JSON.stringify({
  offices: fakeOffices,
});

fs.writeFileSync(__dirname + "/allOffices.json", data);
