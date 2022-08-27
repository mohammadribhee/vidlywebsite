import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Rentals from './components/rentals';
import Home from './components/home';
import Customer from './components/customers';
import Idmoive from './components/idmoive';
import NoMatch from './components/nomatch'
import {Route,Routes,Navigate} from 'react-router-dom';
import Login from './components/login';
import Logout from "./components/logout";
import Register from './components/register';
import NewMovie from './components/new';
import auth from "./services/authService";
class App extends Component {


  state = {user:undefined};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    console.log(this.state.user);
  }


  render(){
  
    const { user } = this.state;
 
    

    return (
   <React.Fragment>
 <Navbar user={user} />
   <Routes>

   <Route path="/New" element={<NewMovie user={user}/>} />
   <Route path="/Rentals" element={<Rentals/>} />
   <Route path="/Customer" element={<Customer />} />
   <Route path="/" element={<Home user={user} />} />
   <Route path = "/:id" element={<Idmoive/>}/>
   <Route path="/login" element={<Login />} />
   <Route path="/logout" element={<Logout />} />
   <Route path="/register" element={<Register />} />
   <Route path="/not-found" element={<NoMatch />} />
   <Route path="*" element={ <Navigate to="/not-found" />} />

  
      </Routes>


   </React.Fragment>
  

     
    );
  }
  
}

export default App;
