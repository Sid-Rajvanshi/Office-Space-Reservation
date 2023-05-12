const dotenv = require('dotenv');
dotenv.config()

var express = require("express");
const http = require('http')
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mongoose = require("mongoose");
var cors = require("cors");

mongoose.connect(process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD)
, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    _response.database = "Healthy"
    console.log("Database Connected")
    console.log("server Started on PORT", PORT)
}).catch((err) => {
    _response.database = "Unhealthy"
    console.log("Error in connecting to DataBase", err.message)
})


var app = express();
let server = http.createServer(app);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 3005;



app.use("/availability", require("./routes/availabilityRoute"));
app.use("/reserve", require("./routes/reservationRoute"));

let _response = {}

app.use('/',(req,res)=>{
    res.status(200).json(_response)
})


server.listen(PORT, ()=>{
    _response.server = "Healthy"
})


module.exports = app;
