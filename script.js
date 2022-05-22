// only execute the script after the window has loaded
window.addEventListener('load', () => {
    // variable to hold search history
    let searchHistory = [];
// initialize the local storage
if(localStorage.getItem('searchHistory') == null){
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
}else{
    // load data from localStorage
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
}

// function to handle search functionality
function searchCity(city){
    // notify the user of the search
    document.getElementById('message').textContent = 'Search results for [' + city + ']';

    //API URL for current weather
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6134317c10db877014543c36d6f4d45d";

    // fetch current weather data
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // check if the response has an error
        if(data.cod != 404){
            document.getElementById('city-div').textContent = "City: " + data.name;

            // get the coordinates
            url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly,daily&appid=6134317c10db877014543c36d6f4d45d";

            fetch(url)
            .then(res => res.json())
            .then(data => {

                // determine uvi color
                let color = '';

                if(data.current.uvi <= 2 ){
                    color = 'green';
                }

                else if(data.current.uvi <= 5 ){
                    color = 'yellow';
                }

                else if(data.current.uvi <= 7 ){
                    color = 'orange';
                }

                else{
                    color = 'red';
                }
                
                // display the current conditions
                
                document.getElementById('current-title').textContent = "Current Weather Conditions";
                
                document.getElementById('current-data').innerHTML = `
                    <tr>
                        <th>Date</th>
                        <th>Icon</th>
                        <th>Temp</th>
                        
                        <th>Wind Speed</th>
                        <th>Humidity</th>
                        <th>UV Index</th>
                    </tr>

                    <tr>
                        <td>${new Date(data.current.dt * 1000).toDateString()}</th>
                        <td><img width = "30" src = " http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png"></td>
                        <td>${data.current.temp}K</td>
                   
                        <td>${data.current.wind_speed}m/s</td>
                        <td>${data.current.humidity}%</td>
                        <td style = "color: ${color}">${data.current.uvi}</td>
                    </tr>
                `;

               
            });
        }else{
            alert('Error: ' + data.message);
        }
    });

    // API URL for forecast
    url = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&appid=6134317c10db877014543c36d6f4d45d"

    fetch(url)
    .then(res => res.json())
        .then(data => {
            // check if the response has an error
            if(data.cod != 404){
                document.getElementById('forecast-title').textContent = "Five Day forecast";
                // first, empty the div that will  display the forecast, Then add headers to the table
                document.getElementById('forecast-history').innerHTML = `
                <tr>
                    <th>Date</th>
                    <th>Icon</th>
                    <th>Day Temp</th>
                    <th>Min Temp</th>
                    <th>Max Temp</th>
                    <th>Wind Speed</th>
                    <th>Humidity</th>
                </tr>`;  
                
               // loop through the forecasts
               data.list.forEach((weather) => {
                // get the current innerHTML of the forecast div
                let content = document.getElementById('forecast-history').innerHTML;

                let date = new Date(weather.dt * 1000);

                content += `
                        <tr>
                            <td>${date.toDateString()}</td>
                            <td><img width = "30" src = " http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"></td>
                            <td>${weather.temp.day}K</td>
                            <td>${weather.temp.min}K</td>
                            <td>${weather.temp.max}K</td>
                            <td>${weather.speed}m/s</td>
                            <td>${weather.humidity}%</td>
                            </tr>`;
                            
