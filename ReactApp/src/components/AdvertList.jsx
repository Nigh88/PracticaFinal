import React, { Component } from 'react'
import Advert from './Advert'

export default class Adverts extends Component {  
  
  renderAdvert = (adverts) => {
    const divStyle = {
      padding: '2rem',
   };
    return(
      <div>
        <div className="row flex-column flex-md-row" style={divStyle}>
          { 
            adverts.map(advert => <Advert key={advert._id} advert={advert}/>)
          }
        </div>
      </div>
    )
  }

  render(){
    const { adverts } = this.props;
    return (
      <React.Fragment>
        {
          adverts
          &&
          this.renderAdvert(adverts)
        }
        
        {
          (!adverts
          ||
          adverts.length === 0)
          &&
          <div className="text-center mt-5">
            <h2>Adverts not found</h2>
          </div>
        }
      </React.Fragment>
    )
  }
}

