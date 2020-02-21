import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import  { searchAdvertId } from '../Services/advertServices';


class Advert extends Component {

  constructor(props){
    super(props)
    this.state = { advert: {}}
  }

  searchAdvertId(_id) { 
    if(!_id) {
  
      this.setState( {advert: this.props.advert
       
    });
  }
    else {
      searchAdvertId(_id).then(advertJson => {
          var advert = {
            id: _id,
            name: advertJson.name,
            description: advertJson.description,
            price: advertJson.price,
            type: advertJson.type,
            photo: advertJson.photo,
            tags: advertJson.tags
          };
  
        this.setState({
          advert: advert
        })
      })
    }
  }

  componentWillMount() {    
    this.searchAdvertId(this.props.match.params.id)
}
  
  goToDetail = () => {
    this.props.history.push(`/advert/${this.state.advert._id}`);
  };
  
  render(){
    const { advert } = this.state;
    const divStyle = {
       width: '18rem'
    };

    const cardStyle = {
     margin: '1rem'
   };

    return(
      <React.Fragment>
        <div className="" style={cardStyle}>
          <div className="card" style={divStyle}>
            <img className="card-img-top" src={`http://localhost:3001/images/${advert.photo}`} alt="Not found"/>
            <div className="card-body">
              <h5 className="card-title">{advert.name}</h5>
              <p className="card-text">{advert.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{advert.price}</li>
              <li className="list-group-item">{advert.type}</li>
              <li className="list-group-item">{advert.tags}</li>
            </ul>
            {!this.state.advert.id?(
            <div className="card-body">
              <a href={`/advert/${this.state.advert._id}`} className="card-link">Details</a>
            </div>
            ):(<div></div>)}
            <div className="card-body">
              <a href={`/Update/${this.state.advert._id}`} className="card-link">UPDATE</a>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(Advert);