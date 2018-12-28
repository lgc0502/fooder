import React ,{ Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import Star from '@material-ui/icons/Star';
import StarHalf from '@material-ui/icons/StarHalf';
import StarBorder from '@material-ui/icons/StarBorder';
import LocationOn from '@material-ui/icons/LocationOn';
import NearMe from './image/icons8-near-me-filled-100.png';
import Comment from './Comment.js'
import DistanceFormat from './DistanceFormat.js'

const styles = theme => ({
  page:{
    display: 'flex',
    flexWrap: 'wrap',
    overflow:'auto',
    padding: '2px',
    height:'calc(100vh - 116px)',
    'margin-bottom':'56px'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit / 2,
    width:'calc(100vw - 12px)'
  },
  gridList: {
    'white-space': 'nowrap',
    'overflow-x': 'scroll',
    'text-align':'left',
  },
  /*root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    
  },*/
  img:{
    'border-radius':'4px',
    display: 'inline-block',
    height:'200px',
    width:'auto',
    margin:'0 2px'
  },
  detail:{
    padding:'10px 20px 5px 20px',
    width: 'calc(100vw - 40px)'
  },
  star:{
    height:'18px',
    width: '18px',
    'margin-bottom':'-2px'
  },
  chip: {
    justifyContent: 'center',
    width:'80px',
    height:'26px',
    margin:'5px 5px'
  },
  icon:{
    width:'16px',
    height:'16px'
  },

});

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#FFF350',
        main: '#FFF350' }, 
      secondary: { main: '#FF0000' }, 
      Inherit:'#263238'
    },
  });

class RestaurantDetail extends Component{
    
    constructor(props){
        super(props)
    }
    state = {
      time_click:0,
    };
    generateStar = (rating) =>{
      const { classes } = this.props;
      if(rating>=1){
          return <Star style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
      }
      else if(rating>0){
        if(rating<=0.3){
          return <StarBorder style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
        }
        else if(rating<=0.6){
          return <StarHalf style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
        }
        else{
          return <Star style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
        }
      }
      else if(rating<=0){
          return <StarBorder style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
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
    time_clicked = ()=>{
      if(this.state.time_click%2 == 0){
        return null;
      }
      else if(this.state.time_click%2 == 1){
        return ;
      }
    }
    
    render(){
        const { classes } = this.props;
        
        const info = this.props.detail
        return(
            <MuiThemeProvider theme={theme}>
              <div  className={classes.page}>
                <div className={classes.root}>
                  <div className={classes.gridList}>
                    {info["photoUrls"].map(tile => (
                        <img className={classes.img} src={tile} key={info["photoUrls"].indexOf(tile)}/>
                    ))}
                  </div>
                </div>
                <div className={classes.detail}>
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
                  <Grid container>
                    <Grid item xs={4}>
                    <Typography align="left"> {this.generateStar(info['rating'])}
                            {this.generateStar(info['rating']-1)}
                            {this.generateStar(info['rating']-2)}
                            {this.generateStar(info['rating']-3)}
                            {this.generateStar(info['rating']-4)}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography align="left">{info['reviewCount'] + "則評論"}</Typography>
                    </Grid>
                  </Grid>

                  <Typography align="left">{'$ '+info['priceLevel']}</Typography>
                  <div style={{justifyContent:"flex-start", 'text-align': 'left'}}>
                    {this.maptags(this.props.tags,info['tags']).map(tag =>(
                      <Chip 
                        className={classes.chip}
                        key={this.props.tags.indexOf(tag)}
                        label={tag}
                        color="primary"
                      />
                    ))}
                  </div>
                    <Grid container>
                      <Grid item xs={1} />
                      <Grid item xs={11} >
                        
                        <Typography align="left" style={{'line-height':'25px' ,"margin-top":'5px'}}
                          color={info['isOpenNow']==true?("#000000"):("secondary")}>
                          {info['isOpenNow']==true?("營業中 查看營業時間⌵"):("非營業時間 查看營業時間⌵")}
                        </Typography>
                        {info['openingHours'].map(hours=>(
                            <Typography align="left" style={{'line-height':'25px'}}>
                              {hours}
                            </Typography>
                          ))}
                      </Grid>
                    </Grid>

                    <Grid container style={{'line-height':'25px' ,"margin-top":'5px'}}>
                      <Grid item xs={1} style={{'text-align':'right'}}>
                        <LocationOn className={classes.icon}/>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography align="left">{info['location']['address']}</Typography>
                        <Typography align="left">{"電話 : "+info['phoneNumber']}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography align="center">導航</Typography>
                          <a href={"https://www.google.com/maps/search/?api=1&query="+info['location']['lat']+","+info['location']['long']+"&query_place_id="+info['placeId']}>
                            <img src={NearMe} style={{height:'28px'}}/>
                          </a>
                      </Grid>
                    </Grid>
                </div>
                <div style={{justifyContent:"flex-start"}}>
                    {info['reviews'].map(review =>(
                      <Comment review={review} />
                    ))}
                    <Typography align="center" style={{"pading-top":"8px"}}>僅顯示 Google Maps 5則最佳評論</Typography>
                </div>
              </div>    
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(RestaurantDetail);
