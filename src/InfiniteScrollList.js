import React, { Component } from "react";
import ListItem from './ListItem.js';
import ModifyUrl from './ModifyUrl.js';

class InfiniteScrollList extends Component {
  componentDidMount() {
    console.log("jo")
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    console.log("jo2")
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    console.log(scrollTop, scrollHeight, clientHeight)
    if (scrolledToBottom) {
        console.log("jo")
      this.props.onLoadMore();
    }
  };

  render() {
    if (!this.props.data && this.props.loading) return <p>Loading....</p>;
    const data = this.props.data['restaurants'] || [];
    return (
        data.map(d => {
            d['smallphotoUrls'] = ModifyUrl.ModifyUrl(d['photoUrls'])
            return(
                <ListItem 
                    key={data.indexOf(d)}
                    tag={this.props.tag} 
                    handleNext={this.props.handleNext} 
                    restaurantinfo={d}
                    restaurantInfo={this.props.restaurantInfo}
                /> 
            )
        })
    );
  }
}

export default InfiniteScrollList;