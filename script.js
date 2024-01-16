const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather] ");
const userContainer = document.querySelector(".weather-container ");
const grantAccessContainer = document.querySelector(".grant-location-container ");
const searchForm = document.querySelector("data-searchForm ");
const loadingScreen = document.querySelector(".loading-container ");
const userInfoContainer = document.querySelector(".user-info-container");
// const userTab = document.querySelector(" ");
// const userTab = document.querySelector(" ");
// const userTab = document.querySelector(" ");
// const userTab = document.querySelector(" ");
// const userTab = document.querySelector(" ");
// const userTab = document.querySelector(" ");
// const userTab = document.querySelector(" ");
// const userTab = document.querySelector(" ");


// Initiallity variables
let oldTab = userTab;
const API_KEY = "0dd12dc39d628fa8c1a72577e21887d0";
oldTab.classList.add("current-tab");

//initial call - coordinates agar phle se present ho
getfromSessionStorage();


function switchTab(newTab){
    if(newTab != oldTab){
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            //[phle search vale tab fir ab your weather tab visible krna h]
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab mai your weather tab me aa gya hu to weather bhi display krna hoga, so lets check local storage first
            //for coordinates, if we haved saved them there, 
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener('click', ()=> {
    //pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener('click', ()=> {
    //pass clicked tab as input parameter
    switchTab(searchTab);
});
  

//check if coordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-cordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const cordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon} = coordinates;
    //make grant container invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API call
    try{
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely,alerts&appid=${API_KEY}`);
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }

    catch (err){
        loadingScreen.classList.remove("active");
        alert('Parameter not giver');
    }
}

function renderWeatherInfo(weatherInfo){
    // we have to featch the data
    const cityName = document.querySelector("[data-cityName]"); // not given
    const countryIcon = document.querySelector("[data-countryIcon]"); // not given
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudness = document.querySelector("[data-clouds]");

    // featch value from weatherInfo objects and put it UI elements
    // optional chaining - user?.address?.zip 
    desc.innerText = weatherInfo?.current?.weather?.[0]?.description;
    // `https://openweathermap.org/img/w/${weatherInfo?.current?.weather?.[0]?.icon}.png`;
    weatherIcon.innerText = `https://openweathermap.org/img/w/${weatherInfo?.current?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.current?.temp;
    windspeed.innerText = weatherInfo?.current?.wind_speed;
    humidity.innerText = weatherInfo?.current?.humidity;
    cloudness.innerText = weatherInfo?.current?.clouds;

}

function getLocation(){
    if(navigator.getLocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("No geolocation");
    }
}

function showPosition(position){
    const userCoordinates = {
        let: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates"), JSON.stringify(userCoordinates);
    fetchUserWeatherInfo();
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.Value;

    if(cityName === "") return;
    else{
        featchSearchWeatherInfo(cityName);
    }

})

async function featchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await featch(
            `https:api.//openweathermap.org/data/3.0/onecall?city=${city}&exclude=hourly,daily,minutely,alerts&appid=${API_KEY}`
        );

        const data = await response.jason();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        renderWeatherInfo(data);
    }
    catch (err){
        alert("No city");
    }
}























// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// One function one work
// kisi bhi project ke liye ek bar me sare function create nhi krni h

// FunctionA get the details FunctionB update UI



// function renderWeatherInfo(data) {
//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.current?.temp.toFixed(2)} C`
//     document.body.appendChild(newPara);

// }
// async function feathWeatherDetails() {

//     try {
//         let lat = 23.44;
//         let lon = -92.04;

//         const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely,alerts&appid=${API_KEY}`);

//         const data = await response.json();
//         console.log("Weather data-> ", data);

//         // let newPara = document.createElement('p');
//         // newPara.textContent = `${data?.current?.temp.toFixed(2)} C`
//         // document.body.appendChild(newPara);
//         renderWeatherInfo(data);

//     }

//     catch (err) {
//         //error handle krna hai
//         alert('Wrong location given!', err);

//     }

// }

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log('No geolocation support');
//     }

// }

// function showPosition(){
//     let lati = position.coords.latitude;
//     let longi = position.coords.longitude;

//     console.log(lati);
//     console.log(longi);
// //     x.innerHTML = "Latitude: " + position.coords.latitude +
// //   "<br>Longitude: " + position.coords.longitude;
// }



