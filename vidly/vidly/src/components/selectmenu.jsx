import React,{Component} from 'react';
import {getGenres} from "../services/genreService"
class Selectmenu extends Component {

  async componentDidMount() {
    const {data:genres}=  await getGenres();
    this.setState({
      genres


    })
  }
    
    state={
        genres: [],

      }
      MoiveType=(onChang,name,idd)=>{
       return <select 
       onChange={onChang}
        className="form-select" 
        aria-label="Default select example"
        name={name}
        >
         
          <option></option>
         {  this.state.genres.map((ele)=>{return (idd===ele._id)? <option selected label={ ele.name} key={ele._id}  value={ele._id} >{ele.name}</option>:<option key={ele._id} label={ ele.name} value={ele._id} >{ele.name}</option>})}
          </select>
  
         
      } 
      render(){
        const {name,onChang,error,label,idd}=this.props;
      
        return ( 
            <React.Fragment>
 <div className="mb-3">
    <label>{label}</label>
    {this.MoiveType(onChang,name,idd)}
           
            </div> 
            {error && <div className="alert alert-danger">{error}</div>}
            </React.Fragment>
        )
      }

 
      
}
 
export default Selectmenu;