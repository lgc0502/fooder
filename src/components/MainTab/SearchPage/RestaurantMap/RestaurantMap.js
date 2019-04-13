import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import InfiniteScrollMap from './InfiniteScrollMap.js'
import SortOptionBtn from '../SortOptionBtn.js'

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
    marginBottom:'5px',
    backgroundColor:'#f5f5f5'
  }
})

const GET_RESTAURANT_DEFAULT = gql`
  query searchRestaurants(
    $tagIds: [ID!]!
    $lat: Float!
    $lng: Float!
    $userId:ID
    $priceLevel: Int
    $cursor: String
  ) {
    searchRestaurants(
      tagIds: $tagIds
      lat: $lat
      lng: $lng
      user: $userId
      priceLevel: $priceLevel
      orderBy: default
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
      }
    }
  }
`
const GET_RESTAURANT_DISTANCE = gql`
  query searchRestaurants(
    $tagIds: [ID!]!
    $lat: Float!
    $lng: Float!
    $userId:ID
    $priceLevel: Int
    $cursor: String
  ) {
    searchRestaurants(
      tagIds: $tagIds
      lat: $lat
      lng: $lng
      user: $userId
      priceLevel: $priceLevel
      orderBy: distance
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
      }
    }
  }
`
const GET_RESTAURANT_PRICE = gql`
  query searchRestaurants(
    $tagIds: [ID!]!
    $lat: Float!
    $lng: Float!
    $userId:ID
    $priceLevel: Int
    $cursor: String
  ) {
    searchRestaurants(
      tagIds: $tagIds
      lat: $lat
      lng: $lng
      user: $userId
      priceLevel: $priceLevel
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
    handleSortType,
    sortType,
    pricelevel, 
  } = props
  const sort = (s) => {
    switch(s){
      case 0:
        return GET_RESTAURANT_DEFAULT
      case 1:
        return GET_RESTAURANT_PRICE
      case 2:
        return GET_RESTAURANT_DISTANCE
    }
  }
  const lat = position[0]
  const lng = position[1]
  const userId = localStorage.getItem('FooderUserID')
  var priceLevel = pricelevel

  return (
    <div>
      <SortOptionBtn 
        handleSortType={handleSortType}
        sortType={sortType}
        pricelevel={pricelevel}
      />
      <Query query={sort(sortType)} variables={{ tagIds, lat, lng, userId, priceLevel }}>
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
              sortType={sortType}
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
                              ...fetchMoreResult['searchRestaurants'][
                                'restaurants'
                              ]
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

