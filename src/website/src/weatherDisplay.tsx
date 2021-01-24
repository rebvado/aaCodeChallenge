import * as React from 'react';
import { Grid, Typography } from "@material-ui/core"
import { observer } from 'mobx-react';
import { appState } from './appState';


export const WeatherDisplay = observer(() => {
  if (appState.currentResult.name === undefined) {
    return <Typography>Enter a city above to search or select from the list to view weather details</Typography>
  } else {
    return <Grid container spacing={4}>

      {/** Title*/}
      <Grid container item xs={12} spacing={4}>
        <Grid item xs>
          <Typography variant={'h4'}>{appState.currentResult.name}</Typography>
        </Grid>
      </Grid>


      {/** Detail */}
      <Grid container item xs={12} spacing={4}>

        <Grid item xs>
          <img
            style={{ height: '100%' }}
            alt={appState.currentResult.weather[0].description}
            src={`http://openweathermap.org/img/w/${appState.currentResult.weather[0].icon}.png`} />
          <Typography>{appState.currentResult.weather[0].description}</Typography>
        </Grid>

        <Grid item xs>
          <Typography variant={'h5'}>Temperature: </Typography>
          <Typography>Max: {appState.currentResult.main.temp_max} °C</Typography>
          <Typography>Min: {appState.currentResult.main.temp_min} °C</Typography>
          <Typography>Feels like: {appState.currentResult.main.feels_like} °C</Typography>
        </Grid>

        <Grid item xs>
          <Typography variant={'h5'}>Precipitation: </Typography>
          <Typography>Cloudiness: {appState.currentResult.clouds.all}%</Typography>
          <Typography>Humidity: {appState.currentResult.main.humidity}%</Typography>
          {!appState.currentResult.rain ? null : <Typography>Rain next hour (mm): {appState.currentResult.rain['1h']}</Typography>}
          {!appState.currentResult.snow ? null : <Typography>Snow next hour (mm): {appState.currentResult.snow['1h']}</Typography>}
        </Grid>

        <Grid item xs>
          <Typography variant={'h5'}>Wind: </Typography>
          <Typography>Speed: {appState.currentResult.wind.speed} km/h</Typography>
          <Typography>Direction: {degToAngle(appState.currentResult.wind.deg)}</Typography>
          {!appState.currentResult.wind.gust ? null : <Typography>Gust: {appState.currentResult.wind.gust} km/h</Typography>}
        </Grid>

      </Grid>


    </Grid>
  }
})

// 45deg per direction, offset by half of that
const degToAngle = (angle: number) => {
  if (angle <= 22.5) {
    return "North"
  } else if (angle <= 67.5) {
    return "North east"
  } else if (angle <= 112.5) {
    return "East"
  } else if (angle <= 157.5) {
    return "South east"
  } else if (angle <= 202.5) {
    return "South"
  } else if (angle <= 247.5) {
    return "South west"
  } else if (angle <= 292.5) {
    return "West"
  } else if (angle <= 337.5) {
    return "North west"
  } else  {
    return "North"
  } 
}