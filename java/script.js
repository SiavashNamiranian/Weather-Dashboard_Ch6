var inputEl = document.getElementById("input");
var searchEl = document.getElementById('search');
var selecEl = document.getElementById('history');
var cityEl = document.getElementById('caption');
var currEl = document.getElementById('current');
var forEl = document.getElementById('future')

var img1 = document.createElement("img");
var img2 = document.createElement("img");

img1.setAttribute("class", "img1");
var city=[];
var selection;
var lat;
var lon;
console.log(dayjs().add(1, "d").format('MM/DD/YYYY'));



searchEl.addEventListener("click", function(select){
  // select.preventDefault();
  console.log(inputEl.value);
  var inPut = inputEl.value;
  selection = inputEl.value
  city.push(inputEl.value);
  
  console.log(city);
  console.log(selection);

  var finalURL = "https://api.openweathermap.org/geo/1.0/direct?q="+ selection +"&APPID=9987a6015b8cdcb1398b44948cead4a2";

  console.log(finalURL);

  fetch(finalURL)
    .then(function(response){
    return response.json();
  })
  .then(function (data){
    lat=data[0].lat;
    lon=data[0].lon;

    localStorage.setItem(inputEl.value+" lat", lat);
    localStorage.setItem(inputEl.value+" lon", lon);

    var curntURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=9987a6015b8cdcb1398b44948cead4a2&units=imperial"

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&APPID=9987a6015b8cdcb1398b44948cead4a2&units=imperial"

  fetch(curntURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);

    cityEl.textContent = data.name + dayjs().format(' MM/DD/YYYY');
    var icon1 = data.weather[0].icon;
    img1.src = "http://openweathermap.org/img/wn/"+icon1+"@2x.png";
    cityEl.appendChild(img1);
    cityEl.setAttribute("style","margin-top:-20px");

    currEl.children[1].textContent = "Temp: "+ data.main.temp + " °F";

    currEl.children[2].textContent = "Wind: "+ data.wind.speed + " MPH";
    
    currEl.children[3].textContent = "Humidity: "+ data.main.humidity + " %";
    
    
    console.log(data.main.temp);
    console.log(data.wind.speed);
    console.log(data.weather[0].icon);
    console.log(data.main.humidity);
  })
        
  fetch(forecastURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    
    console.log(data);
    console.log(data.list);
    for (a=0; a<40; a++){
    console.log(data.list[a].dt_txt);
    console.log(typeof(data.list[a].dt_txt));
    if((data.list[a].dt_txt).includes("12:00:00")){
    console.log("yes");


    var olEl = document.createElement("ol");
    forEl.append(olEl);
    olEl.setAttribute("id","frcst");
    olEl.setAttribute("style", "visibility=visible");
    // console.log(dayjs().add(i, "d").format('MM/DD/YYYY'));
    var date = document.createElement("li")
    date.setAttribute("class", "fut");
    olEl.append(date);
    date.textContent= data.list[a].dt_txt
    // date.textContent=dayjs().add(i, "d").format('MM/DD/YYYY');
    console.log(data.list);
   
    var icon2 = data.list[a].weather.icon
    img2.src = "http://openweathermap.org/img/wn/"+icon2+"@2x.png";
    date.appendChild(img2);
    img2.setAttribute("style","margin-top:-20px");

    var temp = document.createElement("li")
    temp.textContent = "Temp: "+ data.list[0].main.temp + " °F";
    olEl.append (temp);


    var wind = document.createElement("li")
    wind.textContent = "Wind: "+ data.list[0].wind.speed + " MPH";
    olEl.append (wind);


    var humid = document.createElement("li")
    humid.textContent ="Humidity: "+ data.list[0].main.humidity + " %";
    olEl.append (humid);
    console.log(data.list);

    }};

  });

})

})