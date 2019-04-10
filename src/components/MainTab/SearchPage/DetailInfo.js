import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton';
// import Fab from '@material-ui/core/Fab';

import LocationOn from '@material-ui/icons/LocationOn'
import AccessTime from '@material-ui/icons/AccessTime'
import Phone from '@material-ui/icons/Phone'
import Bookmark from '@material-ui/icons/Bookmark'
import NearMe from '@material-ui/icons/Navigation'

import Comment from './Comment.js'
import DistanceFormat from './Common/DistanceFormat.js'
import RatingStar from './Common/RatingStar.js'
import TagsMapping from './Common/TagsMapping.js'
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
    //padding: '0 theme.spacing.unit / 2',
    width: 'calc(100vw - 12px)'
  },
  gridList: {
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    textAlign: 'left'
  },
  img: {
    //borderRadius: '4px',
    display: 'inline-block',
    height: '208px',
    width: 'auto',
    margin: '0 2px'
  },
  detail: {
    padding: '10px 20px 5px 20px',
    width: 'calc(100vw - 40px)'
  },
  star: {
    height: '20px',
    width: '20px',
    marginBottom: '-2px'
  },
  chip: {
    justifyContent: 'center',
    margin: '5px 12px 5px 0px',
    backgroundColor: '#ffffff',
    border: '1px rgba(0, 0, 0, 0.12) solid',
    //width: '80px',
    color:'rgba(0, 0, 0, 0.87)',
    height: '35px',
    padding: '0 3px',
    fontSize: '12.33px'
  },
  icon: {
    width: '16px',
    height: '16px'
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
    else if (temp.indexOf(props.info.id) === -1)
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
                    <RatingStar rating={info['rating']} theme={1}/>
                  </div>
                  <Typography
                    align='left'
                    style={{ display: 'inline-block', paddingRight: '4px' }}
                  >
                    {info['rating'].toFixed(1)}
                  </Typography>
                </div>
                <Typography align='left' style={{ lineHeight:'28px',color:'rgba(0, 0, 0, 0.6)' }}>
                  {'$ ' + info['priceLevel']}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Bookmark
                  className={classes.icon}
                  style={{ paddingTop: '5px', paddingLeft: '2px'}}
                  onClick={() => this.handleBookmarkClick(info.id)}
                  color={this.state.bookmarkClick ? 'secondary' : 'inherit'}
                />
              </Grid>
            </Grid>
            <div style={{ display: 'flex' }}>
              <Grid container style={{ lineHeight: '25px', marginTop: '5px' }}>
                <Grid
                  item
                  xs={1}
                  style={{ textAlign: 'left', paddingTop: '5px' }}
                >
                  <AccessTime
                    className={classes.icon}
                    style={{ paddingTop: '5px', paddingLeft: '2px',color:'rgba(0, 0, 0, 0.6)' }}
                  />
                </Grid>
                <Grid item xs={11} >
                  <div style={{ display:'flex' }}>
                    <Typography
                      align='left'
                      style={{ 
                        lineHeight: '35px',
                        color:'rgba(0, 0, 0, 0.87)',
                        fontSize: '12.33px'
                      }}
                      onClick={() => {
                        this.time_clicked()
                      }}
                    >
                      {detail['isOpenNow'] === true ? '營業中 ' : '非營業時間 '}
                    </Typography>
                    <Typography
                      align='left'
                      style={{ 
                        lineHeight: '35px', 
                        color:'rgba(0, 0, 0, 0.6)',
                        marginLeft:'10px',
                        fontSize: '12.33px'
                      }}
                      onClick={() => {
                        this.time_clicked()
                      }}
                    >
                      {'查看營業時間'}
                    </Typography>  
                  </div>
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
                    style={{ paddingTop: '7px', paddingLeft: '2px',color:'rgba(0, 0, 0, 0.6)' }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Typography align='left' style={{ lineHeight: '35px',color:'rgba(0, 0, 0, 0.87)',fontSize: '12.33px' }}>
                    {detail['location']['address']}
                  </Typography>
                </Grid>
              </Grid>
              <div>
                <a href={
                        'https://www.google.com/maps/search/?api=1&query=' +
                        detail['location']['coordinates'][0] +
                        ',' +
                        detail['location']['coordinates'][1] +
                        '&query_place_id=' +
                        detail['placeId']}
                >
                  <IconButton 
                    className={classes.button} 
                    aria-label="Delete" 
                    style={{padding:'24px 12px 0 12px'}}
                  >
                    <NearMe style={{color:'#37474f'}}/>
                  </IconButton>
                </a>
                <Typography align='center' style={{fontSize: '12.33px'}}>
                  {'導航'}
                </Typography>
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
