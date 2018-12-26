import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Star from '@material-ui/icons/Star';
import StarHalf from '@material-ui/icons/StarHalf';
import StarBorder from '@material-ui/icons/StarBorder';

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
    height:'30px',
    width:'30px',
  },
  star:{
    justifyContent: 'flex-start',
    height:'18px',
    width: '18px',
  },
});

class Comment extends React.Component {
  generateStar = (rating) =>{
    const { classes } = this.props;
    if(rating>=1){
        return <Star className={classes.star} color="secondary"/>
    }
    else if(rating>0){
        return <StarHalf className={classes.star} color="secondary"/>
    }
    else if(rating<=0){
        return <StarBorder className={classes.star} color="secondary"/>
    }
  }
  render() {
    const { classes } = this.props;
    const info = this.props.review;
    return (
      <Card className={classes.card}>
        <CardContent>
            <div className={classes.header}>
                <Avatar aria-label="Recipe" className={classes.avatar} src={info['authorPhotoUrl']}></Avatar>
                <Typography variant="subtitle1" style={{'font-weight':'bold'}}>{info['authorName']}</Typography>
                <Typography variant="subtitle2" style={{padding:'0 0 0 10px'}}> {info['relativeTime']}</Typography>
            </div>
            <div className={classes.header} style={{padding:'5px 0 0 0'}}>
              {this.generateStar(info['rating'])}
              {this.generateStar(info['rating']-1)}
              {this.generateStar(info['rating']-2)}
              {this.generateStar(info['rating']-3)}
              {this.generateStar(info['rating']-4)}
            </div>
            <Typography component="p" style={{'text-align':'left', padding:'10px 0 0 0'}}>
              {info['text']}
            </Typography>
        </CardContent>

      </Card>
    );
  }
}
/*authorName,
authorPhotoUrl,
relativeTime,
rating,
text,*/
Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);