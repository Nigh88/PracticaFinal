import React from 'react'
import { withRouter } from 'react-router-dom';
import UserContext from '../utils/user';
import { getUser } from '../Services/userServices';





class Navbar extends React.Component {
    constructor(props){
        super(props)
        const params = new URLSearchParams(this.props.location.search);
        const search = params.get('name');
        const price = params.get('price') 
        this.state = { 
            name: search,
            min: '',
            max: '' ,
            isLogged: false,
            name: ''
        }

        if(price){
            const array = price.split('-')
            this.state.min = array[0]
            this.state.max = array[1]
        }        
    }

    componentDidMount(){
        getUser()
        .then(
            res => { 
                if(res.success){
                    this.setState({
                        name: res.user.name,
                        email: res.user.email,
                        isLogged: true
                    })  
                } else {
                   
                }  
            }
        )
    }

    onSubmit = (event) => {
        event.preventDefault();
        let url = '/Home?'

            if(this.state.search){
            url += 'name=' + this.state.search + '&'
            }
    
            if(this.state.min || this.state.max){
                url += 'price=' + this.state.min + '-' + this.state.max
                } 
            
            this.props.history.push(url)

        window.location.reload(false);
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const user = this.context;
        return(       
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a href='/Home'>
                <img src={ require('../utils/images/sob_icon2.png') } />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    {!this.state.isLogged?(   
                    <li className="nav-item">
                    <a className="nav-link" href="/Register">Register</a>
                    </li>
                     ):(
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Options
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/Create">Create advertisement</a>
                        <a className="dropdown-item" href={"/adverts/" + this.state.name}>My adverts</a>
                    </div>
                    </li>
                     )}


                    {!this.state.isLogged?(
                    <li className="nav-item">
                    <a className="nav-link" href="/Login">Login</a>
                    </li>
                    ):(
                    <li className="nav-item">
                    <a className="nav-link" href="/Profile">Profile</a>
                    </li>
                    )}

                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Categories
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/home?tag=hogar">Hogar</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/home?tag=hobbies">Hobbies</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/home?tag=home_appliances">Home appliances</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/home?tag=office">Office</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/home?tag=motor">Motor</a>
                    </div>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
                    <input className="form-control mr-sm-2" type="number" placeholder="Min price" aria-label="Min" name="min" onChange={this.onInputChange} value={this.state.min}/>
                    <input className="form-control mr-sm-2" type="number" placeholder="Max price" aria-label="Max" name="max" onChange={this.onInputChange} value={this.state.max}/>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="search" onChange={this.onInputChange} value={this.state.search}/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                </div>
            </nav>
        )
    }
}

Navbar.contextType = UserContext;
export default withRouter(Navbar);
