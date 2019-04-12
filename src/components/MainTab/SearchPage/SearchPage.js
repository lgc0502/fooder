import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import FoodType from './FoodType/FoodType.js'
import TagSelectButton from './TagSelectButton/TagSelectButton.js'
import RestaurantSearch from './RestaurantSearch/RestaurantSearch.js'
import RestaurantMap from './RestaurantMap/RestaurantMap.js'
import RestaurantDetail from './RestaurantDetail/RestaurantDetail.js'
import Appbar from './AppBar/AppBar.js'
import geolocation from './Common/geolocation.js'
import QueryUserId from './QueryUserId.js'
// import ListCard from './ListCard.js'

const GET_USERID = gql`
    {
      appEntry{
        id
      }
    }
`
const styles = theme => ({
  appbar: {
    top: 0,
    position: 'fixed'
  },
  content: {
    width: '100vw'
  }
})

class SearchPages extends React.Component {
  state = {
    step: 0,
    listmode: 0,
    Tags: [],
    Info: {},
    lat: 23.000403,
    lng: 120.21954,
    scrollrecord: 0,
    sortType: 0,
    pricelevel: 0
  }
  componentDidMount() {
    geolocation.getLocation().then(d =>
      this.setState({
        lat: d.coords.latitude,
        lng: d.coords.longitude
      })
    )
    
  }
  handleNext = appendtag => {
    this.setState(state => ({
      step: state.step + 1,
      Tags: [...state.Tags, ...appendtag]
    }))
  }

  handleBack = () => {
    this.setState({ step: this.state.step - 1 })
    switch (this.state.step) {
      case 1:
        this.setState({ Tags: [] })
        break
      case 2:
        this.setState({
          Tags: this.state.Tags.slice(0, 1)
        })
        break
      default:
    }
  }
  handleMode = () => {
    if (this.state.listmode === 0) {
      this.setState({ listmode: 1 })
    } else {
      this.setState({ listmode: 0 })
    }
  }
  handleScrollRecord = scrollitem => {
    this.setState({
      scrollrecord: scrollitem
    })
  }
  handleSortType = (s,p) => {
    this.setState({
      sortType: s,
      pricelevel: p
    })
  }
  restaurantInfo = d => {
    this.setState({ Info: d })
  }
  getSearchStepContent(step, mode) {
    const { classes } = this.props
    const handleNext = this.handleNext
    const handleScrollRecord = this.handleScrollRecord
    const handleSortType = this.handleSortType
    switch (step) {
      case 0:
        return <FoodType className={classes.content} handleNext={handleNext} />
      case 1:
        return (
          <TagSelectButton
            className={classes.content}
            handleNext={handleNext}
          />
        )
      case 2:
        return mode === 0 ? (
          <RestaurantSearch
            className={classes.content}
            tags={this.state.Tags}
            restaurantInfo={this.restaurantInfo}
            handleNext={handleNext}
            position={[this.state.lat, this.state.lng]}
            handleScrollRecord={handleScrollRecord}
            scrollrecord={this.state.scrollrecord}
            handleSortType={handleSortType}
            sortType={this.state.sortType}
            pricelevel={this.state.pricelevel}
          />
        ) : (
          <RestaurantMap
            className={classes.content}
            tags={this.state.Tags}
            restaurantInfo={this.restaurantInfo}
            handleNext={handleNext}
            position={[this.state.lat, this.state.lng]}
            handleScrollRecord={handleScrollRecord}
            scrollrecord={this.state.scrollrecord}
            handleSortType={handleSortType}
            sortType={this.state.sortType}
            pricelevel={this.state.pricelevel}
          />
        )

      case 3:
        return (
          <RestaurantDetail
            className={classes.content}
            tags={this.state.Tags}
            info={this.state.Info}
          />
        )
      default:
    }
  }

  render() {
    const { classes } = this.props
    const handleBack = this.handleBack
    const handleMode = this.handleMode
    return (
      <div>
        <QueryUserId />
        <Appbar
          className={classes.appbar}
          firstpage={this.state.step}
          text={this.state.step === 3 ? this.state.Info.name : this.state.step}
          mode={this.state.listmode}
          handleBack={handleBack.bind(this)}
          handleMode={handleMode.bind(this)}
        />
        
        {this.getSearchStepContent(this.state.step, this.state.listmode)}
      </div>
    )
  }
}
export default withStyles(styles)(SearchPages)
