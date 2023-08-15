//Function for Weather
async function fetchWeather() {
    const apiKey = '74b59f9697177c88feb2e1fe00491006'; 
    const location = document.getElementById('location').value.trim();
  
    if (!location) {
      alert('Please enter a location.');
      return;
    }
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data.');
      }
      const data = await response.json();
  
      // Extract weather information
      const weatherDescription = data.weather[0].description;
      const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature from Kelvin to Celsius
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const iconName = data.weather[0].icon;
  
      // Check if the weatherDataContainer already exists
      let weatherDataContainer = document.getElementById('weatherData');
      if (!weatherDataContainer) {
        // Create a new div element for weather data
        weatherDataContainer = document.createElement('div');
  
        // Set the id attribute to "weatherData"
        weatherDataContainer.id = 'weatherData';
  
        // Append the div to our container 
        const cardContainer = document.querySelector('.card');
        cardContainer.appendChild(weatherDataContainer);
      }
  
      // Display the weather data inside the weatherDataContainer
      weatherDataContainer.innerHTML = `
        <h2>Weather in ${location}</h2>
        <p><strong>Description:</strong> ${weatherDescription}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <img src="https://openweathermap.org/img/wn/${iconName}.png" alt="Weather Icon">
      `;
  
      // Set background video based on weather condition
      const backgroundVideo = document.getElementById('backgroundVideo');
      let videoUrl = '';
  
      // Based on weather condition, background video will play
      if (weatherDescription.includes('cloud')) {
        videoUrl = 'Video/Cloud.mp4'; 
      } else if (weatherDescription.includes('rain')) {
        videoUrl = 'Video/Rain.mp4'; 
      } else if (weatherDescription.includes('clear')) {
        videoUrl = 'Video/Clear2.mp4'; 
      } else if (weatherDescription.includes('fog')) {
        videoUrl = 'Video/Fog.mp4'; 
      } else if (weatherDescription.includes('haze')) {
        videoUrl = 'Video/Haze.mp4'; 
      } else if (weatherDescription.includes('mist')) {
        videoUrl = 'Video/Mist.mp4'; 
      } else if (weatherDescription.includes('smoke')) {
        videoUrl = 'Video/Smoke.mp4'; 
      } else if (weatherDescription.includes('snow')) {
        videoUrl = 'Video/Snow.mp4'; 
      } else if (weatherDescription.includes('thunderstorm')) {
        videoUrl = 'Video/Thunderstorm.mp4'; 
      } else if (weatherDescription.includes('tornado')) {
        videoUrl = 'Video/Tornado.mp4'; 
      } else if (weatherDescription.includes('sunny')) {
        videoUrl = 'Video/Sunny.mp4'; 
      } else {
        // Default video for other weather conditions
        videoUrl = 'Video/Earth.mp4'; 
      }
  
      // Set the background video
      backgroundVideo.setAttribute('src', videoUrl);
      backgroundVideo.play();
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    }
  }
  
  //Function for Dictionary
  async function fetchDictionaryData(word) {
    const apiKey = '1a5ecd6c-2006-4e00-be62-5d5e549f8fb9'; // Replace this with your actual API key
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Word not found in the dictionary.');
      }
      const data = await response.json();
  
      // Check if the resultContainer already exists
      let resultContainer = document.getElementById('result');
      if (!resultContainer) {
        // Create a new div element for the dictionary search result
        resultContainer = document.createElement('div');
  
        // Set the id attribute to "result"
        resultContainer.id = 'result';
  
        // Append the div to an existing container (for example, the card)
        const cardContainer = document.querySelector('.card');
        cardContainer.appendChild(resultContainer);
      }
  
      // Display the dictionary search result inside the resultContainer
      resultContainer.innerHTML = `
        <h2>${word}</h2>
        <p><strong>Part of speech:</strong> ${data[0].fl}</p>
        <p><strong>Definition:</strong> ${data[0].shortdef[0]}</p>
      `;
    } catch (error) {
      console.error('Error fetching data:', error);
      const resultContainer = document.getElementById('result');
      resultContainer.innerHTML = `<p>${error.message}</p>`;
    }
  }
  
  // Function to handle search button click
  function searchWord() {
    const searchInput = document.getElementById('searchInput');
    const word = searchInput.value.trim();
    if (word !== '') {
      fetchDictionaryData(word);
    }
  }
  


 