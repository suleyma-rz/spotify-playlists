import React, {Component} from 'react';

class Filter extends Component{
    render(){
        return(
            <div className="filterComponent">
                <input type="text"/>
                <button>Search</button>
            </div>
        )        
    }
}

export default Filter;