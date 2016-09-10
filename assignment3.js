var speed;
var weatherIconsrc;
var weatherDescription;
var temperature;
var humidity;
var iconValue;
var celsius = 272.15;
var weatherData = "";
var cityName = "";
var countryName = "";


/* the function to use the api, in this case we are using our id "76391fc36736922b299a9be10ed6fdfc"
and using the data of the postal code of new westminster.

We need to display the weather icon, temperature, humidity, wind speed
*/
function loadData() {
 
  var city = document.getElementById('city').value;
  var postcode = document.getElementById('postalCode').value;

  if(city == "" && postcode=="") 
  {
  	alert("City and Postcode cannot be both empty");
  	 //weather = "http://api.openweathermap.org/data/2.5/weather?zip=,q=richmond,Canada&appid=76391fc36736922b299a9be10ed6fdfc";
  }
  else if(city =="")
  {
  	alert("Search by postcode");
  	weatherData = "http://api.openweathermap.org/data/2.5/weather?zip="+postcode+",q=Canada&appid=76391fc36736922b299a9be10ed6fdfc";
  }
  else if(postcode=="")
  {
  	alert("Search by cityName");
  	weatherData = "http://api.openweathermap.org/data/2.5/weather?zip=,q="+city+",Canada&appid=76391fc36736922b299a9be10ed6fdfc";
  	
  }
  else
  {
  	alert("Search by Both");
  	weatherData = weather = "http://api.openweathermap.org/data/2.5/weather?zip="+postcode+",q="+city+",Canada&appid=76391fc36736922b299a9be10ed6fdfc";
  	
  }
  
// this code uses JSON send the data to the API and return an object
$.getJSON(weatherData).then(function(data) {
    console.log(data);
 if(data.cod != "404")
  {
		
//get Country Name
	countryName = data.sys.country;
	console.log(countryName);
	
//Check Canadian city;
	if(countryName != "CA")
	{
		alert("This is not a Canadian City, it's a city of "+ countryName);
	}
// this code takes the property of speed from the object, converts from metre/sec to km/h and logs to console
    speed = (Math.floor((data.wind.speed)*3.6));
    console.log(speed);
    
// this code is to take the icon for the weather to be used as an indicating icon.
    iconValue = data.weather[0].icon;
    weatherIconsrc = 'http://openweathermap.org/img/w/' + iconValue + '.png';
    weatherDescription = data.weather[0].description;
    console.log(iconValue);
    console.log(weatherDescription);

// this code is to take the temperature
	temperature = data.main.temp;
	temperature = temperature - celsius;
	temperature = temperature.toFixed(1);
	console.log(temperature);
	
// this code is to take the humidity
	humidity = data.main.humidity;
	console.log(humidity);
//
	cityName = data.name;
	console.log(cityName);
//
    showData();
 }//end of 404
 else
 {
   alert("Data not found");		
 }
});
  
}//end of Function

// display the chosen values on the webpage
function showData() {

  	document.getElementById('icon').innerHTML = '<img src="' + weatherIconsrc + '" />';
  	document.getElementById('description').innerHTML = weatherDescription;
	
	document.getElementById("cityName").innerHTML = "City: "+ cityName;
	
	document.getElementById("temperature").innerHTML = "Temperature: " + temperature + '&#176' + "C";
	
	document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
}
