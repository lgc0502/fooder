import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

import DistanceFormat from '../../MainTab/SearchPage/Common/DistanceFormat.js'
import RatingStar from '../../MainTab/SearchPage/Common/RatingStar.js'
import TagsMapping from '../../MainTab/SearchPage/Common/TagsMapping.js'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit / 2,
    width: '100vw'
  },
  gridList: {
    'white-space': 'nowrap',
    'overflow-x': 'scroll',
    'text-align': 'left'
  },
  detail: {
    padding: '0 5px',
    width: 'calc(100vw - 10px)',
    'margin-bottom': '10px'
  },
  content: {
    padding: '0px 6px 6px 13px'
  },
  img: {
    'border-radius': '4px',
    display: 'inline-block',
    height: '104px',
    width: 'auto',
    margin: '0 2px'
  },
  chip: {
    justifyContent: 'center',
    width: '56px',
    height: '17px',
    'font-size': '10px',
    margin: '5px 10px 5px 0px',
    backgroundColor: '#FFF350',
    color: '#263238'
  }
})

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFF350',
      main: '#FFF350'
    },
    secondary: { main: '#CC0000' }
  },
  typography: {
    useNextVariants: true
  }
})

class ListItem extends Component {
  next = (handleNext, props, handleRestaurant) => {
    handleNext('')
    handleRestaurant(props)
  }

  render() {
    const {
      classes,
      restaurantinfo,
      handleNext,
      handleRestaurant
    } = this.props
    return (
      <div>
        <div
          className={classes.root}
          onClick={() => this.next(handleNext, restaurantinfo, handleRestaurant)}
        >
          <div className={classes.gridList}>
            {restaurantinfo['smallphotoUrls'].map(tile => (
              <img
                className={classes.img}
                src={tile}
                key={restaurantinfo['smallphotoUrls'].indexOf(tile)}
                alt={'title'}
              />
            ))}
          </div>
        </div>
        <div
          onClick={() => this.next(handleNext, restaurantinfo, handleRestaurant)}
          className={classes.detail}
        >
          <div className={classes.content}>
            <Grid container>
              <Grid item xs={9} style={{ height: '20px' }}>
                <Typography align='left' style={{ fontWeight: '700' }}>
                  {restaurantinfo['name']}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align='right' style={{ overflow: 'hidden' }}>
                  {DistanceFormat.DistanceFormat(restaurantinfo['distance'])}
                </Typography>
              </Grid>
            </Grid>
            <div align='left' style={{ paddingLeft: '4px' }}>
              <Typography
                align='left'
                style={{
                  display: 'inline-block',
                  paddingRight: '4px',
                  fontSize: '12px'
                }}
              >
                {restaurantinfo['rating'].toFixed(1)}
              </Typography>
              <div
                align='left'
                style={{ width: '87px', display: 'inline-block' }}
              >
                <RatingStar rating={restaurantinfo['rating']} theme={0} />
              </div>
              <Typography
                align='left'
                style={{ display: 'inline-block', fontSize: '12px' }}
              >
                {'$ ' + restaurantinfo['priceLevel']}
              </Typography>
            </div>
            <div style={{ justifyContent: 'flex-start', textAlign: 'left' }}>
              {TagsMapping.sametags(this.props.tag, restaurantinfo['tags']).map((tag, index) => (
                <Chip
                  className={classes.chip}
                  key={index}
                  label={tag}
                  color='primary'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(ListItem)
