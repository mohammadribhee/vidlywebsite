import React, { Component } from 'react';
class ListGroupMovie extends Component {
    state = {  } 


    render() { 
       
        return (
            <React.Fragment>
                <ul className="list-group">
                    
  {this.props.funGenra.map(v=>
    
    <li key={v._id} onClick={()=>this.props.funClick(v.name,v._id)} className={v.clicked===true?"list-group-item active":"list-group-item"}>{v.name}</li>
    )}
</ul>
            </React.Fragment>
        );
    }
}
 
export default ListGroupMovie;