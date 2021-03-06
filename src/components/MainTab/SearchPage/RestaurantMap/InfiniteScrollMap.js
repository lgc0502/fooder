import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ReactDOM from 'react-dom'
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';

import ListCard from './ListCard.js'
import Map from './Map.js'
import ModifyUrl from '../Common/ModifyUrl.js'

const styles = theme => ({
  gridList: {
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    textAlign: 'left',
    position: 'relative',
    bottom: '123px'
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflowX: 'hidden',
    overflowY: 'hidden',
    alignItems: 'flex-end',
    marginBottom: '56px'
  }
})

class InfiniteScrollList extends Component {
  handleScroll = e => {
    const bottom =
      Math.abs(
        e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth
      ) <= 1
    this.props.handleScrollRecord(Math.floor((e.target.scrollLeft + 100) / 218))
    if (bottom) {
      this.props.onLoadMore()
    }
  }
  componentDidMount() {
    if (ReactDOM.findDOMNode(this.refs.list) != null) {
      ReactDOM.findDOMNode(this.refs.list).scrollTo(
        this.props.scrollrecord * 218,
        0
      )
    }
  }
  render() {
    if (!this.props.listdata && this.props.loading) {
      return <p>Loading....</p>
    }
    const {
      classes,
      listdata,
      tag,
      handleNext,
      scrollrecord,
      position,
      sortType
    } = this.props
    const data = listdata['restaurants'] || []
    const hasMore = listdata['hasMore']
    return (
      <div
        className={classes.list}
        style={{
          height: sortType === 1 ? 'calc(100vh - 170px)' : 'calc(100vh - 130px)'
        }}
      >
        <Map
          isMarkerShown
          scrollrecord={scrollrecord}
          data={data}
          position={position}
          sortType={sortType}
        />
        <div
          className={classes.gridList}
          ref={'list'}
          onScroll={this.handleScroll}
          onTouchStart={e => {
            //console.log(e.changedTouches[0].pageX)
          }}
          onTouchEnd={e => {
            //console.log(e.changedTouches[0].pageX)
          }}
        >
          {data.map(d => {
            d['smallphotoUrls'] = ModifyUrl.ModifyUrl(d['photoUrls'])
            return (
              <ListCard
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
      </div>
    )
  }
}

export default withStyles(styles)(InfiniteScrollList)
