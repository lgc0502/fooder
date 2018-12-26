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

import geolocation from './geolocation.js'

import Star from '@material-ui/icons/Star';
import StarHalf from '@material-ui/icons/StarHalf';
import StarBorder from '@material-ui/icons/StarBorder';
import LocationOn from '@material-ui/icons/LocationOn';
import NearMe from '@material-ui/icons/NearMe';
import Comment from './Comment.js'


const styles = theme => ({
  page:{
    display: 'flex',
    flexWrap: 'wrap',
    height:'calc(100vh - 208px)',
    overflow:'auto',
    padding: theme.spacing.unit / 2,
    height:'calc(100vh - 116px)',
  },
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
  },
  detail:{
    padding:'10px 20px 10px 20px'
  },
  star:{
    height:'18px',
    width: '18px',
  },
  chip: {
    justifyContent: 'center',
    width:'80px',
    height:'26px',
    margin:'5px 5px'
  },
  icon:{
    width:'15px',
    height:'15px'
  }
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
          return <Star className={classes.star} color="secondary"/>
      }
      else if(rating>0){
        if(rating<=0.3){
          return <StarBorder className={classes.star} color="secondary"/>
        }
        else if(rating<=0.6){
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
    time_clicked = ()=>{
      if(this.state.time_click%2 == 0){
        return null;
      }
      else if(this.state.time_click%2 == 1){
        return ;
      }
    }
    /*statechange=()=>{
      this.setState({time_click: state.time_click+1})
    }*/
    render(){
        const { classes } = this.props;
        {console.log(geolocation.getLocation().then(d=>{return d.coords.latitude,d.coords.longitude}))}
        const info = this.props.detail
        return(
            <MuiThemeProvider theme={theme}>
              <div  className={classes.page}>
                <div className={classes.root}>
                  <GridList className={classes.gridList} cellHeight={213} cols={1}>
                      {info["photoUrls"].map(tile => (
                      <GridListTile >
                          <img className={classes.img} src={tile} key={info["photoUrls"].indexOf(tile)}/>
                      </GridListTile>
                      ))}
                      
                  </GridList>
                </div>
                <div className={classes.detail}>
                  <Typography align="left">{info['name']}</Typography>
                  <Typography align="left">{this.generateStar(info['rating'])}
                            {this.generateStar(info['rating']-1)}
                            {this.generateStar(info['rating']-2)}
                            {this.generateStar(info['rating']-3)}
                            {this.generateStar(info['rating']-4)}
                    {" "+info['reviewCount'] + "個評語"}</Typography>
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
                        
                        <Typography align="left" 
                          color={info['isOpenNow']==true?("#000000"):("secondary")}>
                          {info['isOpenNow']==true?("營業中 查看營業時間⌵"):("非營業時間 查看營業時間⌵")}
                        </Typography>
                        {info['openingHours'].map(hours=>(
                            <Typography align="left">
                              {hours}
                            </Typography>
                          ))}
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={1} style={{'text-align':'right'}}>
                        <LocationOn className={classes.icon}/>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography align="left">{info['location']['address']}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography align="center">導航</Typography>
                        <a href={"https://www.google.com/maps/search/?api=1&query="+info['location']['lat']+","+info['location']['long']+"&query_place_id="+info['placeId']}><NearMe size="small" color="Inherit"/></a>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={1} />
                      <Grid item xs={8}>
                        <Typography align="left">{"電話 :"+info['phoneNumber']}</Typography>
                      </Grid>
                      <Grid item xs={3}></Grid>
                    </Grid>
                </div>
                <div style={{justifyContent:"flex-start"}}>
                    {info['reviews'].map(review =>(
                      <Comment review={review} />
                    ))}
                </div>
              </div>    
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(RestaurantDetail);
