//Today's Card Variables:
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

    //Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description");
  // currentCity = "Cairo",

let FetchApi;
let api;

  monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
   days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

let date=new Date();
async function weatherApi(currentCity='cairo'){
  FetchApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
  api= await FetchApi.json();
  console.log(api);
  displayApi()
  displayNextDay()
}
weatherApi()
function displayApi(){
   today.innerHTML=days[date.getDay()]
   todayDate.innerHTML=`${monthName[date.getMonth()]} ${date.getDate()}`;
   cityLocation.innerHTML=api.location.name
   todayDegree.innerHTML=api.current.feelslike_c
   todayIcon.setAttribute('src',`https:${api.current.condition.icon}`)
   description.innerHTML=api.current.condition.text
   humidty.innerHTML=api.current.humidity
   wind.innerHTML=api.current.wind_kph
   compass.innerHTML=api.current.wind_dir

}
function displayNextDay(){
  for(let i = 0; i < nextDay.length;i++){
    nextDay[i].innerHTML=days[new Date(api.forecast.forecastday[i+1].date).getDay()]
    nextDayIcon[i].setAttribute('src',`https:${api.forecast.forecastday[i+1].day.condition.icon}`)
    maxDegree[i].innerHTML = api.forecast.forecastday[i+1].day.maxtemp_c;
    minDegree[i].innerHTML =api.forecast.forecastday[i+1].day.mintemp_c;
    nextDayDescription[i].innerHTML =api.forecast.forecastday[i+1].day.condition.text;
  }

}

searchBar.addEventListener('keyup',function(){
  currentCity=searchBar.value
  weatherApi(currentCity)

})

