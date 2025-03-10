// document.getElementById('getWeather').addEventListener('click',()=>{
//     let city = document.getElementById('city').value;
//     if(city===""){
//         alert("Enter city name");
//         return;
//     }

//     let apiKey = '1348bfa57632645b961f854a16ef9a20';
//     let xhr = new XMLHttpRequest();

//         xhr.open('GET',`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,true);
//         xhr.onload = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 let data = JSON.parse(xhr.responseText);
                
//                 let weatherDetails = document.getElementById('weatherDetails');
//                 let weatherInfo = `
//                     <h2>${data.name}, ${data.sys.country}</h2>
//                     <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
//                     <p><strong>Weather:</strong> ${data.weather[0].description}</p>
//                     <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
//                     <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
//                 `;
                
//                 weatherDetails.innerHTML = weatherInfo;
//                 weatherDetails.style.display = 'block';
//             }

//             else if(xhr.readyState===404){
//                 alert("city not found")
//                 return;
//             }
//         };
//         xhr.send();
// });

document.getElementById('getWeather').addEventListener('click', () => {
    let city = document.getElementById('city').value;
    if (city === "") {
        alert("Enter city name");
        return;
    }

    let apiKey = '1348bfa57632645b961f854a16ef9a20';
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, true);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            
            let condition = data.weather[0].main.toLowerCase(); 
            
            let weatherIcons = {
                "clear": "☀️",       
                "clouds": "⛅",       
                "broken clouds": "⛅",  
                "rain": "🌧️",     
                "thunderstorm": "⛈️", 
                "snow": "🌨️",        
                "mist": "🌫️",       
                "drizzle": "🌦️",    
                "haze": "🌫️"         
            };

            let tempIcon = "🌡️"; 
            let weatherIcon = weatherIcons[condition] || "❓"; 
            let humidityIcon = "💧"; 
            let windIcon = "💨"; 


            let weatherDetails = document.getElementById('weatherDetails');
            let weatherInfo = `
                <h2>${data.name}, ${data.sys.country} <i class="fas fa-map-marker-alt" style="font-size: 18px; color:rgb(246, 78, 78);"></i></h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C ${tempIcon}</p>
                <p><strong>Weather:</strong> ${data.weather[0].description} ${weatherIcon}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}% ${humidityIcon}</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s ${windIcon}</p>
            `;

            weatherDetails.innerHTML = weatherInfo;
            weatherDetails.style.display = 'block';
        } 
        else if (xhr.status === 404) {

            let cityNotFound = "🚨";
            let weatherDetails = document.getElementById('weatherDetails');
            let weatherInfo = `
                <p style="color:red">City not found ${cityNotFound}</p>
            `;

            weatherDetails.innerHTML = weatherInfo;
            weatherDetails.style.display = 'block';
        }
    };
    xhr.send();
});
