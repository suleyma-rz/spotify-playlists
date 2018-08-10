import React, { Component } from 'react';

class InputComponent extends Component {
  constructor(props){
    super(props);    
  }  
  render() {    
    return (
        <div className="inputComponent center-text">
            <textarea placeholder="Song Artist..."/>
            <p className="ornament-center center-text"> or </p>
            <button className="btn btn-full-width">Upload file</button>
        </div>
    )}
}

export default InputComponent;
