import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import ListItem from './ListItem.js'
import ModifyUrl from '../Common/ModifyUrl.js'
import Loading from '../../../../image/Spin-1s-63px.gif'

const styles = theme => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 'calc(100vh - 106px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    alignItems: 'center'
    //'margin-bottom':'56px'
  }
})
class InfiniteScrollList extends Component {
  handleScroll = e => {
    const bottom =
      Math.abs(
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
      ) <= 1 && e.target.scrollHeight !== 108
    //console.log(e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight, Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight))
    if (bottom) {
      this.props.onLoadMore()
    }
  }
  render() {
    if (!this.props.listdata && this.props.loading) {
      return <img src={Loading} alt={'Loading'} />
    }
    const data = this.props.listdata['restaurants'] || []
    const hasMore = this.props.listdata['hasMore']
    const { classes } = this.props
    return (
      <div className={classes.list} onScroll={this.handleScroll}>
        {data.map(d => {
          d['smallphotoUrls'] = ModifyUrl.ModifyUrl(d['photoUrls'])
          return (
            <ListItem
              key={d.id}
              tag={this.props.tag}
              handleNext={this.props.handleNext}
              restaurantinfo={d}
              restaurantInfoFunc={this.props.restaurantInfo}
            />
          )
        })}
        {hasMore === true ? <p>loading</p> : <p>噢噢...沒有更多店家了</p>}
      </div>
    )
  }
}

export default withStyles(styles)(InfiniteScrollList)
