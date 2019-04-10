import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import InfiniteScrollMap from './InfiniteScrollMap.js'
// import moment from "moment";

const styles = theme => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 'calc(100vh - 156px)',
    overflowX: 'hidden',
    overflowY: 'hidden',
    alignItems: 'flex-end',
    marginBottom: '56px'
  },
  sortbtn:{
    width:'100%',
    height:'40px',
    //marginTop:'6px',
    marginBottom:'5px',
    backgroundColor:'#f5f5f5'
  }
})

const GET_RESTAURANT = gql`
  query searchRestaurants(
    $tagIds: [ID!]!
    $lat: Float!
    $lng: Float!
    $userId:ID
    $cursor: String
  ) {
    searchRestaurants(
      tagIds: $tagIds
      lat: $lat
      lng: $lng
      user: $userId
      pageSize: 20
      after: $cursor
    ) {
      hasMore
      cursor
      restaurants {
        id
        name
        placeId
        rating
        priceLevel
        tags {
          id
          text
        }
        location {
          coordinates
        }
        distance
        photoUrls
      }
    }
  }
`

const RestaurantMap = props => {
  
  const { 
    classes, 
    tags: tagIds, 
    position, 
    handleNext, 
    restaurantInfo,
    handleScrollRecord, 
    scrollrecord, 
  } = props
  const lat = position[0]
  const lng = position[1]
  const userId = localStorage.getItem('FooderUserID')
  return (
    <div>
      <BottomNavigation
        showLabels
        className={classes.sortbtn}
      >
        <BottomNavigationAction label="熱門程度" style={{fontWeight: '700'}}/> 
        <nobr style={{paddingTop: '8px'}}>|</nobr>
        <BottomNavigationAction label="價格範圍" style={{fontWeight: '700'}}/> 
        <nobr style={{paddingTop: '8px'}}>|</nobr>
        <BottomNavigationAction label="距離範圍" style={{fontWeight: '700'}}/>
      </BottomNavigation>
      <Query query={GET_RESTAURANT} variables={{ tagIds, lat, lng, userId }}>
        {({ data, loading, error, fetchMore }) => {
          return (
            <InfiniteScrollMap
              loading={loading}
              listdata={data['searchRestaurants']}
              handleNext={handleNext}
              restaurantInfo={restaurantInfo}
              tag={tagIds}
              handleScrollRecord={handleScrollRecord}
              scrollrecord={scrollrecord}
              position={position}
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    tagIds,
                    lat,
                    lng,
                    cursor: data['searchRestaurants']['cursor']
                  },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    const newData =
                      fetchMoreResult['searchRestaurants']['restaurants']
                    const cursor =
                      fetchMoreResult['searchRestaurants']['cursor']
                    const hasMore =
                      fetchMoreResult['searchRestaurants']['hasMore']
                    return newData.length
                      ? {
                          searchRestaurants: {
                            __typename:
                              prevResult['searchRestaurants']['__typename'],
                            cursor,
                            hasMore,
                            restaurants: [
                              ...prevResult['searchRestaurants']['restaurants'],
                              ...fetchMoreResult['searchRestaurants']['restaurants']
                            ]
                          }
                        }
                      : prevResult
                  }
                })
              }
            />
          )
        }}
      </Query>
    </div>
  )
}

export default withStyles(styles)(RestaurantMap)
