google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

var tcont = tcont;

var tank1 = document.getElementsByClassName("tank");
for (var n = 0; n < tank1.length; n++) {
    var percent = null;
    for (var i = 0; i < tank1[n].childNodes.length; i++) {
        if (tank1[n].childNodes[i].className == "percent") {
            percent = tank1[n].childNodes[i];
        }
    }

    var s = (document.getElementsByClassName("exact")[n].innerHTML).split(" ");
    var content = s[1];
    var cont = content
    content = content.replace("L", "");
    var exact = s[s.length - 1];
    var cap = exact;
    exact = exact.replace("L", "");
    percent.innerHTML = Math.round(content / exact * 100) + "%";

    var im = document.getElementsByClassName("im");
    var water = null;


    for (var i = 0; i < im[n].childNodes.length; i++) {
        if (im[n].childNodes[i].className == "water") {
            water = im[n].childNodes[i];
            percent = content/exact;
            var ntop = water.style.top;
            var top = ntop;
            var a = ntop.replace("px", "");

            var nheight = water.style.height;
            var height = nheight.replace("px", "");
            height = height * percent;

            var b = Number(nheight.replace("px", ""));
            a = Number(a) + b - height;

            height = height + "px";
            water.style.height = height;

            a = a + "px";
            water.style.top = a;
        }
    }
}

var label = document.getElementsByClassName("tanklabel");
for (let i = 0; i < label.length; i++) {
    label[i].innerHTML = "Tank " + (i + 1);
}

label = document.getElementsByClassName("chart-title");
for (let i = 0; i < label.length; i++) {
    label[i].innerHTML = "Tank " + (i + 1);
}

exact = Number(exact);
if (exact % 2 != 0) {
    exact = Math.ceil(exact);
    if (exact % 2 != 0) {
        exact += 1;
    }
}

var data = data;
function drawChart() {
    // Set Options
    var options = {
      vAxis: {title: 'Content (L)', gridlines: { count: exact/2 }, maxValue: exact, minValue: 0 },
      hAxis: {title: 'Hours Ago', gridlines: { count: 6 }, direction: -1 },
      legend: 'none'
    };
    // Draw Chart
    var chart = new google.visualization.LineChart(document.getElementById('myChart'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ['Time', 'Content'],
        [0,7],[2,7],[4,6],[6,6],[8,6],[10,7],[12,7]
    ]);
    chart = new google.visualization.LineChart(document.getElementById('chart2'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ['Time', 'Content'],
        [0,0],[2,3],[4,6],[6,6],[8,6],[10,8],[12,8]
    ]);
    chart = new google.visualization.LineChart(document.getElementById('chart3'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ['Time', 'Content'],
        [0,5],[2,5],[4,5],[6,5],[8,2],[10,0],[12,0]
    ]);
    chart = new google.visualization.LineChart(document.getElementById('chart4'));
    chart.draw(data, options);
}