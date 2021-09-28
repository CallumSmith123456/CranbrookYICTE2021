
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

const port = new SerialPort('    ', {
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





var collectData = true;

var oldData = {
    tankLevel: 5400304020430230230203203,
}; 
// Sending data to the client
app.get('/sendData', async (req, res) => {
    var dataArray = []
    var readSerialLine = true; 
   
    parser.on("data", (line) => {

            
        var serialData; 
        
        dataArray.push(line);
        for (let i = dataArray.length; i > 0; i = i - 1) {
            if (dataArray[i] == "/\r") {

                digit1 = dataArray[i - 2];
                
                if (typeof digit1 != 'undefined') {    
                    digit1 = digit1.toString(); 
                    digit1 = digit1[0];

                    digit2 = dataArray[i - 1]; 
                    digit2 = digit2.toString(); 
                    digit2 = digit2[0];


                    serialData = digit1 + digit2;
                    break;
                }
            }
        }
        //console.log(dataArray);
        if (typeof serialData != 'undefined') {
            var volume = (tankHeight - serialData) * Math.PI * Math.pow(tankRadius, 2); //Calculate the volume of the tank 
            newData = {
                tankLevel: serialData,
                time: Date.now(), 
            }; 
            
            if (newData.tankLevel != oldData.tankLevel) {
                database.insert(newData); 
            }

            oldData = newData; 

            

            
            
            return;     //Store this data with a timestamp in the database
        }
        
    
       
    });
    

    database.find({}, (err, docs) => {
        res.send(docs); //Send all of the data to the client
        readSerialLine = false; 
        if(err) console.log(err); 
    });
});
