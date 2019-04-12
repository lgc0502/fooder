import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import InfiniteScrollList from './InfiniteScrollList.js'
import SortOptionBtn from '../SortOptionBtn.js'

const styles = theme => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 'calc(100vh - 106px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    alignItems: 'flex-start',
    marginBottom: '56px'
  },
  sortbtn:{
    width:'100%',
    height:'36px',
    backgroundColor:'#f5f5f5',
    color:'#b5b5b5'
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
        distance
        photoUrls
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
        distance
        photoUrls
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
        distance
        photoUrls
        location {
          coordinates
        }
      }
    }
  }
`
class RestaurantList extends Component {

  sort = (s) => {
    switch(s){
      case 0:
        return GET_RESTAURANT_DEFAULT
      case 1:
        return GET_RESTAURANT_PRICE
      case 2:
        return GET_RESTAURANT_DISTANCE
    }
  }
  render() {
    const {
      classes,
      tags: tagIds,
      position,
      handleNext,
      restaurantInfo,
      type,
      handleScrollRecord,
      scrollrecord,
      handleSortType,
      sortType,
      pricelevel
    } = this.props
    const lat = position[0]
    const lng = position[1]
    const userId = localStorage.getItem('FooderUserID')
    var priceLevel = pricelevel

    return (
      <div className={classes.list}>
        <SortOptionBtn 
          handleSortType={handleSortType}
          sortType={sortType}
          pricelevel={pricelevel}
        />
        <Query query={this.sort(sortType)} variables={{ tagIds, lat, lng, userId, priceLevel }}>
          {({ data, loading, error, fetchMore }) => {
            if (error) return <p>{'出現錯誤，請嘗試重新整理頁面'}</p>

            return (
              <InfiniteScrollList
                loading={loading}
                listdata={data['searchRestaurants']}
                handleNext={handleNext}
                restaurantInfo={restaurantInfo}
                tag={tagIds}
                sorttype={sortType}
                handleScrollRecord={handleScrollRecord}
                scrollrecord={scrollrecord}
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
                                ...prevResult['searchRestaurants'][
                                  'restaurants'
                                ],
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
}

export default withStyles(styles)(RestaurantList)
