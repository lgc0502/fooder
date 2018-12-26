import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import SearchRestaurant from './RestaurantQuery.js'
import Comment from './Comment.js'

const styles = theme => ({
    list:{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height:'calc(100vh - 112px)',
        overflow:'auto',
        
    }
});

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

    render(){
        const { classes } = this.props;
        var handleNext =   this.props.handleNext;
        var restaurantDetail =   this.props.restaurantDetail;
        return(
            <div className={classes.list}>
                {SearchRestaurant.SearchRestaurant(handleNext,restaurantDetail,this.props.tags)}
            </div>
        );
    }
}
export default withStyles(styles)(RestaurantLists);
