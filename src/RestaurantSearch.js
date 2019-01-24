import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import RestaurantList from "./RestaurantList.js";
import moment from "moment";
const styles = theme => ({
    content:{
        width:'100vw'
    }
});

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#FF0000',
        main: '#FF0000' }, // Purple and green play nicely together.
      secondary: { main: '#FF0000' }, // This is just green.A700 as hex.
    },
});

class RestaurantSearch extends Component {
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes } = this.props;
        const { value } = this.state;

        var tag = this.props.tags;
        var handleNext =   this.props.handleNext;
        var restaurantInfo = this.props.restaurantInfo;
        var position = this.props.position;
       
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    
                    <RestaurantList
                        className={classes.content} 
                        tags={tag} 
                        type={this.state.value}
                        restaurantInfo={restaurantInfo} 
                        handleNext = {handleNext} 
                        position = {position} />
                </MuiThemeProvider>
            </div>
    );
  }
}

export default withStyles(styles)(RestaurantSearch);

/*
<BottomNavigation value={value} onChange={this.handleChange} showLabels style={{height:'40px', alignItems:'center'}}>
                        <BottomNavigationAction label="熱門程度" /><div style={{'color':'#CFCFCF'}}>|</div>
                        <BottomNavigationAction label="距離排序" /><div style={{'color':'#CFCFCF'}}>|</div>
                        <BottomNavigationAction label="價格範圍↕" />
                    </BottomNavigation>
*/