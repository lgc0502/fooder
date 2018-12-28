import React ,{ Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import ListItem from './ListItem.js';
import ModifyUrl from './ModifyUrl.js';
import button1 from './image/image-5-01.jpg';
import geolocation from './geolocation.js';
import Loading from './image/loading.gif';

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
        distance,
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



class SearchRestaurant extends Component{
    constructor(props){
        super(props)
    }
    state={
        lat: 23.000403,
        lng: 120.219540,
    }
    componentDidMount() {
        geolocation.getLocation().then(d => this.setState({
          lat: d.coords.latitude,
          lng: d.coords.longitude
        }))
      }
    render(){
        const { classes } = this.props;
        var handleNext =   this.props.handleNext;
        var restaurantDetail =   this.props.restaurantDetail;
        var tagIds = this.props.tag;
        const lat = this.state.lat;
        const lng = this.state.lng;
        const first = 20;
        return(
            <Query query={GET_RESTAURANT} variables={{ tagIds, first, lat, lng }} >
                {({ loading, error, data }) => {
                    if (loading) {
                        return <img src={Loading} />
                    }
                    //if (error) return 'Error!: ${error}';
                    return (
                        //'loading'
                        List(handleNext,restaurantDetail,data['searchRestaurants'],tagIds)
                    );
                }}
            </Query>
        );
    }
}
export default SearchRestaurant;