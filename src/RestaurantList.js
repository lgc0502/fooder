import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InfiniteScrollList from "./InfiniteScrollList.js";
import moment from "moment";
const styles = theme => ({
    list:{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height:'calc(100vh - 106px)',
        'overflow-x':'hidden',
        'overflow-y':'auto',
        alignItems:'center',
        'margin-bottom':'56px'
    }
});

const GET_RESTAURANT = gql`
query searchRestaurants($tagIds: [ID!]!, $lat: Float!, $lng: Float!, $cursor: String) {
    searchRestaurants(tagIds: $tagIds, lat:$lat, lng:$lng, pageSize: 20, after: $cursor){
        hasMore,
        cursor,
        restaurants{
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
}
`;

class RestaurantList extends Component {
  SortType = (type)=>{
    switch(type){
      case 0:
        return GET_RESTAURANT;
      case 1:
        return GET_RESTAURANT;
      case 2:
        return GET_RESTAURANT;
      default:
        return GET_RESTAURANT;
      
    }
  }
  render() {
    const { classes } = this.props;
    var tagIds = this.props.tags;
    const lat = this.props.position[0];
    const lng = this.props.position[1];
    var handleNext =   this.props.handleNext;
    var restaurantInfo = this.props.restaurantInfo;
    var type = this.props.type;

    return (
      <div className={classes.list}>
        <Query
          query={this.SortType(type)}
          variables={{tagIds, lat, lng }}
        >
          {({ data, loading, error, fetchMore }) => {
            if (error) return <p>{'出現錯誤，請嘗試重新整理頁面'}</p>;
            return (
              <InfiniteScrollList
                loading={loading}
                listdata={data['searchRestaurants']}
                handleNext = {handleNext}
                restaurantInfo = {restaurantInfo}
                tag = {tagIds}
                onLoadMore={() =>
                  fetchMore({
                    variables: {
                      tagIds, 
                      lat, 
                      lng, 
                      cursor: data['searchRestaurants']['cursor']
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      const newData = fetchMoreResult['searchRestaurants']['restaurants'];
                      const cursor = fetchMoreResult['searchRestaurants']['cursor'];
                      const hasMore = fetchMoreResult['searchRestaurants']['hasMore'];
                      return newData.length
                        ? {
                            searchRestaurants: {
                              __typename: prevResult['searchRestaurants']['__typename'],
                              cursor,
                              hasMore,
                              
                              restaurants : [...prevResult['searchRestaurants']['restaurants'], ...fetchMoreResult['searchRestaurants']['restaurants']],
                            }
                          }
                        : prevResult;
                    }
                  })
                }
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(RestaurantList);