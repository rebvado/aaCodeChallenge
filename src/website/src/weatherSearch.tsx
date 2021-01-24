import * as React from 'react';
import { Button, TextField } from "@material-ui/core"
import { appState, host, WeatherResponse } from './appState'
import axios from 'axios';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';


export const WeatherSearch = observer(() => {
  return <>
    <form onSubmit={formGetWeather} >
      <TextField
        required
        size={'small'}
        label={'City name'}
        value={appState.citySearch.value}
        error={appState.citySearch.hasError}
        helperText={appState.citySearch.error}
        onChange={(evt) => {
          appState.citySearch.onChange(evt.target.value)
        }}
        onBlur={() => {
          appState.citySearch.enableAutoValidationAndValidate()
        }}
        variant={'outlined'}
      />
      <Button
        type={'submit'}
        style={{ display: 'hidden', padding: '0px', minWidth: '0px' }}
      />
    </form>

    <Button color='primary' onClick={getWeather}>
      Get current weather
    </Button>
  </>
})

const formGetWeather = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  getWeather()
}

const getWeather = async () => {

  // Wait if we are currently validating
  if (appState.citySearch.validating === true) {
    await appState.citySearch.validate()
  }

  // Ensure we have validated at least once
  if (appState.citySearch.hasBeenValidated === false) {
    // Ensure the autovalidation is on for if it fails
    appState.citySearch.enableAutoValidation()
    await appState.citySearch.validate()
  }

  // only request if city is valid
  if (!appState.citySearch.hasError && appState.citySearch.value !== '') {
    getWeatherGivenCity(appState.citySearch.$)
  }
} 

export const getWeatherGivenCity = async (city: string) => {
      // get wether api via our server to track history of searches
    let response = await axios.get<WeatherResponse>(`http://${host}/city/${city}`)
    runInAction(() => {
      appState.currentResult = response.data

      // Will get overwritten on the next refresh but makes the app look snappy
      appState.searchHistory.unshift({ city: response.data.name, timestamp: '0' })
    })
}