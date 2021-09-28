var dataY = []; 
var dataX = [];


google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(setData);


function getData() {
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.open("GET", '/sendData', false); 
    xmlhttp.send(null); 
    return xmlhttp.responseText; 
}

jsonData = getData();   
jsonData = JSON.parse(jsonData);  


//Sort JSON OBJECT

for (var j = 0; j < jsonData.length; j++) {
    for (var i = 0; i < (jsonData.length - j - 1); i++) {
        if (jsonData[i].time > jsonData[i+1].time) {
            var temp = jsonData[i]; 
            jsonData[i] = jsonData[i + 1];
            jsonData[i + 1] = temp;
        }
    }
}

console.log(jsonData);


for (let i = 0; i < jsonData.length; i++) {
    jsonData[i].tankLevel = parseInt(jsonData[i].tankLevel);
}

for (let i = 0; i < jsonData.length; i++) {
    dataY.push(jsonData[i].tankLevel); 
    dataX.push(jsonData[i].time); 
}

const theight = 40; //height of tank;
const capacity = 8;
var distance = dataY[dataY.length - 1];

var tcont = ((theight - distance) / theight) * capacity;
var message = "Content: " + tcont + "L" + " <br> " + "Capacity: " + capacity + "L";
document.getElementById("dynamic-info").innerHTML = message;


console.log(jsonData);

//Setting the data on the graph
function setData() { 
        data = google.visualization.arrayToDataTable([
            ['Time', 'Content'],
            [0, dataY[dataY.length - 0]],[2, dataY[dataY.length - 1]],[4, dataY[dataY.length - 2]],[6, dataY[dataY.length - 3]],[8, dataY[dataY.length - 4]],[10, dataY[dataY.length - 5]],[12, dataY[dataY.length - 6]]
        ]);

}


