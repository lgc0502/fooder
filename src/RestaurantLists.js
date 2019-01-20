import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InfiniteScroll from "react-infinite-scroll-component";

import ListQuery from './ListQuery.js'
import Comment from './Comment.js'
import geolocation from './geolocation.js'

const styles = theme => ({
    list:{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height:'calc(100vh - 106px)',
        'overflow-x':'hidden',
        'overflow-y':'auto',
        alignItems:'center',
        'margin-bottom':'56px'
    }
});
const style = {
    height: 30,
    border: "1px solid green",
    width:'calc(100vw - 28px)',
    margin: 6,
    padding: 8
};
const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#FFF350',
        main: '#FFF350' }, 
      secondary: { main: '#263238' }, 
    },
  });

class RestaurantLists extends Component{
    
    constructor(props){
        super(props)
    }

    state = {
        items: Array.from({ length: 20 }),
        hasMore: true
    };
    
    fetchMoreData = () => {
        /*if (this.state.items.length >= 500) {
          this.setState({ hasMore: false });
          return;
        }*/
        this.setState({
            items: this.state.items.concat(Array.from({ length: 20 }))
        });
    };
    render(){
        const { classes } = this.props;
        var handleNext =   this.props.handleNext;
        var restaurantInfo = this.props.restaurantInfo;

        return (
            <div >
              {console.log(ListQuery.query(this.props.tags,this.props.position[0], this.props.position[1]))}
              <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
                height='calc(100vh - 106px)'
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>已無資料</b>
                  </p>
                }
              >
                {this.state.items.map((i, index) => (
                  <div style={style} key={index}>
                    div - #{index}
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          );
    }
    /*  render() {
        const { classes } = this.props;
        var handleNext =   this.props.handleNext;
        var restaurantInfo = this.props.restaurantInfo;

        return (
          <div >
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              height='calc(100vh - 106px)'
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {this.state.items.map((i, index) => (
                <div style={style} key={index}>
                  div - #{index}
                </div>
              ))}
            </InfiniteScroll>
          </div>
        );
      }*/
    /*handleScroll = (e) => {
        const bottom = Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) <= 100 &&
                     Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) > 0;
        console.log(e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight, Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight))
        if (bottom) { console.log("hi") }
    }*/
    /*render(){
        const { classes } = this.props;
        var handleNext =   this.props.handleNext;
        var restaurantInfo = this.props.restaurantInfo;

        return(
            <div className={classes.list} onScroll={this.handleScroll}>
                <ListQuery
                    handleNext={handleNext} 
                    tag={this.props.tags} 
                    restaurantInfo = {restaurantInfo}
                    position={this.props.position}
                />
            </div>
        );
    }*/
}
export default withStyles(styles)(RestaurantLists);
