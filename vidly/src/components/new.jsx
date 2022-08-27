import React, { Component } from 'react';
import { Link ,Navigate} from 'react-router-dom';
import Input from './input';
import Selectmenu from './selectmenu';
import {getMovies,saveMovie} from "../services/movieService";
class NewMovie extends Component {

    async componentDidMount() {
       
        const {data:mohok}=  await getMovies();

        const movies=[...mohok];
        this.setState({
          movies,
        })
      }
    

    state = { 
        movie:{Title:"",genre:{_id: ""},numberInStock:"",dailyRentalRate:""},
        movies:[],
        error:{}
     } 

  
     validation=()=>{

        
        const error={};
        const {movie}=this.state;
        let m={...movie.genre};
        let h=m._id;
        if(movie.Title.trim()==='')
        error.Title="Title is reqierd";

        
        if(h.trim()==='')
        error.genre="Genre is reqierd";

        if(movie.numberInStock.trim()==='')
        error.numberInStock="NumberInStock is reqierd";

        if(movie.dailyRentalRate.trim()==='')
        error.dailyRentalRate="Rate is reqierd";

        return Object.keys(error).length===0?null:error;
     }

     validationProporty=({name,value})=>{
        if(name==='Title'){

            if(value.trim()==='') return "Title is required";
        }
        if(name==='genre'){

            if(value.trim()==='') return "Genre is required";
        }

        if(name==='numberInStock'){

            if(value.trim()==='') return "NumberInStock is required";
        }

        if(name==='dailyRentalRate'){

            if(value.trim()==='') return "Rate is required";
        }
     }
    handelSubmit=e=>{
        e.preventDefault();
        const error=this.validation();
        this.setState({error});
     
        if(error) return;
      
    }
    b=async ()=>{
        
        let movieInDb = this.state.movies.find(m => m._id === this.state.movie._id) || {};
  movieInDb.title = this.state.movie.Title;
  const ObjGenra= this.state.movies.map(mg=>mg.genre).find(g => g._id === this.state.movie.genre._id);
  movieInDb={...movieInDb,"genreId":ObjGenra._id};
  movieInDb.numberInStock = this.state.movie.numberInStock;
  movieInDb.dailyRentalRate = this.state.movie.dailyRentalRate;

  if (!movieInDb._id) {

   
    await  saveMovie(movieInDb);
  }
  
    }


    handelChange=({currentTarget:input})=>{
     
       
        const error={...this.state.error};
        const errorsMessage=this.validationProporty(input);
        if(errorsMessage) error[input.name]=errorsMessage;
        else delete error[input.name];
const movie={...this.state.movie};
if(input.name==="genre"){
   
            movie[input.name]={_id:input.value};

}else{

    movie[input.name]=input.value;
}
this.setState({
    movie,error
})
console.log("moookokok",movie);
    }
    render() { 
        const {movie,error}=this.state;
        const { user } = this.props;
        if(!user)  return( <Navigate to="/login" replace={false} />)
        return (
           
            <div className="mx-5 mt-3">
                <h1>Movie Form</h1>
                <form onSubmit={this.handelSubmit}>
  
    <Input
    label="Title"
      name="Title"
      value={movie.Title}
      onChange={this.handelChange}
      error={error.Title}
     />

<Selectmenu
 error={error.genre}
 onChang={this.handelChange}
 name="genre"
 label="Genre"
 />

<Input
 label="Number In Stock"
      name="numberInStock"
      value={movie.numberInStock}
      onChange={this.handelChange}
      error={error.numberInStock}
     />

<Input
 label="Rate"
      name="dailyRentalRate"
      value={movie.dailyRentalRate}
      onChange={this.handelChange}
      error={error.dailyRentalRate}
     />
{this.validation()?<button  className="btn btn-primary"  disabled>Save</button>:
 <Link to="/" onClick={this.b} className="btn btn-primary" >Save</Link>
}
 
</form>
            </div>
        );
    }
}
 
 
export default NewMovie;