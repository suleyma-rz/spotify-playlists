import React, { Component } from 'react';

class InputComponent extends Component {
  constructor(props){
    super(props);    
  }  
  render() {    
    return (
        <div className="inputComponent">      
            <textarea placeholder="Song Artist..."/>
            <p> or </p>
            <button className="btn">Upload file</button>
        </div>
    )}
}

export default InputComponent;
