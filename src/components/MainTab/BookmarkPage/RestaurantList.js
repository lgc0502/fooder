import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import InfiniteScrollList from './InfiniteScrollList.js'
// import moment from 'moment'
const styles = theme => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 'calc(100vh - 106px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    alignItems: 'center',
    marginBottom: '56px'
  }
})

const GET_RESTAURANT = gql`
query getRestaurantsByPlaceId(
    $placeIds: [String]!
  ){
  getRestaurantsByPlaceId(
    placeIds: $placeIds
  ) {
    id
    name
    placeId
    rating
    priceLevel
    tags {
      id
      text
    }
    distance
    photoUrls
  }
}
`

class RestaurantList extends Component {
  SortType = type => {
    switch (type) {
      case 0:
        return GET_RESTAURANT
      case 1:
        return GET_RESTAURANT
      case 2:
        return GET_RESTAURANT
      default:
        return GET_RESTAURANT
    }
  }
  render() {
    const {
      classes,
      handleNext,
      handleRestaurant,
      type,
    } = this.props

    const placeIds = localStorage.getItem('id').split(' ')
    return (
      <div className={classes.list}>
        <Query query={this.SortType(type)} variables={{ placeIds }}>
          {({ data, loading, error, fetchMore }) => {
            if (error) return <p>{'出現錯誤，請嘗試重新整理頁面'}</p>
            return (
              <InfiniteScrollList
                loading={loading}
                listdata={data.getRestaurantsByPlaceId}
                handleNext={handleNext}
                handleRestaurant={handleRestaurant}
              />
            )
          }}
        </Query>
      </div>
    )
  }
}

export default withStyles(styles)(RestaurantList)
