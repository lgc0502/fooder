import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Add from '@material-ui/icons/Add';

const styles = theme => ({
    root:{
        height:'calc(100vh - 116px)',
        overflow:'auto',
        padding: theme.spacing.unit / 2,
    },
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height:'calc(100vh - 208px)',
        'padding-top': '20px',
      },
    chip: {
        justifyContent: 'center',
        margin:'0 10px 0 10px', 
        padding:'20px 5px 20px 5px',
        width:'114px'
    },
    chipaddicon:{
        height:'15px'
    },
    button:{
        padding:'0px 40px 0px 40px',
        margin:'10px'
    }
});
const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#FFF350',
        main: '#FFF350' }, // Purple and green play nicely together.
      secondary: { main: '#FFC107' }, // This is just green.A700 as hex.
    },
  });

class TagSelectButton extends Component{
    
    constructor(props){
        super(props)
    }
   
    state = { 
        Tags: [
          { key: 0, label: ' 早午餐 ',  choose: 0, id: "5c45e20893ad54dfd50e5ea4" },
          { key: 1, label: ' 下午茶 ', choose: 0, id: "5c45e20893ad54dfd50e5ea5" },
          { key: 2, label: '午餐',   choose: 0, id: "5c45e20893ad54dfd50e5ea6" },
          { key: 3, label: '晚餐',  choose: 0, id: "5c45e20893ad54dfd50e5ea7" },
          { key: 4, label: '宵夜', choose: 0, id: "5c45e20893ad54dfd50e5ea8" },
          { key: 5, label: ' 來點湯 ',  choose: 0, id: "5c45e20893ad54dfd50e5e9d" },
          { key: 6, label: '  點心  ',   choose: 0, id: "5c45e20893ad54dfd50e5ea1" },
          { key: 7, label: '  小吃  ',  choose: 0, id: "5c45e20893ad54dfd50e5ea2" },
          { key: 8, label: '小編推薦', choose: 0, id: "5c45e20893ad54dfd50e5ebb"},
          { key: 9, label: '氣氛悠閒', choose: 0, id: "5c45e20893ad54dfd50e5eb1" },
          { key: 10, label: '相機先吃',  choose: 0, id: "5c45e20893ad54dfd50e5eab" },
          { key: 11, label: '  久坐  ', choose: 0, id: "5c45e20893ad54dfd50e5eaf" },
          { key: 12, label: ' 吃粗飽 ',   choose: 0,  id: "5c45e20893ad54dfd50e5eb7"},
          { key: 13, label: '氣氛歡樂',   choose: 0, id: "5c45e20893ad54dfd50e5eb2" },
        ],

        Selected:[],
    };

    handleClick = data => () => {
        this.setState(state => {
            const Data = {
                Tags:[...state.Tags],
            }
            Data.Tags[data.key].choose = Data.Tags[data.key].choose===1?0:1;
            if(Data.Tags[data.key].choose === 1){
                state.Selected.push(data.id);
            }
            else{
                const chipToDelete = state.Selected.indexOf(data.id);
                state.Selected.splice(chipToDelete, 1);
            }
            return {Data};
        });
        
    }

    render(){
        const { classes } = this.props;
        var handleNext =   this.props.handleNext;
        return(
            <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <div className={classes.chips}>
                    {this.state.Tags.map(data => {
                        return (
                            
                            <Chip
                                className={classes.chip}
                                key={data.key}
                                icon={<Add className={classes.chipaddicon}/>}
                                label={data.label}
                                onClick={this.handleClick(data)}
                                color={data.choose===0?"primary":"secondary"}
                            />
                        );
                    })}
                </div>
                  <Button className={classes.button} 
                    variant="contained" 
                    style={{backgroundColor:'#FFC107', marginBottom:'56px'}} 
                    onClick={() => handleNext(this.state.Selected)}>
                    <Typography variant="subtitle2" color='#263238' >
                        搜尋
                    </Typography>
                  </Button>
            </div>
            
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles, { withTheme: true })(TagSelectButton);
