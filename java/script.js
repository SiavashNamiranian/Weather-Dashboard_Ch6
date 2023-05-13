var inputEl = document.getElementById("input");
var plchldEl = document.getElementById('container')
var searchEl = document.getElementById('search');

var cityEl = document.getElementById('caption');
var currEl = document.getElementById('current');
var forEl = document.getElementById('future');
var histEl = document.getElementById('history');



var img1 = document.createElement("img");
var img2 = document.createElement("img");
img1.setAttribute("class", "img");
img2.setAttribute("class", "img");


var selection;
var lat;
var lon;


  searchEl.addEventListener("click", function(event){
    event.preventDefault();
    forEl.innerHTML = "";
    console.log(inputEl.value);
    if(inputEl) {
      procesInput(inputEl)
    }
  });
 

  



function procesInput(inputEl) {
  
  selection = inputEl.value;
  
  selecEl=document.createElement("button");
  selecEl.setAttribute("id", "history");
  selecEl.textContent = inputEl.value;
  selecEl.setAttribute("style", "display:inline");
  plchldEl.append(selecEl);

  selecEl.addEventListener("click", function(event){
    event.preventDefault();
    inputEl.innerHTML = "";
    forEl.innerHTML = "";
    console.log(event);
    console.log(event.target.innerText);
    console.log(event.target.innerText+" lat");
    lat = localStorage.getItem(event.target.innerText+" lat");
    lon = localStorage.getItem(event.target.innerText+" lon");
    console.log(lon);
    console.log(lat);

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
    console.log(icon1);
    img1.src = `http://openweathermap.org/img/wn/${icon1}@2x.png`;
    console.log(img1.src);
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

    if(data.list[a].dt_txt.includes("12:00:00")){
    console.log(data.list[a]);

    var icon2 = data.list[a].weather[0].icon;
    console.log(icon2);
    img2.src = `http://openweathermap.org/img/wn/${icon2}@2x.png`;
    console.log(img2.src);
  
    var olEl = document.createElement("ol");
    forEl.append(olEl);
    olEl.setAttribute("id","frcst");
    olEl.setAttribute("style", "visibility:visible");
    
    var date = document.createElement("li")
    date.textContent= new Date(data.list[a].dt_txt).toLocaleDateString();
    date.setAttribute("class", "fut");
    olEl.append(date);
  
    date.append(img2);
    img2.setAttribute("style","margin-top:-20px");

    var temp = document.createElement("li");
    temp.textContent = "Temp: "+ data.list[a].main.temp + " °F";
    olEl.append (temp);


    var wind = document.createElement("li");
    wind.textContent = "Wind: "+ data.list[a].wind.speed + " MPH";
    olEl.append (wind);


    var humid = document.createElement("li");
    humid.textContent ="Humidity: "+ data.list[a].main.humidity + " %";
    olEl.append (humid);
    

    }};

  });
    
  
    });



  
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
    console.log(icon1);
    img1.src = `http://openweathermap.org/img/wn/${icon1}@2x.png`;
    console.log(img1.src);
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

    if(data.list[a].dt_txt.includes("12:00:00")){
    console.log(data.list[a]);

    var icon2 = data.list[a].weather[0].icon;
    console.log(icon2);
    img2.src = `http://openweathermap.org/img/wn/${icon2}@2x.png`;
    console.log(img2.src);
  
    var olEl = document.createElement("ol");
    forEl.append(olEl);
    olEl.setAttribute("id","frcst");
    olEl.setAttribute("style", "visibility:visible");
    
    var date = document.createElement("li")
    date.textContent= new Date(data.list[a].dt_txt).toLocaleDateString();
    date.setAttribute("class", "fut");
    olEl.append(date);
  
    date.append(img2);
    img2.setAttribute("style","margin-top:-20px");

    var temp = document.createElement("li");
    temp.textContent = "Temp: "+ data.list[a].main.temp + " °F";
    olEl.append (temp);


    var wind = document.createElement("li");
    wind.textContent = "Wind: "+ data.list[a].wind.speed + " MPH";
    olEl.append (wind);


    var humid = document.createElement("li");
    humid.textContent ="Humidity: "+ data.list[a].main.humidity + " %";
    olEl.append (humid);
    

    }};

  });

})

};

