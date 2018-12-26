import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import KeyboardbackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ButtonBase from '@material-ui/core/ButtonBase';

class Appbar extends Component{
    
    constructor(props){
        super(props)
    }
    
    render(){

        var handleBack = this.props.handleBack;

        return(
            <div >
                <AppBar position="relative" className="appbar" style={{
                        text:this.props.text, 
                        backgroundColor:'#FFC107', 
                        height:'48px'}}>
                    <Toolbar>
                        <Grid container spacing={24}>
                            <Grid item xs={2} >
                                {
                                    this.props.firstpage === 0?(""):
                                    (<ButtonBase variant="contained" onClick={() => handleBack()}>
                                        <KeyboardbackspaceIcon style={{color:'#263238'}} />
                                    </ButtonBase>)
                                }
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="subtitle2" color='#263238' className="title" >
                                    {this.props.text}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Appbar