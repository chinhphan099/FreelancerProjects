Question 1.
	// JSON - GET
	// API file (/json) have content:
	{
		name: 'John',
		age: '50'
	}
	
	//Code
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "/json", true);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			console.log('User informations:\nName: ' + data.name + '\nAge: ' + data.age);
		}
	};
	xhttp.send();

	// XML - POST
	var xhttp = new XMLHttpRequest(),
		xmlDoc,
		xml = "<?xml version='1.0'?><query><name>John Steinbeck</name></query>";

	xhttp.open('POST', '/user');
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			xmlDoc = xhttp.responseXML;
			console.log(xmlDoc);
		}
	};
	xhttp.setRequestHeader('Content-Type', 'text/xml');
	xhttp.send(xml);


Question 2.
	// Case 1
	function car() {
		this.carName = '';
		this.carColor = '';
		this.setInfo = function(name, color) {
			this.carName = name;
			this.carColor = color;
		}
		this.showInfo = function() {
			console.log('Your car informations:\nName: ' + this.carName + '\nColor: ' + this.carColor);
		}
		return this;
	}
	var declareCar = new car();
	declareCar.setInfo('Mercedes', 'Black');
	declareCar.showInfo();

	// Case 2
	var car = {
		carName: '',
		carColor: '',
		setInfo: function(name, color) {
			this.carName = name;
			this.carColor = color;
		},
		showInfo: function() {
			console.log('Your car informations:\nName: ' + this.carName + '\nColor: ' + this.carColor);
		}
	};
	car.setInfo('Mercedes', 'Black');
	car.showInfo();

Question 3.
	Please view here: https://codepen.io/chinhphan099/pen/bMNVrR

Question 5 and 6
	Please take a look into Question5n6/README.md first.
	Run the site at address: http://localhost:4444
