import React, { Component } from 'react';
import Advert from './Advert';
import { findAdverts, searchAdvert } from '../Services/advertServices';
import Pagination from './Pagination';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      adverts: [],
      currentAdverts: [],
      currentPage: null,
      totalPages: null
    }
    
  }

  componentDidMount() {
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

  onPageChanged = data => {
    const { adverts } = this.state;
    const {currentPage, totalPages, pageLimit} = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentAdverts = adverts.slice(offset, offset + pageLimit);

    this.setState({ currentPage: currentPage, currentAdverts: currentAdverts, totalPages: totalPages });
  }

  onChangeText = (query) => {
    if (query && query.trim().length){
      searchAdvert(query).then(adverts => this.setState({adverts}));
    }else{
      this.findAdverts()
    }
  }

  render() {

    const { adverts, currentAdverts} = this.state;
    const totalAdverts = adverts.length;

    
    if (totalAdverts === 0) return null;

    return (
      <div className="container mb-5">
        <div className="center d-flex flex-wrap py-5"></div>
        <div className="row d-flex flex-row py-5">
        { currentAdverts.map(ad => <Advert advert={ad} />) }
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalAdverts} pageLimit={6} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

