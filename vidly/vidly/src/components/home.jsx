import {getGenres} from "../services/genreService";
import {getMovies,deleteMovies} from "../services/movieService";
import Pagenatines from './pagenatin';
import ListGroupMovie from './listgroup';
import Likes from './like'
import UnLikes from './unlike';
import React, { Component } from 'react';
import {NavLink,Navigate} from 'react-router-dom';
import Input from './input';
class Home extends Component {

  


 async componentDidMount() {
    const {data:m}=  await getGenres();
    const {data:mohok}=  await getMovies();
    
    const fliterG=[{_id:"",name: "All Genre"},...m];
    const movies=[...mohok];
    this.setState({
      fliterG,
      movies,
      oraginal:movies,
      count:movies.length

    })
  }
  state={
    oraginal:[],
    movies: [],
    count:0,
    
        onofflike : [false],
        backupArrVadly:[],
        fliterG:[],
        emptysearch:"",
        boolValueSearch:false
  }


      activeOrNot=(NameG,idG)=>{

        let genu=[...this.state.fliterG];
        genu.map(v=> idG===v._id?v.clicked=true:v.clicked=false)
        
        if(NameG==="All Genre"){
          this.setState({
            movies:this.state.oraginal,
            fliterG:genu,
            boolValueSearch:true
          })
        }else{
          let filterGaner=this.state.oraginal;
          const result = filterGaner.filter(gen => NameG===gen.genre.name);
         
            this.setState({
              movies:result,
              fliterG:genu,
              boolValueSearch:true
            })
        }
        
         
          
         
        
        }


         
        deletefun=async idd =>{
         
          let mo=[...this.state.movies];
        
         
         const indexxx= mo.findIndex(object =>
           {return(object._id === idd.id);});
        
        
          mo.splice(indexxx, 1);
        
     
        
        this.setState({count:this.state.movies-1,movies:mo })

       
       await deleteMovies(idd.id);
        }
                

    likeOrNot=t=>{

        let c=[...this.state.onofflike];
        
        if(c[t]){
          c[t]=false;
        }else{
          c[t]=true;
        }
        this.setState({
          onofflike:c
        })
      }

      handelChangeSearch=({currentTarget:input})=>{
        let moviesearch=this.state.oraginal;
        let genu=[...this.state.fliterG];
        genu.map(v=> v.clicked=false)

        const movies= moviesearch.filter (m => m.title.substring(0, input.value.length) === input.value.substring(0, input.value.length));
        this.setState({
          movies,
          emptysearch:input.value,
          boolValueSearch:false,
          fliterG:genu,
        })
        
      }

    pagentaFun=num=>{
      const { user } = this.props;
        return this.state.movies.map((ele,i)=>
      
      
      
      
      <tr key={ele._id} >
      {(i<num)?<React.Fragment>
        <td>
        <NavLink to={`/${ele._id}`} className="navbar-brand"> {ele.title}</NavLink>
          </td>
        <td >{ele.genre.name}</td>
        <td>{ele.numberInStock}</td>
        <td>{ele.dailyRentalRate}</td>
        <td  onClick={()=>this.likeOrNot(i)}>{this.state.onofflike[i]?<Likes/>:<UnLikes/>}</td>
        
        {user.isAdmin ? <td><button type="button" onClick={()=>this.deletefun({id:ele._id})} className="btn btn-danger">Delete</button></td>:""}

        </React.Fragment>:null}
       
        </tr>
      
        )
      }
      
    render() { 
      const { user } = this.props;
      if(!user) return( <Navigate to="/login" replace={false} />)
      else{
        return (
         
          <main className='m-5 pb-5'>
          <div className="container">
          <div className="row">
          <div className="col-4"><ListGroupMovie
          funGenra={this.state.fliterG}
          funClick={this.activeOrNot}
          /></div>
          <div className="col-6">
           
          {user.isAdmin ?  <NavLink to="/New" className="btn btn-primary">New Movie</NavLink>:""}
           
          <Input
                name="Search"
                onChange={this.handelChangeSearch}
                placholder="Search"
                value={(this.state.boolValueSearch)?"":this.state.emptysearch}
               />
            <h4>{this.state.count===0?`There are no movies in the database`:`Showing ${this.state.count} movies in the database`}</h4>
          
            {this.state.count!==0?
            
            
            <table className="table">
              <thead>
                <tr>
                 
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                </tr>
              </thead>
              <tbody>
              {this.pagentaFun(4)}
              
              </tbody>
            </table>
          
          :``}
          <Pagenatines f={()=>this.pagentaFun(4)}/></div>
          </div>
          </div>
          </main>
                  ); 
      }

    }

  }

 
export default Home;
