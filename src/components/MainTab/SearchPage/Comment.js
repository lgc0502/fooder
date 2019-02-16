import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

import RatingStar from './RestaurantSearch/RatingStar.js'
const styles = theme => ({
  card: {
    margin:'5px',
    maxWidth: 400,
    backgroundColor:"rgba(255,243,80,0.3)"
  },
  header:{
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems:'center',
  },
  avatar: {
    backgroundColor: red[500],
    margin:'0 10px 0 0',
    height:'18px',
    width:'18px',
  },
  star:{
    justifyContent: 'flex-start',
    height:'18px',
    width: '18px',
  },
});

class Comment extends Component {
  
  render() {
    const { classes } = this.props;
    const info = this.props.review;
    return (
      <Card className={classes.card}>
        <CardContent>
            <div className={classes.header}>
                <Avatar aria-label="Recipe" className={classes.avatar} src={info['authorPhotoUrl']}></Avatar>
                <Typography style={{fontWeight:'bold'}}>{info['authorName']}</Typography>
                <Typography style={{padding:'0 0 0 10px'}}> {info['relativeTime']}</Typography>
            </div>
            <div className={classes.header} style={{padding:'5px 0 0 0'}}>
              <RatingStar rating={info['rating']}/>
            </div>
            <Typography component="p" style={{textAlign:'left', padding:'10px 0 0 0'}}>
              {info['text']}
            </Typography>
        </CardContent>

      </Card>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);