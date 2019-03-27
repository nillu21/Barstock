var today = new Date();
var clickswithin5mins = 0;
var current = 6.00;
var min = 6.00
var max = 10.00

var hours = today.getHours();
var minutes = today.getMinutes();
var seconds = today.getSeconds();
;
function test() {

	var table = gid("time2");
	

	var row = table.insertRow(1);
	cell1=row.insertCell(0);
	//cell1.innerHTML = time;
	//console.log("test works")
}




function gid(name1) {
	return document.getElementById(name1);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();	
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
  t = setTimeout(function() {
    startTime()
  }, 500);
}

startTime();

window.setInterval(timer, 1000);
window.addEventListener("keydown", enterorspace, false);
gid("drinks").innerHTML = 0;
function enterorspace(key) {
	if(key.keyCode == "32" || key.keyCode == "13") {
		clicked();
	}
}


function clicked() {
	clickswithin5mins++;
	console.log(clickswithin5mins);
	gid("drinks").innerHTML = clickswithin5mins;
	
	return clickswithin5mins;
}

function stock(drinkswithin5mins, current) {
	var min = 4.00;
	var max = 8.00;
	drinkValue = 2;
	var step = 0.5;
	var price = gid(price);
	if(current >= max && drinkswithin5mins >= drinkValue) {
		return min;
	} else if (drinkswithin5mins >= drinkValue) {
		console.log("joudsin +0.5");
		var fin = current + step;
		return current + step;
	} else if (current == min && drinkswithin5mins < drinkValue) {
		console.log("ei tõuse");
		return current;
	} else if (drinkswithin5mins < drinkValue) {
		console.log("joudsin -0.5")
		return current - step;
	}
} 
var currentSeconds = 0;
function timer() {
	var today = new Date();
	var m = today.getMinutes();
	var s = today.getSeconds();	
	m = m.toString();
	m = m.substring(1);
	m = parseInt(m);
	var currentPrice = 0;
	if (s == currentSeconds) {
		currentPrice = stock(clickswithin5mins, current);
		addValue(currentPrice);
		current = currentPrice;
		currentPrice = currentPrice.toFixed(2);
		gid("price").innerHTML = "" + currentPrice + "&euro;";
		
		clickswithin5mins = 0;
		gid("drinks").innerHTML = clickswithin5mins;

	}
	if (clickswithin5mins >= 2) {
		currentPrice = stock(clickswithin5mins, current);
		addValue(currentPrice);
		current = currentPrice;
		currentPrice = currentPrice.toFixed(2);
		gid("price").innerHTML = "" + currentPrice + "&euro;";
		clickswithin5mins = 0;
		gid("drinks").innerHTML = clickswithin5mins;
		if (currentSeconds >= 59) {currentSeconds = 1;}
		else { currentSeconds = s;}
	}
}
const mychart = gid("myChart");

var olddata = [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6];
var label = [" ", " ", " ", " ", " ", " "," "," "," "," "," "," "," "," "," "," "," "," "," ", " "];
let linechart = new Chart(mychart, {
	type: 'line',
		options: {
			legend: {
            display: false
         	},
	        responsive: false,
	        scales: {
	        	yAxes: [{
	        		ticks: {
	        			min: 4,
	        			max: 8,
	        			stepSize: 0.5
	        		}
	        	}]
	        }
	        },
	    // The data for our dataset
	    data: {
	        labels: label,
	        datasets: [{
	            label: "My First dataset",
	            backgroundColor: 'rgb(255, 255, 255)',
	            borderColor: 'rgb(255, 255, 255)',
	            fill: false,
	            data: olddata,
	        }]
	    },
})
function createchart() {
		
    	var ctx = document.getElementById('myChart').getContext('2d');
		var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    

	    // Configuration options go here
	    options: {}
	});
	gid("myChart").innerHTML = chart;
}

function updateChart() {
	linechart.data.datasets[0].data = [10,20,30,40,50,60,70];
	linechart.update();
}

function addValue(pastPrice) {
	linechart.data.datasets[0].data.shift();
	linechart.data.datasets[0].data.push(pastPrice);
	//chart.data.labels.push("August");
	//chart.data.labels.pop();
	//chart.data.labels.data.shift();
	linechart.update();
};