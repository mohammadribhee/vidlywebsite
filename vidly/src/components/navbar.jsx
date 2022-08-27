import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

class Navbar extends Component {

 
    
    render() { 
   
    
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <NavLink to="/" className="navbar-brand">Home</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          

   
    
        </li>
        <li className="nav-item">
          <NavLink to="/Rentals" className="nav-link">Rentals</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Customer" className="nav-link">Customer</NavLink>
        </li>

        {!this.props.user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {this.props.user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {this.props.user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}


      </ul>
    </div>
  </div>
</nav>
        );
    }
}
 
export default Navbar;