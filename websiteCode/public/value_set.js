const capacity = 8; //tank capacity
const theight = 40; //height of tank;
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

for (let i = 0; i < jsonData.length; i++) {
    jsonData[i].tankLevel = parseInt(jsonData[i].tankLevel);
}



for (let i = 0; i < jsonData.length; i++) {
    dataY.push(jsonData[i].tankLevel); 
    dataX.push(jsonData[i].time); 
}



//Setting the data on the graph
function setData() { 
        data = google.visualization.arrayToDataTable([
            ['Time', 'Content'],
            [0, dataY[dataY.length - 0]],[2, dataY[dataY.length - 10]],[4, dataY[dataY.length - 20]],[6, dataY[dataY.length - 30]],[8, dataY[dataY.length - 40]],[10, dataY[dataY.length - 50]],[12, dataY[dataY.length - 60]]
        ]);

}


