import React, { Component } from 'react';
import AdvertList from '../components/AdvertList';
import { findAdverts, searchAdvert } from '../Services/advertServices';


export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      adverts: []
    }

    this.findAdverts()
  }

  findAdverts = () => {
    findAdverts(this.props.location.search).then(adverts => {
      var i;
      var tempAdverts = [];
      for (i = 0; i < adverts.length -1; i++) {
        tempAdverts[i] = {label: adverts[i], value: i}
      }

      this.setState({
        adverts
      })
    });
  }

  onChangeText = (query) => {
    if (query && query.trim().length){
      searchAdvert(query).then(adverts => this.setState({adverts}));
    }else{
      this.findAdverts()
    }
  }

  render(){
    const { adverts } = this.state

    return (
      <>
        <AdvertList adverts={adverts} />
      </>
    );
  }
}

