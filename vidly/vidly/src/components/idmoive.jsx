import React, { Component } from 'react';
import Input from './input';
import Selectmenu from './selectmenu';
import {getMovies,updateMovie} from "../services/movieService";
import { useParams ,Link, Navigate } from "react-router-dom";


function withParams(Home) {
 
  return props => <Home {...props} params={useParams() }  />;
     
  
}


class Idmovie extends Component {
 
  async componentDidMount() {
    const {data:mohok}=  await getMovies();
    const newww=[...mohok];

   const checkdata= newww.find(m => m._id === this.props.params.id);

    if (checkdata!==undefined){

      let mo={...this.state.movie};
      mo._id=this.props.params.id;
      mo.Title=checkdata.title;
      console.log(checkdata);
      mo.genre._id=checkdata.genre._id;
      mo.numberInStock=checkdata.numberInStock;
      mo.dailyRentalRate=checkdata.dailyRentalRate;
      
      this.setState({
       movie:mo,
       newww,
       notfound:false
      })
    }else{
      this.setState({
        notfound:true
       })
    }
    
  
}


 state = {
  newww:[],
  movie:{Title:"",genre:{_id: ""},numberInStock:"",dailyRentalRate:""},
  error:{},
  notfound:false
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

  if(movie.numberInStock.toString().trim()==='')
  error.numberInStock="NumberInStock is reqierd";

  if(movie.dailyRentalRate.toString().trim()==='')
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
        
  let movieInDb ={};
movieInDb.title = this.state.movie.Title;
movieInDb={...movieInDb,"genreId":this.state.movie.genre._id};
movieInDb.numberInStock = this.state.movie.numberInStock;
movieInDb.dailyRentalRate = this.state.movie.dailyRentalRate;

await  updateMovie(this.state.movie._id,movieInDb);

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
}



render() { 
 
  const {movie,error}=this.state;



  return (
      <div className="mx-5 mt-3">
          {(this.state.notfound)?<Navigate to="/not-found" replace={false} />:""}

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
idd={movie.genre._id}

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
 
export default withParams(Idmovie);



 
