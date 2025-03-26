document.getElementById('getWeather').addEventListener('click', () => {
    let city = document.getElementById('city').value;
    if (city === "") {
        Swal.fire({
            title: 'Error',
            html: `Invalid Input`,
            icon: 'error',
            confirmButtonText: 'Ok',
            timer: 3000,
            position: 'center',
            heightAuto: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
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
            let pressureIcon = '🌡';
            let sealevelIcon = "🌊";
            let groundlevelIcon = "⛰️";
            let sunriseIcon = "🌅";
            let sunsetIcon = "🌇";
            let timezoneIcon = "🕒";
    
            function convertUnixToTime(unixTimestamp) {
                let date = new Date(unixTimestamp * 1000);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let ampm = hours >= 12 ? "PM" : "AM";
    
                hours = hours % 12 || 12;
                minutes = minutes < 10 ? "0" + minutes : minutes; 
    
                return `${hours}:${minutes} ${ampm}`;
            }
    
            let sunriseTime = convertUnixToTime(data.sys.sunrise);
            let sunsetTime = convertUnixToTime(data.sys.sunset);
    
            function formatTimezone(offsetSeconds) {
                let offsetHours = Math.floor(offsetSeconds / 3600);
                let offsetMinutes = Math.abs(offsetSeconds % 3600) / 60;
                let sign = offsetHours >= 0 ? "+" : "-";
                return `GMT${sign}${Math.abs(offsetHours)}:${offsetMinutes === 0 ? "00" : offsetMinutes}`;
            }
    
            let gmtTimezone = formatTimezone(data.timezone);
    
            let weatherDetails = document.getElementById('weatherDetails');
            let weatherInfo = `
                <h2>${data.name}, ${data.sys.country} <i class="fas fa-map-marker-alt" style="font-size: 18px; color:rgb(246, 78, 78);"></i></h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C ${tempIcon}</p>
                <p><strong>Weather:</strong> ${data.weather[0].description} ${weatherIcon}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}% ${humidityIcon}</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s ${windIcon}</p>
                <div class="extra-Details" style="display: none;">
                    <p><strong>Pressure:</strong> ${data.main.pressure} mb ${pressureIcon}</p>
                    <p><strong>Sea Level:</strong> ${data.main.sea_level || 'N/A'} mb ${sealevelIcon}</p>
                    <p><strong>Ground Level:</strong> ${data.main.grnd_level || 'N/A'} mb ${groundlevelIcon}</p>
                    <p><strong>Sunrise:</strong> ${sunriseTime} ${sunriseIcon}</p>
                    <p><strong>Sunset:</strong> ${sunsetTime} ${sunsetIcon}</p>
                    <p><strong>Timezone:</strong> ${gmtTimezone} ${timezoneIcon}</p>
                </div>
                <button id="showbtn"> See more <i class="fa-solid fa-angle-down"></i></button>
            `;
    
            weatherDetails.innerHTML = weatherInfo;
            weatherDetails.style.display = 'block';
    
            document.getElementById("showbtn").addEventListener('click', () => {
                let extraDetails = document.querySelector(".extra-Details"); 
                let showbtn = document.getElementById("showbtn");
            
                if (extraDetails.style.display === "none" || extraDetails.style.display === "") {
                    extraDetails.style.display = "block"; 
                    showbtn.innerHTML = 'See less <i class="fa-solid fa-angle-up"></i>';
                } else {
                    extraDetails.style.display = "none";
                    showbtn.innerHTML = 'See more <i class="fa-solid fa-angle-down"></i>';
                }
            });
        } 
        else if (xhr.status === 404) {
            let cityNotFound = "🚨";
            let weatherDetails = document.getElementById('weatherDetails');
            let weatherInfo = `<p style="color:red">City not found ${cityNotFound}</p>`;
            weatherDetails.innerHTML = weatherInfo;
            weatherDetails.style.display = 'block';
        }
    };
    
    xhr.send();
});


