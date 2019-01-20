import React ,{ Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import ListItem from './ListItem.js';
import ModifyUrl from './ModifyUrl.js';

import Loading from './image/loading.gif';

const GET_RESTAURANT = gql`
query searchRestaurants($tagIds: [ID!]!, $lat: Float!, $lng: Float!, $cursor: String) {
    searchRestaurants(tagIds: $tagIds, lat:$lat, lng:$lng, pageSize: 10, after: $cursor){
        id,
        name,
        placeId,
        rating,
        priceLevel,
        tags{
            id,
            text,
        },
        distance,
        photoUrls, 
    }
}
`;

export default {
    
    query:(tagIds, lat, lng, setdata)=>{
        //var tagIds = this.props.tag;
        //const lat = this.props.position[0];
        //const lng = this.props.position[1];
        const first = 20;
        //const data = [];
        const data = ({}) => (
            <Query query={GET_RESTAURANT} variables={{ tagIds, lat, lng }} >
                {({ loading, error, data, fetchMore}) => {
                    if (loading) {
                        return <img src={Loading} />
                    }
                    if (error) return '沒有符合的結果，請返回上一頁';
                    return (
                        console.log(data['searchRestaurants']),
                        data['searchRestaurants']
                    )
                }}
            </Query>
        );
        /*<Query query={GET_RESTAURANT} variables={{ tagIds, first, lat, lng }} >
            {({ loading, error, data }) => {
                if (loading) {
                    return <img src={Loading} />
                }
                if (error) return '沒有符合的結果，請返回上一頁';
                data = data['searchRestaurants']
            }}
        </Query>*/
        //return data
    }
    
}



/*import React ,{ Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import ListItem from './ListItem.js';
import ModifyUrl from './ModifyUrl.js';

import Loading from './image/loading.gif';

const GET_RESTAURANT = gql`
query searchRestaurants($tagIds: [ID!]!, $first:Int, $lat: Float!, $lng: Float!) {
    searchRestaurants(tagIds: $tagIds, first:$first, lat:$lat, lng:$lng){
        id,
        name,
        placeId,
        rating,
        priceLevel,
        tags{
            id,
            text,
        },
        distance,
        photoUrls, 
    }
}
`;

const List = (handleNext,info,tagIds,restaurantInfo) => (
    info.map(d => {
        d['smallphotoUrls'] = ModifyUrl.ModifyUrl(d['photoUrls'])
        return(
            <ListItem 
                key={info.indexOf(d)}
                tag={tagIds} 
                handleNext={handleNext} 
                restaurantinfo={d} 
                restaurantInfo={restaurantInfo}
            /> 
        )
    })
);
const data = [];
class ListQuery extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const { classes } = this.props;
        var handleNext =   this.props.handleNext;
        var restaurantInfo = this.props.restaurantInfo;
        var tagIds = this.props.tag;
        const lat = this.props.position[0];
        const lng = this.props.position[1];
        const first = 20;
        return(
            <Query query={GET_RESTAURANT} variables={{ tagIds, first, lat, lng }} >
                {({ loading, error, data }) => {
                    if (loading) {
                        return <img src={Loading} />
                    }
                    if (error) return '沒有符合的結果，請返回上一頁';
                    data = data['searchRestaurants']
                    return (
                        <div />
                    );
                }}
            </Query>
        );
    }
}
export default ListQuery;*/