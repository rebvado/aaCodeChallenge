
import { makeAutoObservable } from 'mobx';
import { cityNames } from './cities'
import { FieldState } from 'formstate';

export const host = 'localhost:5000'

export type WeatherResponse = {
  coord: { lon: number, lat: number },
  weather: {
    description: string
    icon: string 
    id: number
    main: string
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

class AppState {
  constructor() {
    makeAutoObservable(this)
  }

  searchHistory: {
    city: string
    timestamp: string
  }[] = []

  currentResult: WeatherResponse = {} as WeatherResponse

  citySearch: FieldState<string> = new FieldState<string>('')
    .disableAutoValidation()
    .validators((val) => {
      // lowercase for ease of matching
      if (!cityNames.includes(val.toLowerCase())) {
        return 'City not found'
      } else {
        return ''
      }
    })
}

export const appState = new AppState() 