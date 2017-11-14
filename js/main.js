// READ THIS FIRST

// 1. All of the code needed to let user enter a location is here and works
// 2. The only code that needs editing begins on line 69


// VARIABLES

var open_settings = document.querySelector(".open-settings");
var close_settings = document.querySelector(".close-settings");
var settings = document.querySelector(".settings");
var status = 0;

var submit_form = document.querySelector(".submit");
var input_lc = document.querySelector(".locale");

if (localStorage.getItem("locale")){
  var lc = localStorage.getItem("locale");
} else {
  // Default location (area code or city, state or airport code – in quotes)
  var lc = "Providence, RI";
}


// EVENTS

open_settings.addEventListener("click",function(){
  openSettings();
});

close_settings.addEventListener("click",function(){
  closeSettings();
});

submit_form.addEventListener("click",function(e){
  // prevent defalt click behavior
  e.preventDefault();
  // get locale from form
  lc = locale.value;
  // store values in local storage
  localStorage.setItem("locale", lc);
  // close settings panel
  updateSettings();
  closeSettings();
});


// FUNCTIONS

function openSettings(){
  settings.classList.remove("js-fadeout");
  settings.classList.add("js-fadein");
  open_settings.classList.add("js-hide");
  close_settings.classList.remove("js-hide");
  status = 1;
}

function closeSettings(){
  if(status!=0){
    settings.classList.remove("js-fadein");
    settings.classList.add("js-fadeout");
  }
  close_settings.classList.add("js-hide");
  open_settings.classList.remove("js-hide");
}

function updateSettings(){
  reallySimpleWeather.weather({
    wunderkey: '', // leave blank for Yahoo API
    location: lc, //your location here, also works in lat/lon
    woeid: '', // "Where on Earth ID" optional alternative to location
    unit: 'f', // 'c' also works
    success: function(weather) {
      // sample data to display city and temperature
      html = '<div class="background">';
      html += '<img src="img/weatherbg-'+weather.code+'.svg">';
      html += '</div>';
      html += '<div class="header">';
      html += '<section class="name">';
      html += '<h1>Aurora</h1>';
      html += '</section>';
      html += '</div>';
      html += '<main>';
      html += '<section class="top">';
      html += '<div class="first-block">';
      html += '<h1 class="wdata-01">'+weather.city+', '+weather.region+'</h1>';
      html += '<h1 class="wdata-02">'+weather.forecast[0].date+'</h1>';
      html += '</div>';
      html += '<div class="second-block">';
      html += '<i class="icon wdata-03 icon-'+weather.code+'"></i>';
      html += '<h2 class="wdata-04">'+weather.temp+'&deg;</h2>';
      html += '</div>';
      html += '<div class="third-block">';
      html += '<h3 class="wdata-05"> H: '+weather.high+'&deg; L: '+weather.low+'&deg;</h3>';
      html += '</div>';
      html += '</section>'
      html += '<section class="bottom">';
      html += '<div class="one">';
      html += '<h1 class="wdata-08">'+weather.forecast[1].day+'</h1>';
      html += '<i class="icon wdata-09 icon-'+weather.forecast[1].code+'"></i>';
      html += '<h1 class="wdata-10">'+weather.forecast[1].high+'&deg;F</h1>';
      html += '</div>';
      html += '<div class="two">';
      html += '<h1 class="wdata-11">'+weather.forecast[2].day+'</h1>';
      html += '<i class="icon wdata-12 icon-'+weather.forecast[2].code+'"></i>';
      html += '<h1 class="wdata-13">'+weather.forecast[2].high+'&deg;F</h1>';
      html += '</div>';
      html += '<div class="three">';
      html += '<h1 class="wdata-14">'+weather.forecast[3].day+'</h1>';
      html += '<i class="icon wdata-15 icon-'+weather.forecast[3].code+'"></i>';
      html += '<h1 class="wdata-16">'+weather.forecast[3].high+'&deg;F</h1>';
      html += '</div>';
      html += '</section>';
      html += '</main>';
      document.getElementById('weather').innerHTML = html;
      var ic = document.querySelector(".wdata-03");
      ic.classList.add("js-fadein");
      document.getElementById('weather').innerHTML = html;
    },
    error: function(error) {
      document.getElementById('weather').innerHTML = '<p>'+error+'</p>';
    }
  });
}

//INITIALIZE

closeSettings();
updateSettings();

