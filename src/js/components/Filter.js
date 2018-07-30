import React, {Component} from 'react';

class Filter extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="filterComponent">
                <input type="text" onKeyUp={event =>this.props.onTextChange(event.target.value)}/>
                <button>Search</button>
            </div>
        )        
    }
}

export default Filter;