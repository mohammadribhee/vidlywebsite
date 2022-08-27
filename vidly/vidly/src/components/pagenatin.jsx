import React, { Component } from 'react';
class Pagenatines extends Component {
    state = {  } 
    render() { 
        return (<nav aria-label="...">
        <ul className="pagination pagination-lg">
          <li onClick={()=>this.props.f(1)}  className="page-item">
            <a className="page-link" href="#" tabIndex="-1">1</a>
          </li>
          <li onClick={()=>this.props.f(2)} className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
        </ul>
      </nav>
        );
    }
}
 
export default Pagenatines;