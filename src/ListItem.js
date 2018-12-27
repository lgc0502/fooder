import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Star from '@material-ui/icons/Star';
import StarHalf from '@material-ui/icons/StarHalf';
import StarBorder from '@material-ui/icons/StarBorder';

import ModifyUrl from './ModifyUrl.js'
import DistanceFormat from './DistanceFormat.js'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    height:'104px'
   
  },
  detail:{
      padding:'5px 10px 5px 10px',
      width:'100vw',
  },
  content:{
      padding:'0 5px'
  },
  star:{
      height:'18px',
      width: '18px',
  }
});

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#FFF350',
        main: '#FFF350' }, 
      secondary: { main: '#CC0000' }, 
    },
  });

class ListItem extends Component{
    
    constructor(props){
        super(props)
    }

    next = (handleNext,restaurantDetail,props) =>{
        handleNext("");
        restaurantDetail(props);
    }
    generateStar = (rating) =>{
        const { classes } = this.props;
        if(rating>=1){
            return <Star className={classes.star} color="secondary"/>
        }
        else if(rating>0){
          if(rating<=0.3){
            return <StarBorder className={classes.star} color="secondary"/>
          }
          else if(rating<=0.7){
            return <StarHalf className={classes.star} color="secondary"/>
          }
          else{
            return <Star className={classes.star} color="secondary"/>
          }
        }
        else if(rating<=0){
            return <StarBorder className={classes.star} color="secondary"/>
        }
    }
    maptags = (querytag, storetag) =>{
        var temp = [];
        for(var i=0;i<querytag.length;i++){
            for(var j=0;j<storetag.length;j++){
                if(querytag[i] == storetag[j]['id']){
                    temp.push(storetag[j]['text'])
                }
            }
        }
        return temp
    }
    
    render(){
        const { classes } = this.props;
        const info = this.props.restaurantinfo;
        var handleNext =   this.props.handleNext;
        var restaurantDetail =   this.props.restaurantDetail;

        return(
            <div>
                <div className={classes.root}>
                <GridList className={classes.gridList} cellHeight={104} >
                    {this.props.restaurantinfo["smallphotoUrls"].map(tile => (
                    <GridListTile >
                        <img className={classes.img} src={tile} key={this.props.restaurantinfo["smallphotoUrls"].indexOf(tile)}/>
                    </GridListTile>
                    ))}
                </GridList>
                </div>
                <div onClick={() => this.next(handleNext,restaurantDetail,info)} className={classes.detail}>
                    <div className={classes.content}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography align="left">{info['name']}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="right" style={{overflow: 'hidden'}}>
                                    {DistanceFormat.DistanceFormat(info['distance'])}
                                </Typography>
                            </Grid>
                        </Grid>
 
                        <Typography align="left">{this.generateStar(info['rating'])}
                            {this.generateStar(info['rating']-1)}
                            {this.generateStar(info['rating']-2)}
                            {this.generateStar(info['rating']-3)}
                            {this.generateStar(info['rating']-4)}
                            { info['reviewCount'] + "個評語"}</Typography>
                        <Typography align="left">{'$ '+info['priceLevel']}</Typography>
                        <Typography align="left">{this.maptags(this.props.tag,info["tags"]).map(tag =>(tag + " "))}</Typography>
                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(ListItem);
