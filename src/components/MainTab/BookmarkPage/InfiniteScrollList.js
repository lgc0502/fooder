import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ReactDOM from 'react-dom'

import ListItem from './ListItem.js'
import ModifyUrl from '../../MainTab/SearchPage/Common/ModifyUrl.js'
import Loading from '../../../image/Spin-1s-63px.gif'

const styles = theme => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 'calc(100vh - 106px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    alignItems: 'center'
  }
})

class InfiniteScrollList extends Component {
  componentDidMount() {
    /*if(ReactDOM.findDOMNode(this.refs.list) == null) {
      //position = 0
    }*/
    if (ReactDOM.findDOMNode(this.refs.list) != null) {
      ReactDOM.findDOMNode(this.refs.list).scrollTo(
        0,
        this.props.scrollrecord * 200
      )
    }
  }
  render() {
    if (!this.props.listdata && this.props.loading) {
      return <img src={Loading} alt={'Loading'} />
    }
    const data = this.props.listdata || []
    const { classes, handleRestaurant, handleNext } = this.props
    return (
      <div className={classes.list} ref={'list'} onScroll={this.handleScroll}>
        {data.map(d => {
          d['smallphotoUrls'] = ModifyUrl.ModifyUrl(d['photoUrls'])
          return (
            <ListItem
              key={d.id}
              tag={d.tags}
              handleNext={handleNext}
              restaurantinfo={d}
              handleRestaurant={handleRestaurant}
            />
          )
        })}
        <p>噢噢...沒有更多店家了</p>
      </div>
    )
  }
}

export default withStyles(styles)(InfiniteScrollList)
