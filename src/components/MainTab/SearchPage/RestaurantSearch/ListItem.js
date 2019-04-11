import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

import DistanceFormat from '../Common/DistanceFormat.js'
import RatingStar from '../Common/RatingStar.js'
import TagsMapping from '../Common/TagsMapping.js'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit / 2,
    width: '100vw',
    position: 'relative'
  },
  gridList: {
    whiteSpace: 'nowrap',
    textAlign: 'left',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    cursor: 'pointer'
  },
  detail: {
    padding: '0 5px',
    width: 'calc(100vw - 10px)',
    marginBottom: '10px'
  },
  content: {
    padding: '0px 6px 6px 13px'
  },
  img: {
    borderRadius: '4px',
    display: 'inline-block',
    position: 'relative',
    height: '104px',
    width: 'auto',
    margin: '0 2px'
  },
  chip: {
    justifyContent: 'center',
    width: '56px',
    height: '17px',
    fontSize: '10px',
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
  next = (handleNext, props, restaurantInfo, height) => {
    this.props.handleScrollRecord(Math.floor((height - 177 + 200) / 200))
    handleNext('')
    restaurantInfo(props)
  }

  render() {
    const {
      classes,
      restaurantinfo: info,
      handleNext,
      restaurantInfoFunc: restaurantInfo,
      height
    } = this.props
    return (
      <div
        className={classes.root}
        onClick={e => this.next(handleNext, info, restaurantInfo, height)}
      >
        <div className={classes.gridList}>
          {this.props.restaurantinfo['smallphotoUrls'].map(tile => (
            <img
              className={classes.img}
              src={tile}
              key={this.props.restaurantinfo['smallphotoUrls'].indexOf(tile)}
              alt={'title'}
            />
          ))}
        </div>
        <div className={classes.detail}>
          <div className={classes.content}>
            <Grid container>
              <Grid item xs={9} style={{ height: '20px' }}>
                <Typography
                  color='rgba(0,0,0,0.87)'
                  align='left'
                  style={{
                    fontWeight: '700',
                    lineHeight: '22px',
                    marginTop: '3px'
                  }}
                >
                  {info['name']}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  align='right'
                  style={{
                    color: 'rgba(0,0,0,0.6)',
                    lineHeight: '22px',
                    fontSize: '12.33px',
                    overflow: 'hidden',
                    marginTop: '3px'
                  }}
                >
                  {DistanceFormat.DistanceFormat(info['distance'])}
                </Typography>
              </Grid>
            </Grid>
            <div align='left'>
              <div
                align='left'
                style={{ width: '98px', display: 'inline-block' }}
              >
                <RatingStar rating={info['rating']} theme={0} />
              </div>
              <Typography
                align='left'
                style={{
                  display: 'inline-block',
                  paddingRight: '4px',
                  fontSize: '12px',
                  marginBottom: '2px',
                  color: 'rgba(0,0,0,0.6)'
                }}
              >
                {info['rating'].toFixed(1)}
              </Typography>
            </div>
            <Typography
              align='left'
              style={{
                fontSize: '12.33px',
                lineHeight: '22px',
                color: 'rgba(0,0,0,0.6)'
              }}
            >
              {'$ ' + info['priceLevel']}
            </Typography>
            <div style={{ justifyContent: 'flex-start', textAlign: 'left' }}>
              {TagsMapping.sametags(this.props.tag, info['tags']).map(
                (tag, index) => (
                  <nobr
                    align='left'
                    style={{
                      fontSize: '12.33px',
                      lineHeight: '22px',
                      color: 'rgba(0,0,0,0.6)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tag + ', '}
                  </nobr>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(ListItem)
