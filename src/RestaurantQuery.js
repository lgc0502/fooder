import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import ListItem from './ListItem.js';
import ModifyUrl from './ModifyUrl.js';
import button1 from './image/image-5-01.jpg';

const GET_RESTAURANT = gql`
query searchRestaurants($tagIds: [ID!]!, $first:Int, $lat: Float!, $lng: Float!) {
    searchRestaurants(tagIds: $tagIds, first:$first, lat:$lat, lng:$lng){
        id,
        name,
        placeId,
        rating,
        priceLevel,
        phoneNumber,
        tags{
            id,
            text,
        },
        reviews{
            authorName,
            authorPhotoUrl,
            relativeTime,
            rating,
            text,
        },
        location{
            address,
        },
        photoUrls,
        isOpenNow,
        reviewCount,
        openingHours,
    }
}
`;

const List = (handleNext,restaurantDetail,info,tagIds) => (
    info.map(d => {
        d['smallphotoUrls'] = ModifyUrl.ModifyUrl(d['photoUrls'])
        return(
            <ListItem tag={tagIds} restaurantDetail={restaurantDetail} handleNext={handleNext} restaurantinfo={d} /> 
        )
    })
);

export default {

    SearchRestaurant:(handleNext,restaurantDetail,tagIds) =>{
        const first = 20
        const lat = 23.5
        const lng = 120.2
        console.log(tagIds);
        return (
            <Query query={GET_RESTAURANT} variables={{ tagIds, first, lat, lng }} >
                {({ loading, error, data }) => {
                    if (loading) {
                        return 'loading...'
                    }
                    if (error) return 'Error!: ${error}';
                    setTimeout(function(){ console.log(data); }, 10000);  
                    return (
                        List(handleNext,restaurantDetail,data['searchRestaurants'],tagIds)
                    );
                }}
            </Query>
        )
    }
}