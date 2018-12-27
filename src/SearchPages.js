import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import FoodType from './FoodType.js';
import TagSelectButton from './TagSelectButton.js';
import RestaurantLists from './RestaurantLists.js';
import RestaurantDetail from './RestaurantDetail.js';
import Appbar from './App_Bar.js'

const styles = theme => ({
  appbar:{
    top:0,
    position:'fixed',

  },
  content:{
    width:'100vw'
  }
});

class SearchPages extends React.Component {
  state = {
    step: 0,
    Tags:[],
    restaurant:{},
  };

  handleNext = (appendtag) => {
    this.setState(state => ({
      step: state.step + 1,
      Tags: [...state.Tags,...appendtag],
    }));
  };

  handleBack = () => {
    this.setState({step: this.state.step - 1});
    switch(this.state.step){
      case 1:
        this.setState({Tags:[]});
        break;
      case 2:
        this.setState({
          Tags: this.state.Tags.slice(0,1)
        });
        break;
    }
  };
  restaurantDetail=(info) =>{
    this.setState({restaurant: info});
  }
  getSearchStepContent(step) {
    const { classes } = this.props;
    var handleNext =   this.handleNext;
    var restaurantDetail = this.restaurantDetail;
    switch (step) {
      case 0: 
        return <FoodType className={classes.content} handleNext = {handleNext.bind(this)} />;
      case 1:
        return <TagSelectButton className={classes.content} handleNext = {handleNext.bind(this)} />;
      case 2:
        return <RestaurantLists className={classes.content} tags={this.state.Tags} restaurantDetail={restaurantDetail.bind(this)} handleNext = {handleNext.bind(this)}/>;
      case 3:
        return <RestaurantDetail className={classes.content} tags={this.state.Tags} detail={this.state.restaurant}/>;
    }
  }
  getAppBarContent(step) {
    switch (step) {
      case 0: 
        return "搜尋";
      case 1:
        return "偏好選擇";
      case 2:
        return "搜尋";
      case 3:
        return "店家";
    }
  }
  
  render() {
    const { classes } = this.props;
    var handleBack = this.handleBack;
    return (
      <div>
        <Appbar 
            className={classes.appbar} 
            firstpage={this.state.step} 
            text={this.getAppBarContent(this.state.step)} 
            handleBack = {handleBack.bind(this)}/>
          {this.getSearchStepContent(this.state.step)}
      </div>
    );
  }
}
export default withStyles(styles)(SearchPages);

