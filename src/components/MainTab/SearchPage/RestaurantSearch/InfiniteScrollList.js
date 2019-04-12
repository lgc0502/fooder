import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ReactDOM from 'react-dom'

import ListItem from './ListItem.js'
import ModifyUrl from '../Common/ModifyUrl.js'
import Loading from '../../../../image/Spin-1s-63px.gif'

const styles = theme => ({
  list: {
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    alignItems: 'center'
  }
})

class InfiniteScrollList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollTop: 0
    }
  }
  handleScroll = e => {
    const bottom =
      Math.abs(
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
      ) <= 1 && e.target.scrollHeight !== 108
    this.props.handleScrollRecord(
      Math.floor((e.target.scrollTop - 177 + 200) / 230)
    )
    if (bottom) {
      this.props.onLoadMore()
    }
    this.setState({
      scrollTop: e.target.scrollTop
    })
  }
  componentDidMount() {
    if (ReactDOM.findDOMNode(this.refs.list) != null) {
      ReactDOM.findDOMNode(this.refs.list).scrollTo(
        0,
        this.props.scrollrecord * 230
      )
    }
  }
  render() {
    if (!this.props.listdata && this.props.loading) {
      return <img src={Loading} alt={'Loading'} />
    }
    const data = this.props.listdata['restaurants'] || []
    const hasMore = this.props.listdata['hasMore']
    const { classes, sorttype} = this.props
    return (
      <div 
        className={classes.list} 
        ref={'list'} 
        onScroll={this.handleScroll}
        style={{ height: sorttype===1?'calc(100vh - 186px)':'calc(100vh - 146px)'}}
      >
        {data.map(d => {
          d['smallphotoUrls'] = ModifyUrl.ModifyUrl(d['photoUrls'])
          return (
            <ListItem
              key={d.id}
              tag={this.props.tag}
              handleScrollRecord={this.props.handleScrollRecord}
              handleNext={this.props.handleNext}
              restaurantinfo={d}
              restaurantInfoFunc={this.props.restaurantInfo}
              height={this.state.scrollTop}
            />
          )
        })}
        {hasMore === true ? <p>loading</p> : <p>噢噢...沒有更多店家了</p>}
      </div>
    )
  }
}

export default withStyles(styles)(InfiniteScrollList)
