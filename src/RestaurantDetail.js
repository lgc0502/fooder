import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import DetailQuery from './DetailQuery.js';

const styles = theme => ({
  content:{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      height:'calc(100vh - 112px)',
      'overflow-x':'hidden',
      'overflow-y':'auto',
      alignItems:'center',
      'margin-bottom':'56px'
  }
});


class RestaurantDetail extends Component{
    
    constructor(props){
        super(props)
    }
    render(){
        const { classes } = this.props;
        var tags = this.props.tags;
        var info =this.props.info;
        return(
          <div className={classes.content}>
            <DetailQuery
              tag={this.props.tags} 
              info={this.props.info}
            />
          </div>
        );
    }
}

export default withStyles(styles)(RestaurantDetail);