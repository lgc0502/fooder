import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

import button1 from './image/image-5-01.jpg';
import button2 from './image/image-5-02.jpg';
import button3 from './image/image-5-03.jpg';
import button4 from './image/image-5-04.jpg';

const styles = theme => ({
    root:{
        height:'calc(100vh - 186px)',
        alignItems:'center',
    },
    img:{
        width:'153px',
        margin:'10px',
    },
    buttontop:{
        height:'202px',
        width:'160px',
        'margin-top':'calc(50vh - 258px)',
    },
    buttonright:{
        height:'202px',
        width:'160px',
        'margin-right':'calc(50vw - 170px)'
    },
    buttonbottom:{
        height:'202px',
        width:'160px',
        'margin-bottom':'calc(50vh - 258px)',
    },
    buttonleft:{
        height:'202px',
        width:'160px',
        'margin-left':'calc(50vw - 170px)'
    },
});


class FoodType extends Component{
    
    constructor(props){
        super(props)
    }
    render(){
        const { classes } = this.props;
        
        var handleNext =   this.props.handleNext;

        return(
            
            <div className={classes.root}>
                <ButtonBase variant="contained" className={classes.buttontop+" "+classes.buttonleft} onClick={() => handleNext(["5c45e20893ad54dfd50e5e93"])}> <img src={button1} className={classes.img}/> </ButtonBase>
                <ButtonBase variant="contained" className={classes.buttontop+" "+classes.buttonright} onClick={() => handleNext(["5c45e20893ad54dfd50e5e94"])}> <img src={button2} className={classes.img}/> </ButtonBase>   
                <ButtonBase variant="contained" className={classes.buttonbottom+" "+classes.buttonleft} onClick={() => handleNext(["5c45e20893ad54dfd50e5e95"])}> <img src={button3} className={classes.img}/> </ButtonBase>    
                <ButtonBase variant="contained" className={classes.buttonbottom+" "+classes.buttonright} onClick={() => handleNext(["5c45e20893ad54dfd50e5e96"])}> <img src={button4} className={classes.img}/> </ButtonBase>  
            </div>
        )
    }
}

FoodType.propTypes = {
    classes: PropTypes.object.isRequired,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(FoodType);
