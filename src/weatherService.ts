import axios from 'axios';
import { repository } from './db/database';
import { PreviousSearch } from './db/entity/previousSearch';
import { router } from './server'
import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'ap-southeast-2' });
const paramStore = new AWS.SSM()

// API key stored in SSM parameter store
let WeatherAPIKey = ''
const initWeatherAPI = async () => {
  let result = await paramStore.getParameter({ Name: 'openWeatherAPIKey' }).promise()
  WeatherAPIKey = result.Parameter?.Value!
}
initWeatherAPI()


type WeatherResponse = {
  coord: { lon: number, lat: number },
  weather: {
    description: string
    icon: string //Icon code?
    id: 803
    main: "Clouds"
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  clouds: {
    all: number
  }
  rain: {
    "1h": number
    "3h": number
  }
  snow: {
    "1h": number
    "3h": number
  }
  dt: number
  sys: {
    type: number
    id: number
    message: string
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

router.get('/city/:cityName', (request, response) => {
  console.log('Get weather for city: ', request.params['cityName'])
  axios.get<WeatherResponse>(`https://api.openweathermap.org/data/2.5/weather?q=${request.params['cityName']}&appid=${WeatherAPIKey}&units=metric`).then((weatherResponse) => {

    // Send response quickly
    response.send(weatherResponse.data);

    // Update db
    let prevSearch = new PreviousSearch()
    prevSearch.city = request.params['cityName']
    prevSearch.timestamp = Date.now()

    repository?.save(prevSearch).catch((reason) => {
      console.error('Error in saving previous search', prevSearch, reason)
    })

  }).catch(() => {
    console.error('Error in getting city current weather')
  })
});

router.get('/history', async (request, response) => {
  request; // Not used

  // get 20 most recent
  let searchHistory = await repository?.find({
    order: {
      timestamp: 'DESC'
    },
    take: 20
  })

  if (!searchHistory) {
    console.error('Error in fetching previous searches')
    response.send([])
  } else {
    response.send(searchHistory)
  }


});

