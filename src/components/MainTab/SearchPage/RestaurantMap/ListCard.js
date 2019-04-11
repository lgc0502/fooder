import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
// import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

import DistanceFormat from '../Common/DistanceFormat.js'
import RatingStar from '../Common/RatingStar.js'
import TagsMapping from '../Common/TagsMapping.js'

const styles = {
  card: {
    backgroundColor: 'white',
    height: '110px',
    display: 'inline-block',
    margin: '0 0 15px 20px',
    'border-radius':'15px'
  },
  content: {
    padding: '12px',
    'white-space': 'initial'
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
}
class ListCard extends Component {
  next = (handleNext, props, restaurantInfo) => {
    handleNext('')
    restaurantInfo(props)
  }
  render() {
    const {
      classes,
      restaurantinfo: info,
      handleNext,
      restaurantInfoFunc: restaurantInfo
    } = this.props
    
    return (
      <Card
        className={classes.card}
        onClick={() => this.next(handleNext, info, restaurantInfo)}
        style={{
          width: '198px',
        }}
      >
        <div className={classes.content}>
          <Grid container>
            <Grid item xs={10} style={{ height: '21px' }}>
              <Typography align='left' style={{ fontWeight: '700', overflow:'hidden',height: '21px' }}>
                {info['name']}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {/*收藏按鈕*/}
            </Grid>
          </Grid>
          <div align='left'>
            <div
              align='left'
              style={{ width: '87px', display: 'inline-block' }}
            >
              <RatingStar rating={info['rating']} theme={0}/>
            </div>
            <Typography
              align='left'
              style={{
                display: 'inline-block',
                paddingRight: '4px',
                fontSize: '12px'
              }}
            >
              {info['rating'].toFixed(1)}
            </Typography>
          </div>
          <Typography
              align='left'
              style={{ fontSize: '12.33px',marginTop:'2px' }}
          >
              {'$ ' + info['priceLevel']}
          </Typography>
          <div style={{ justifyContent: 'flex-start', textAlign: 'left' }}>
            {TagsMapping.sametags(this.props.tag, info['tags']).map((tag, index) => (
              <nobr
                align='left'
                style={{ 
                  fontSize: '12.33px',
                  //lineHeight:'22px',
                  color:'rgba(0,0,0,0.6)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag+', '}
              </nobr>
            ))}
          </div>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(ListCard)
