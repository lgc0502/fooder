import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

// import geolocation from '../geolocation.js';
import Loading from '../../../../image/Spin-1s-63px.gif'
import DetailInfo from '../DetailInfo.js'

const GET_RESTAURANT = gql`
  query getRestaurantByPlaceId(
    $placeId: String!
    $userId:ID
  ) {
    getRestaurantByPlaceId(
      placeId: $placeId
      user: $userId
    ) {
      id
      name
      placeId
      phoneNumber
      reviews {
        authorName
        authorPhotoUrl
        relativeTime
        rating
        text
      }
      location {
        address
        coordinates
      }
      isOpenNow
      reviewCount
      openingHours
    }
  }
`

const DetailQuery = props => {
  const { tag, info, vehicle, position } = props
  const userId = localStorage.getItem('FooderUserID')
  const placeId = info['placeId']
  return (
    <Query
      query={GET_RESTAURANT}
      variables={{ placeId: placeId, userId }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <img src={Loading} alt={'Loading'} />
        }
        if (error) return '沒有符合的結果，請返回上一頁'
        return (
          //'loading'
          <DetailInfo
            tag={tag}
            info={info}
            detail={data['getRestaurantByPlaceId']}
            vehicle={vehicle}
          />
        )
      }}
    </Query>
  )
}

export default DetailQuery
