import React from 'react'
import { withRouter } from 'react-router-dom';
import UserContext from '../utils/user';
import { userTaken } from '../Services/userServices';



class Navbar extends React.Component {
    constructor(props){
        super(props)
        const params = new URLSearchParams(this.props.location.search);
        const search = params.get('name');
        this.state = { name: search}
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.props.history.push("/Home?name="+ this.state.search);
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
                <a className="navbar-brand" href="/Home">Sell Or Buy</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    <span className="navbar-text">Welcome</span>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Options
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/Create">Create advertisement</a>
                    </div>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filter by tags
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/home?tag=lifestyle">Lifestyle</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/home?tag=motor">Motor</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/home?tag=work">Work</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/home?tag=mobile">Mobile</a>
                    </div>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/Register">Register</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/Login">Login</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/Profile">Profile</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
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
