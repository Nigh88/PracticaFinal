import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import UserContext from '../user';
import { searchTags, searchAdvertId } from '../Services/advertServices';
import Select from 'react-dropdown-select';

class CreateModifi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
          }

        this.searchAdvertId()
    }

    setValues = (event) => {
        this.setState({tags:event[0].label});
    };
    
    searchAdvertId() {  
        if(!this.props.match.params.id) {
      
            this.setState({
                
              })
        }
        else {
          searchAdvertId(this.props.match.params.id).then(advertJson => {
      
            this.setState({
                name: advertJson.name,
                description: advertJson.description,
                price: advertJson.price,
                type: advertJson.type,
                photo: advertJson.photo,
                tags: advertJson.tags
            })
          })
        }
      }

    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const { name, description, price, type } = this.state;

        if (!name || name.trim().length < 3) {
            alert("Name is too short. At least 3 characters");
            return;
        }

        if (!description || description.trim().length < 10) {
            alert("Please write a description with at least 10 characters");
            return;
        }

        if (!price) {
            alert("Please indicate the price");
            return;
        }

        if (!type || type.trim().length <= 0) {
            alert("Please indicate if it's for sell or buy");
            return;
        }

        this.props.onSubmit({
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            type: this.state.type,
            photo: this.state.photo,
            tags: [this.state.tags]
        }, this.props.match.params.id);

        this.props.history.push("/Home");
    }

    onChangeHandler=event=>{
        console.log(event.target.files[0])
    }

    componentWillMount() {    
        searchTags().then(tags => {
            var i;
            var tempTags = [];
            for (i = 0; i < tags.length; i++) {
                tempTags[i] = {label: tags[i], value: tags[i]}
            }
            this.setState (
                { options : tempTags }
            )
        });
    }

    

    render() {
        const { options } = this.state;

        return(
            <React.Fragment>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                            id="name"
                            className="form-control"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.onInputChange}
                            placeholder="Name of the product"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input
                            id="description"
                            className="form-control"
                            name="description"
                            type="text"
                            value={this.state.description}
                            onChange={this.onInputChange}
                            placeholder="Write a short description"
                            />
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input
                            id="price"
                            className="form-control"
                            name="price"
                            type="text"
                            value={this.state.price}
                            onChange={this.onInputChange}
                            placeholder="Choose the tags of your product"
                            />
                        </div>

                        <div className="form-group">
                            <label>Photo</label>
                            <input
                            id="photo"
                            className="form-control"
                            name="photo"
                            type="text"
                            value={this.state.photo}
                            onChange={this.onInputChange}
                            placeholder="Choose the tags of your product"
                            />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <input
                            id="type"
                            className="form-control"
                            name="type"
                            type="text"
                            value={this.state.type}
                            onChange={this.onInputChange}
                            placeholder="Indicate if you want to buy or sell"
                            />
                        </div>

                        <div className="form-group">
                            <label>Tags</label>
                            <Select id="tags" value={this.state.tags} options={options} onChange={(values) => this.setValues(values)} />
                        </div>

                        <button type='submit' className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CreateModifi); 