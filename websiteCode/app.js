
var tankHeight = 30; 
var tankRadius = 20; 

//Setting up express
const express = require('express')
app = express()

//Setting up nedb 
const Datastore = require('nedb'); 
const database = new Datastore('database.db'); 
database.loadDatabase(); 

//setting up serial port 
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('COM3', {
    baudRate: 9600,
});

//Setting up the parser
const parser = new Readline;
port.pipe(parser);

//Serving a static folder
app.use(express.static('public'))

//Starting the server
var server = app.listen(3000, (req, res) => {
    console.log("Server has started port 3000")
})

// Sending data to the client
app.get('/sendData', (req, res) => {
    parser.on("data", (line) => { 
        var serialData = line; //Receiving data from the arduino
        var volume = (1 - (serialData/tankHeight)) * Math.PI * Math.pow(tankRadius, 2) * tankHeight; //Calculate the volume of the tank 
        newData = {
            tankLevel: volume,
            time: Date.now(), 
        }; 
        database.insert(newData); //Store this data with a timestamp in the database
    }); 
    database.find({}, (err, docs) => {
        res.send(docs); //Send all of the data to the client
        if(err) console.log(err); 
    });

});

