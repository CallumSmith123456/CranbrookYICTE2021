var time = new Date().toString();
time = time.split(" ");

var time1 = [];
for (let i = 0; i < 4; i++) {
    time1.push(time[i]);
}
var temp = time1;
time1 = "";
for (let i = 0; i < temp.length; i++) {
    time1 = time1 + temp[i] + " ";
}
var time2 = time[4];

var message = "Tank data last refreshed on " + time1 + "at " + time2 + " (AEST)";
document.getElementById("time").innerHTML = message;

