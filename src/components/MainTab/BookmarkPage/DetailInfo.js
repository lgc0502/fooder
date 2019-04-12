import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
// import IconButton from '@material-ui/core/IconButton';
// import Fab from '@material-ui/core/Fab';

import LocationOn from '@material-ui/icons/LocationOn'
import AccessTime from '@material-ui/icons/AccessTime'
import Phone from '@material-ui/icons/Phone'
import Bookmark from '@material-ui/icons/Bookmark'

import NearMe from '../../../image/icons8-near-me-filled-100.png'
import Comment from '../SearchPage/Comment'
import DistanceFormat from '../SearchPage/Common/DistanceFormat.js'
import RatingStar from '../SearchPage/Common/RatingStar.js'
import TagsMapping from '../SearchPage/Common/TagsMapping.js'
const styles = theme => ({
  page: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
    padding: '2px',
    height: 'calc(100vh - 116px)'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit / 2,
    width: 'calc(100vw - 12px)'
  },
  gridList: {
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    textAlign: 'left'
  },
  img: {
    borderRadius: '4px',
    display: 'inline-block',
    height: '200px',
    width: 'auto',
    margin: '0 2px'
  },
  detail: {
    padding: '10px 20px 5px 20px',
    width: 'calc(100vw - 40px)'
  },
  star: {
    height: '18px',
    width: '18px',
    marginBottom: '-2px'
  },
  chip: {
    justifyContent: 'center',
    margin: '5px 12px 5px 0px',
    backgroundColor: '#ffffff',
    border: '1px #000000 solid',
    width: '80px',
    height: '32px',
    fontSize: '12px'
  },
  icon: {
    width: '18px',
    height: '18px'
  }
})

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFF350',
      main: '#FFF350'
    },
    secondary: { main: '#ffeb3b' },
    Inherit: '#263238'
  },
  typography: {
    useNextVariants: true
  }
})

class RestaurantDetail extends Component {
  constructor(props) {
    super(props)
    const temp = localStorage.getItem('id')
    let bool
    if (temp === null)
      bool = false
    else if (temp.indexOf(props.info.placeId) === -1)
      bool = false
    else
      bool = true
    this.state = {
      time_click: 0,
      bookmarkClick: bool
    }
  }

  time_clicked = () => {
    this.setState({
      time_click: this.state.time_click ? 0 : 1
    })
    if (this.state.time_click === 1) {
      document.getElementById('openhour').innerHTML = ''
    } else if (this.state.time_click === 0) {
      document.getElementById('openhour').innerHTML =
        this.props.detail['openingHours'][0] +
        '<br>' +
        this.props.detail['openingHours'][1] +
        '<br>' +
        this.props.detail['openingHours'][2] +
        '<br>' +
        this.props.detail['openingHours'][3] +
        '<br>' +
        this.props.detail['openingHours'][4] +
        '<br>' +
        this.props.detail['openingHours'][5] +
        '<br>' +
        this.props.detail['openingHours'][6] +
        '<br>'
    }
  }

  handleBookmarkClick = id => {
    const prevData = localStorage.getItem('id')
    if (this.state.bookmarkClick) {
      if (prevData.indexOf(id) !== -1) {
        let tempArray = prevData.split(' ')
        tempArray = tempArray.filter(element => element !== id)
        localStorage.setItem('id', tempArray.join(' '))
      }
    } else {
      if (prevData === null){
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
  }

  render() {
    const { classes, tag, info, detail } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.page}>
          <div className={classes.root}>
            <div className={classes.gridList}>
              {info['photoUrls'].map(tile => (
                <img
                  className={classes.img}
                  src={tile}
                  key={info['photoUrls'].indexOf(tile)}
                  alt={'title'}
                />
              ))}
            </div>
          </div>
          <div className={classes.detail}>
            <Grid container>
              <Grid item xs={9}>
                <Typography
                  align='left'
                  style={{ fontWeight: '700', fontSize: '16px' }}
                >
                  {detail['name']}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align='right' style={{ overflow: 'hidden' }}>
                  {DistanceFormat.DistanceFormat(info['distance'])}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={11}>
                <div align='left'>
                  <div
                    align='left'
                    style={{ width: '87px', display: 'inline-block' }}
                  >
                    <RatingStar rating={info['rating']} />
                  </div>
                  <Typography
                    align='left'
                    style={{ display: 'inline-block', paddingRight: '4px' }}
                  >
                    {info['rating'].toFixed(1)}
                  </Typography>
                  <Typography
                    align='left'
                    style={{ display: 'inline-block', paddingRight: '4px', color:'rgba(0, 0, 0, 0.6)' }}
                    onClick={() => window.open(
                      `https://www.google.com/search?q=${detail['name']}`,
                      '_blank' // <- This is what makes it open in a new window.
                    )}
                  >
                    {' - Google'}
                  </Typography>
                </div>
                <Typography align='left'>
                  {'$ ' + info['priceLevel']}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Bookmark
                  className={classes.icon}
                  style={{ paddingTop: '5px', paddingLeft: '2px'}}
                  onClick={() => this.handleBookmarkClick(info.placeId)}
                  color={this.state.bookmarkClick ? 'secondary' : 'inherit'}
                />
              </Grid>
            </Grid>
            <div style={{ display: 'flex' }}>
              <Grid container style={{ lineHeight: '25px', marginTop: '5px' }}>
                <Grid
                  item
                  xs={1}
                  style={{ textAlign: 'left', paddingTop: '2px' }}
                >
                  <AccessTime
                    className={classes.icon}
                    style={{ paddingTop: '5px', paddingLeft: '2px' }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Typography
                    align='left'
                    style={{ lineHeight: '35px' }}
                    color='default'
                    onClick={() => {
                      this.time_clicked()
                    }}
                  >
                    {detail['isOpenNow'] === true ? '營業中 ⌵' : '非營業時間 ⌵'}
                  </Typography>
                  <Typography
                    id='openhour'
                    align='left'
                    style={{ lineHeight: '35px' }}
                  >
                    {' '}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{ textAlign: 'left', paddingTop: '2px' }}
                >
                  <LocationOn
                    className={classes.icon}
                    style={{ paddingTop: '5px', paddingLeft: '2px' }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Typography align='left' style={{ lineHeight: '35px' }}>
                    {detail['location']['address']}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{ textAlign: 'left', paddingTop: '2px' }}
                >
                  <Phone
                    className={classes.icon}
                    style={{ paddingTop: '5px', paddingLeft: '2px' }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Typography align='left' style={{ lineHeight: '35px' }}>
                    {detail['phoneNumber']}
                  </Typography>
                </Grid>
              </Grid>
              <div style={{ marginTop: '40px' }}>
                <Typography>
                  <a
                    href={
                      'https://www.google.com/maps/search/?api=1&query=' +
                      detail['location']['coordinates']['lat'] +
                      ',' +
                      detail['location']['coordinates']['lng'] +
                      '&query_place_id=' +
                      detail['placeId']
                    }
                  >
                    <img
                      src={NearMe}
                      style={{ height: '38px' }}
                      alt={'NearMe'}
                    />
                  </a>
                </Typography>
                <Typography align='center'>{'導航'}</Typography>
              </div>
            </div>
          </div>
          <div
            style={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              marginLeft: '1.25rem'
            }}
          >
            {TagsMapping.maptags(this.props.tag, info['tags']).map((tag, index) => (
              <Chip
                className={classes.chip}
                key={index}
                label={tag}
              />
            ))}
          </div>
          <div style={{ justifyContent: 'flex-start', marginTop: '8px' }}>
            {detail['reviews'].map(review => (
              <Comment
                review={review}
                key={detail['reviews'].indexOf(review)}
              />
            ))}
            <Typography align='center' style={{ paddingTop: '8px' }}>
              僅顯示 Google Maps 5則最佳評論
            </Typography>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(RestaurantDetail)
/*

*/
