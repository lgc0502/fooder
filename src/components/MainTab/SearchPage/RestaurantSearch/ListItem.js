import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme } from '@material-ui/core/styles'

import Bookmark from '@material-ui/icons/Bookmark'

import DistanceFormat from '../Common/DistanceFormat.js'
import RatingStar from '../Common/RatingStar.js'
import TagsMapping from '../Common/TagsMapping.js'

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
    'margin-bottom': '15px'
  },
  content: {
    padding: '0px 6px 6px 13px'
  },
  img: {
    //'border-radius': '4px',
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
  constructor(props) {
    super(props)
    const temp = localStorage.getItem('id')
    let bool
    if (temp === null) bool = false
    else if (temp.indexOf(props.restaurantinfo.placeId) === -1) bool = false
    else bool = true
    this.state = {
      bookmarkClick: bool
    }
  }
  next = (handleNext, props, restaurantInfo) => {
    handleNext('')
    restaurantInfo(props)
  }
  handleBookmarkClick = (id, event) => {
    
    const prevData = localStorage.getItem('id')
    if (this.state.bookmarkClick) {
      if (prevData.indexOf(id) !== -1) {
        let tempArray = prevData.split(' ')
        tempArray = tempArray.filter(element => element !== id)
        localStorage.setItem('id', tempArray.join(' '))
      }
    } else {
      if (prevData === null) {
        localStorage.setItem('id', id)
      } else if (prevData.indexOf(id) === -1) {
        const tempArray = prevData.split(' ')
        tempArray.push(id)
        localStorage.setItem('id', tempArray.join(' '))
      }
    }
    this.setState({
      bookmarkClick: !this.state.bookmarkClick
    })
    event.stopPropagation()
  }
  render() {
    const {
      classes,
      restaurantinfo: info,
      handleNext,
      restaurantInfoFunc: restaurantInfo,
      vehicle
    } = this.props
    return (
      <div>
        <div
          className={classes.root}
          onClick={() => this.next(handleNext, info, restaurantInfo)}
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
        </div>
        <div
          onClick={() => this.next(handleNext, info, restaurantInfo)}
          className={classes.detail}
        >
          <div className={classes.content}>
            <Grid container>
              <Grid item xs={7} style={{ height: '20px' }}>
                <Typography
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
              <Grid item xs={5}>
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
                  {DistanceFormat.DistanceFormat(info['distance'], vehicle)}
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
              <Bookmark
                style={{ 
                  paddingTop: '4px', 
                  paddingLeft: '2px', 
                  width: '18px', 
                  height: '18px',
                  float:'right',
                  color: this.state.bookmarkClick ? '#ffeb3b' : '#0000008a' 
                }}
                onClick={(event) => this.handleBookmarkClick(info.placeId, event)}
               
              />
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
                (tag, index, arr) => (
                  <nobr
                    align='left'
                    style={{
                      fontSize: '12.33px',
                      lineHeight: '22px',
                      color: 'rgba(0,0,0,0.6)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {arr.length - 1 === index?tag:tag+','}
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
