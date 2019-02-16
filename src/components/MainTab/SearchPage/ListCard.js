import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import DistanceFormat from './RestaurantSearch/DistanceFormat.js'
import RatingStar from './RestaurantSearch/RatingStar.js'
import TagsMapping from './RestaurantSearch/TagsMapping.js'

const styles = {
  card: {
    backgroundColor:"rgba(255,243,80,0.3)",
    width:'240px',
    height: '92px',
    display:'inline-block',
    margin:'0 0 15px 20px',
  },
  content:{
      padding:'8px',
      'white-space':'initial'
  },
  chip: {
    justifyContent: 'center',
    width:'56px',
    height:'17px',
    'font-size':'10px',
    margin:'5px 10px 5px 0px',
    backgroundColor:'#FFF350',
    color:'#263238'
  },
};

class ListCard extends Component {
    constructor(props){
        super(props)
    }
    next = (handleNext,props,restaurantInfo) =>{
        handleNext("");
        restaurantInfo(props)
    }
    render(){
        const { classes } = this.props;
        const info = this.props.restaurantinfo;
        var handleNext =   this.props.handleNext;
        var restaurantInfo = this.props.restaurantInfoFunc;

        return (
            <Card className={classes.card}  onClick={() => this.next(handleNext,info,restaurantInfo)}>
                <div className={classes.content} >
                    <Grid container>
                        <Grid item xs={8} style={{height:'35px'}}>
                            <Typography align="left" style={{fontWeight:'700'}}>{info['name']}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" style={{overflow: 'hidden'}}>
                                {DistanceFormat.DistanceFormat(info['distance'])}
                            </Typography>
                        </Grid>
                    </Grid>
                    <div align="left">
                        <Typography align="left" style={{display:'inline-block',paddingRight:'4px', fontSize:'12px'}}>
                            {info['rating'].toFixed(1)}
                        </Typography>
                        <div align="left" style={{width:'87px', display:'inline-block'}}> 
                            <RatingStar rating={info['rating']} />
                        </div>
                        <Typography align="left" style={{display:'inline-block', fontSize:'12px'}}>{'$ '+info['priceLevel']}</Typography>
                    </div>
                    <div style={{justifyContent:"flex-start", textAlign: 'left'}}>
                        {TagsMapping.sametags(this.props.tag,info['tags']).map(tag =>(
                                <Chip 
                                    className={classes.chip}
                                    key={this.props.tag.indexOf(tag)}
                                    label={tag}
                                    color="primary"
                                />
                        ))}
                    </div>
                </div> 
            </Card>
          );
    }
}

export default withStyles(styles)(ListCard);