import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

import ListCard from './ListCard.js';
import ModifyUrl from './ModifyUrl.js';

const styles = theme => ({
    gridList: {
        'white-space': 'nowrap',
        'overflow-x': 'scroll',
        'text-align':'left',
        position: 'relative',
        bottom: '105px',
      },
});
class InfiniteScrollList extends Component {
  handleScroll = (e) => {
    const bottom = Math.abs(e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth) <= 1;
    console.log(e.target.scrollWidth, e.target.scrollLeft, e.target.clientWidth, Math.abs(e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth))
    if (bottom) {  
      this.props.onLoadMore(); 
    }
  }
  render() {
    if (!this.props.listdata && this.props.loading) {
      return <p>Loading....</p>;
    }
    const data = this.props.listdata['restaurants'] || [];
    const hasMore = this.props.listdata['hasMore'];
    const { classes } = this.props;
    return (
      <div className={classes.gridList} onScroll={this.handleScroll}>
        {data.map(d => {
            return(
                <ListCard
                    //class
                    key={data.indexOf(d)}
                    tag={this.props.tag} 
                    handleNext={this.props.handleNext} 
                    restaurantinfo={d}
                    restaurantInfo={this.props.restaurantInfo}
                /> 
            )
        })}  
        {/*hasMore == true?(<p>loading</p>):(<p>噢噢...沒有更多店家了</p>)*/}
      </div>
    );
  }
}

export default withStyles(styles)(InfiniteScrollList);