var inputEl = document.getElementById("input");
var searchEl = document.getElementById('search');
var selecEl = document.getElementById('history');
var cityEl = document.getElementById('caption');
var currEl = document.getElementById('current');
var futEl = document.getElementById('frcst');

var img1 = document.createElement("img");
var img2 = document.createElement("img");

img1.setAttribute("class", "img1");
var city=[];
var selection;
var lat;
var lon;
console.log(dayjs().add(1, "d").format('MM/DD/YYYY'));



searchEl.addEventListener("click", function(select){
  select.preventDefault();
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
    // var selectEl =[];
    // selectEl.push.data.list[0];
    // selectEl.push.data.list[8];
    // selectEl.push.data.list[16];
    // selectEl.push.data.list[24];
    // selectEl.push.data.list[32];
    // selectEl.push.data.list[39];
    // console.log(selectEl);
    var i=1;
while ( i<6) {

      futEl.setAttribute("style", "visibility:visible");

      futEl.children[0].textContent = dayjs().add(i, "d").format('MM/DD/YYYY');

      var icon2 = data.list[0].weather[0].icon
      img2.src = "http://openweathermap.org/img/wn/"+icon2+"@2x.png";
      futEl.children[0].appendChild(img2);
      futEl.children[0].setAttribute("style","margin-top:-20px");

      futEl.children[1].textContent = "Temp: "+ data.list[0].main.temp + " °F";

      futEl.children[2].textContent = "Wind: "+ data.list[0].wind.speed + " MPH";

      futEl.children[3].textContent ="Humidity: "+ data.list[0].main.humidity + " %";

      


    }
    console.log(data.list[0].weather[0].icon);
    console.log(data.list[0].main.temp);
    console.log(data.list[0].main.humidity);
  })

  })

});



// selecEl.addEventListener('click', function(event){
// selection = event.target.value
// })



// for (i=0; i<city.length; i++) {
//   selecEl.text(city[i]);
// }

// fetch(finalURL)
//   .then(function(response){
//    return response.json();
//    })

// }


//    .then(function(data){
//      console.log(data);
//    })