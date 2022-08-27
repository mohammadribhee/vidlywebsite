import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
const element = <FontAwesomeIcon icon={faHeart} />
class Likes extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                {element}
            </React.Fragment>

        );
    }
}
 
export default Likes;