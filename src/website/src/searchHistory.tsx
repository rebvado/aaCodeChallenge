import * as React from 'react';
import {appState, host} from './appState'
import { observer } from 'mobx-react';
import axios from 'axios';
import { runInAction } from 'mobx';
import { Button, Typography } from '@material-ui/core';
import { getWeatherGivenCity } from './weatherSearch';

const autoRefreshHistory = async () => {

  let response = await axios.get<{ city: string, timestamp: string }[]>(`http://${host}/history`)
  
  runInAction(() => {
    appState.searchHistory = response.data
  })
  
  setTimeout(() => {
    autoRefreshHistory()
  }, 5000);
}

let startedRefresh = false

export const SearchHistory = observer(() => {
  // Kickoff autorefresh
  if (!startedRefresh) 
  {
    startedRefresh = true
    autoRefreshHistory()
  }

  return <>
    <Typography variant={'h4'}>Recent searches</Typography>
    {
      appState.searchHistory.map<JSX.Element>((val, i) => {
        return <Button key={i}
          variant={'outlined'}
          style={{ margin: '4px' }}
          onClick={() => {
            getWeatherGivenCity(val.city)
          }}
        >
          {val.city}
        </Button>
      })
    }
    </>
})