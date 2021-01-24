import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Divider, Container } from '@material-ui/core';
import { observer } from 'mobx-react';
import { WeatherSearch } from './weatherSearch';
import { SearchHistory } from './searchHistory';
import { WeatherDisplay } from './weatherDisplay';

console.log('website starting....')

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1
  }
}))

const MainPage = observer(() => {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.grow}>
          <Grid container spacing={4}>

            <Grid item xs={12}>
              <Typography variant={'h2'} align={'center'}>
                Aaron's Amazing Weather Service
          </Typography>
            </Grid>

            <Grid item xs={12}>
              <WeatherSearch />
            </Grid>

            <Divider />

            <Grid container xs={2} item direction={'column'} style={{minWidth: '172px'}} justify={'flex-end'}>
              <SearchHistory />
            </Grid> 

            <Grid item xs>
              <WeatherDisplay/>
            </Grid>

          </Grid>

      </div>
    </Container >
  )
})

ReactDOM.render(
  <MainPage />,
  document.getElementById('root')
) 