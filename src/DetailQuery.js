import React ,{ Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import geolocation from './geolocation.js';
import Loading from './image/loading.gif';
import DetailInfo from './DetailInfo.js';

const GET_RESTAURANT = gql`
query getRestaurantByPlaceId($placeId: String) {
    getRestaurantByPlaceId(placeId: $placeId){
        id,
        name,
        placeId,
        phoneNumber,
        reviews{
            authorName,
            authorPhotoUrl,
            relativeTime,
            rating,
            text,
        },
        location{
            address,
            lat,
            lng,
        },
        isOpenNow,
        reviewCount,
        openingHours,
    }
}
`;

class DetailQuery extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { classes } = this.props;
        var tag = this.props.tag;
        var info = this.props.info;
        var placeId = info['placeId'];
        return(
            <Query query={GET_RESTAURANT} variables={{ placeId }} >
                {({ loading, error, data }) => {
                    if (loading) {
                        return <img src={Loading} />
                    }
                    if (error) return '沒有符合的結果，請返回上一頁';
                    return (
                        //'loading'
                        <DetailInfo 
                            tag={tag} 
                            info = {info}
                            detail={data['getRestaurantByPlaceId']}
                        />
                    );
                }}
            </Query>
        );
    }
}
export default DetailQuery;