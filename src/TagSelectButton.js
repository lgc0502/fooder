import React ,{ Component } from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Add from '@material-ui/icons/Add';
import Done from '@material-ui/icons/Done';

import Appbar from './App_Bar.js';

const styles = theme => ({
    chips: {
        display: 'flex',
        //justifyContent: 'center',
        flexWrap: 'wrap',
        height:'calc(100% - 208px)',
        overflow:'auto',
        padding: theme.spacing.unit / 2,
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
          { key: 0, label: '台式風味', choose: 0, id: "5c222d594bdbfc29bb7d47b6"},  
          { key: 1, label: '歐式美式',  choose: 0, id: "5c222d594bdbfc29bb7d47b5" },
          { key: 2, label: '  日式  ', choose: 0, id: "5c222d594bdbfc29bb7d47b4" },
          { key: 3, label: ' 來點湯 ',  choose: 0, id: "5c222d594bdbfc29bb7d47b8" },
          { key: 4, label: '  點心  ',   choose: 0, id: "5c222d594bdbfc29bb7d47bc" },
          { key: 5, label: '  小吃  ',  choose: 0, id: "5c222d594bdbfc29bb7d47bd" },
          { key: 6, label: ' 下午茶 ', choose: 0, id: "5c222d594bdbfc29bb7d47c0" },
          { key: 7, label: ' 早午餐 ',  choose: 0, id: "5c222d594bdbfc29bb7d47bf" },
          { key: 8, label: '小編推薦', choose: 0, id: "5c222d594bdbfc29bb7d47d6"},
          { key: 9, label: '氣氛悠閒', choose: 0, id: "5c222d594bdbfc29bb7d47cc" },
          { key: 10, label: '相機先吃',  choose: 0, id: "5c222d594bdbfc29bb7d47c6" },
          { key: 11, label: '  久坐  ', choose: 0, id: "5c222d594bdbfc29bb7d47ca" },
          { key: 12, label: ' 吃粗飽 ',   choose: 0,  id: "5c222d594bdbfc29bb7d47d2"},
          { key: 13, label: '氣氛歡樂',   choose: 0, id: "5c222d594bdbfc29bb7d47cd" },
          /*{ key: 0, label: '酒精萬歲', choose: 0, id: "5c1f65d58718d83916cb219b" },
          { key: 1, label: '相機先吃',  choose: 0, id: "5c1f65d58718d83916cb219c" },
          { key: 2, label: '犒賞自己', choose: 0, id: "5c1f65d58718d83916cb219d" },
          { key: 3, label: '  娛樂  ',   choose: 0, id: "5c1f65d58718d83916cb219e" },
          { key: 4, label: '  寵物  ',  choose: 0, id: "5c1f65d58718d83916cb219f" },
          { key: 5, label: '久坐', choose: 0, id: "5c1f65d58718d83916cb21a0" },
          { key: 6, label: '插座',  choose: 0, id: "5c1f65d58718d83916cb21a1" },
          { key: 7, label: '氣氛悠閒', choose: 0, id: "5c1f65d58718d83916cb21a2" },
          { key: 8, label: '氣氛歡樂',   choose: 0, id: "5c1f65d58718d83916cb21a3" },
          { key: 9, label: '優惠',  choose: 0, id: "5c1f65d58718d83916cb21a4" },
          { key: 10, label: '趕時間', choose: 0, id: "5c1f65d58718d83916cb21a5" },
          { key: 11, label: '蔬菜多多',  choose: 0, id: "5c1f65d58718d83916cb21a6" },
          { key: 12, label: '健身減脂', choose: 0, id: "5c1f65d58718d83916cb21a7" },
          { key: 13, label: '吃粗飽',   choose: 0,  id: "5c1f65d58718d83916cb21a8"},
          { key: 14, label: '外送',  choose: 0, id: "5c1f65d58718d83916cb21a9"},
          { key: 15, label: '預約外帶', choose: 0, id: "5c1f65d58718d83916cb21aa"},
          { key: 16, label: '約會',  choose: 0  , id: "5c1f65d58718d83916cb21ab"},
          { key: 17, label: '小編推薦', choose: 0, id: "5c1f65d58718d83916cb21ac"},
          { key: 18, label: '東南亞',   choose: 0, id: "5c1f65d58718d83916cb2188"},
          { key: 19, label: '韓式',  choose: 0, id: "5c1f65d58718d83916cb2189" },
          { key: 20, label: '日式', choose: 0, id: "5c1f65d58718d83916cb218a" },
          { key: 21, label: '歐式美式',  choose: 0, id: "5c1f65d58718d83916cb218b" },
          { key: 22, label: '台式風味', choose: 0, id: "5c1f65d58718d83916cb218c"},
          { key: 23, label: '海鮮',   choose: 0, id: "5c1f65d58718d83916cb218d" },
          { key: 24, label: '來點湯',  choose: 0, id: "5c1f65d58718d83916cb218e" },
          { key: 25, label: '素食', choose: 0, id: "5c1f65d58718d83916cb218f" },
          { key: 26, label: '速食',  choose: 0, id: "5c1f65d58718d83916cb2190" },
          { key: 27, label: '吃到飽', choose: 0, id: "5c1f65d58718d83916cb2191" },
          { key: 28, label: '點心',   choose: 0, id: "5c1f65d58718d83916cb2192" },
          { key: 29, label: '小吃',  choose: 0, id: "5c1f65d58718d83916cb2193" },
          { key: 30, label: '早餐', choose: 0, id: "5c1f65d58718d83916cb2194" },
          { key: 31, label: '早午餐',  choose: 0, id: "5c1f65d58718d83916cb2195" },
          { key: 32, label: '下午茶', choose: 0, id: "5c1f65d58718d83916cb2196" },
          { key: 33, label: '午餐',   choose: 0, id: "5c1f65d58718d83916cb2197" },
          { key: 34, label: '晚餐',  choose: 0, id: "5c1f65d58718d83916cb2198" },
          { key: 35, label: '宵夜', choose: 0, id: "5c1f65d58718d83916cb2199" },
          { key: 36, label: '飲料',  choose: 0, id: "5c1f65d58718d83916cb219a" },*/
        ],
        Selected:[],
    };

    handleClick = data => () => {
        this.setState(state => {
            const Data = {
                Tags:[...state.Tags],
            }
            Data.Tags[data.key].choose = Data.Tags[data.key].choose==1?0:1;
            if(Data.Tags[data.key].choose == 1){
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
            <div className={classes.chips} theme={theme}>
                {this.state.Tags.map(data => {
                    return (
                        
                        <Chip
                            className={classes.chip}
                            key={data.key}
                            icon={<Add className={classes.chipaddicon}/>}
                            label={data.label}
                            onClick={this.handleClick(data)}
                            color={data.choose==0?"primary":"secondary"}
                        />
                    );
                  })}
            </div>
            <Button className={classes.button} 
                variant="contained" 
                style={{backgroundColor:'#FFC107'}} 
                onClick={() => handleNext(this.state.Selected)}>
                <Typography variant="subtitle2" color='#263238' >
                    搜尋
                </Typography>
            </Button>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles, { withTheme: true })(TagSelectButton);
