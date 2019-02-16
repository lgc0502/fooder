import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';

import ListCard from '../ListCard.js'
// import ModifyUrl from './RestaurantSearch/ModifyUrl.js';

const styles = theme => ({
  gridList: {
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    textAlign: 'left',
    position: 'relative',
    bottom: '105px'
  }
})

class InfiniteScrollList extends Component {
  handleScroll = e => {
    const bottom =
      Math.abs(
        e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth
      ) <= 1
    console.log(
      e.target.scrollWidth,
      e.target.scrollLeft,
      e.target.clientWidth,
      Math.abs(
        e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth
      )
    )
    if (bottom) {
      this.props.onLoadMore()
    }
  }
  render() {
    if (!this.props.listdata && this.props.loading) {
      return <p>Loading....</p>
    }
    const { classes, listdata, tag, handleNext } = this.props
    const data = listdata['restaurants'] || []
    const hasMore = listdata['hasMore']
    return (
      <div
        className={classes.gridList}
        onScroll={this.handleScroll}
        onTouchStart={e => {
          console.log(e.changedTouches[0].pageX)
        }}
        onTouchEnd={e => {
          console.log(e.changedTouches[0].pageX)
        }}
      >
        {data.map(d => {
          return (
            <ListCard
              //class
              key={data.indexOf(d)}
              tag={tag}
              handleNext={handleNext}
              restaurantinfo={d}
              restaurantInfoFunc={this.props.restaurantInfo}
            />
          )
        })}
        {hasMore === true ? (
          <p
            style={{
              display: 'inline-block',
              position: 'relative',
              top: '-60px',
              padding: '24px'
            }}
          >
            loading
          </p>
        ) : (
          <p
            style={{
              display: 'inline-block',
              position: 'relative',
              top: '-60px',
              padding: '24px'
            }}
          >
            噢噢...沒有更多店家了
          </p>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(InfiniteScrollList)
