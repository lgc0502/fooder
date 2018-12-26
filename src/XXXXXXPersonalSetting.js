import React ,{ Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

import Walk from '@material-ui/icons/DirectionsWalk';
import Bike from '@material-ui/icons/DirectionsBike';
import Car from '@material-ui/icons/DirectionsCar';

import Appbar from './App_Bar.js';

const styles = theme => ({
    context:{
        height: '400px',
        alignItems:'center',
    },
    button:{
        backgroundColor:'#FFC107',
    },
    fab:{
        backgroundColor:'#FFC107',
        margin:'45px 0 48px 0',
        height:'81px',
        width:'81px'
    },
    grid:{
        justifyContent:'center',
    },
    icon:{
        height:'40px',
        width:'40px'
    }
    
});

class PersonalSetting extends Component{
    
    constructor(props){
        super(props)
    }
    render(){
        const { classes, theme } = this.props;

        var handleNext =   this.props.handleNext;
        var handleBack =   this.props.handleBack;
        var handleReset =   this.props.handleReset;

        return(
            <div>
            <Appbar text="個人化設定"/>
            <Typography variant="subtitle2" color='#263238' className="title" >
                交通工具
            </Typography>
            <Grid container className={classes.grid}>
                <Grid item xs={3}>
                    <Fab color="secondary" aria-label="Add" size="large" className={classes.fab}>
                        <Walk className={classes.icon}/>
                    </Fab>
                </Grid>
                <Grid item xs={4}>
                    <Fab color="secondary" aria-label="Add" size="large" className={classes.fab}>
                        <Bike className={classes.icon}/>
                    </Fab>
                </Grid>
                <Grid item xs={3}>
                    <Fab color="secondary" aria-label="Add" size="large" className={classes.fab}>
                        <Car className={classes.icon}/>
                    </Fab>
                </Grid>
            </Grid>
            <div className={classes.context}>
                <Button variant="contained" className={classes.button} onClick={() => handleNext()}>
                    開始使用食圈圈
                </Button>
            </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PersonalSetting);
