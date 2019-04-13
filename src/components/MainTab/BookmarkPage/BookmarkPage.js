import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import BottomNavigation from '@material-ui/core/BottomNavigation'
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import RestaurantDetail from './RestaurantDetail'
import RestaurantList from './RestaurantList.js'
import Appbar from '../SearchPage/AppBar/AppBar.js'
import geolocation from '../SearchPage/Common/geolocation.js'
// import moment from 'moment'
const styles = theme => ({
  content: {
    width: '100vw'
  }
})

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FF0000',
      main: '#FF0000'
    },
    secondary: { main: '#FF0000' }
  }
})

class RestaurantSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 4,
      Info: {},
      lat: 23.000403,
      lng: 120.21954,
    }
  }
  componentDidMount() {
    geolocation.getLocation().then(d =>
      this.setState({
        lat: d.coords.latitude,
        lng: d.coords.longitude
      })
    )
  }
  handleNext = () => {
    this.setState({ step: this.state.step + 1 })
  }
  handleBack = () => {
    this.setState({ step: this.state.step - 1 })
  }
  handleRestaurant = d => {
    this.setState({ Info: d })
  }
  getStepContent = step => {
    const { classes, vehicle } = this.props
    const handleNext = this.handleNext
    switch (step) {
      case 4:
        return (
          <MuiThemeProvider theme={theme}>
            <RestaurantList
              className={classes.content}
              handleNext={this.handleNext}
              vehicle={vehicle}
              position={[this.state.lat, this.state.lng]}
              handleRestaurant={this.handleRestaurant}
            />
          </MuiThemeProvider>
        )
      case 5:
        return (
          <RestaurantDetail
            className={classes.content}
            tags={this.state.Info.tags}
            vehicle={vehicle}
            position={[this.state.lat, this.state.lng]}
            info={this.state.Info}
          />
        )
      default:
    }
  }
  render() {
    const {
      classes,
    } = this.props
    // const { value } = this.state
    return (
      <div>
        <Appbar
          className={classes.appbar}
          firstpage={this.state.step === 4 ? 0 : this.state.step}
          text={this.state.step === 5 ? this.state.Info.name : this.state.step}
          mode={this.state.listmode}
          handleBack={this.handleBack}
        />
        {this.getStepContent(this.state.step)}
      </div>
    )
  }
}

export default withStyles(styles)(RestaurantSearch)

/*
<BottomNavigation value={value} onChange={this.handleChange} showLabels style={{height:'40px', alignItems:'center'}}>
                        <BottomNavigationAction label="熱門程度" /><div style={{'color':'#CFCFCF'}}>|</div>
                        <BottomNavigationAction label="距離排序" /><div style={{'color':'#CFCFCF'}}>|</div>
                        <BottomNavigationAction label="價格範圍↕" />
                    </BottomNavigation>
*/
